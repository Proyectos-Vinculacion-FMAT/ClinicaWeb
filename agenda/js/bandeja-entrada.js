/* ============================================================
   bandeja-entrada.js – v2 (sincroniza reprogramaciones)
   ============================================================ */
document.addEventListener('DOMContentLoaded', () => {

  const EVT_NAME = {
    1:'Evaluación inicial integral',
    2:'Cita de terapia'
  };

  const solicitudes=[
    {id:'req-101',tipoPet:'requests',   tipoEv:1,paciente:'Ricardo Vargas',fecha:'2025-06-03',hora:'10:00'},
    {id:'req-102',tipoPet:'requests',   tipoEv:2,paciente:'María Torres',  fecha:'2025-06-04',hora:'12:30'},
    {id:'req-103',tipoPet:'requests',   tipoEv:2,paciente:'Pedro Rivas',   fecha:'2025-06-06',hora:'09:00'},
    {id:'rep-201',tipoPet:'reschedules',tipoEv:2,paciente:'Luis García',  fecha:'2025-06-05',hora:'15:00'},
    {id:'rep-202',tipoPet:'reschedules',tipoEv:1,paciente:'Ana Martínez', fecha:'2025-06-07',hora:'11:00'}
  ];

  const tabBtns=document.querySelectorAll('.tab-btn');
  const counts={
    requests   :document.getElementById('requests-count'),
    reschedules:document.getElementById('reschedules-count')
  };
  let lastManagedId=null;                    // sólo dentro de este módulo

  /* ---------- Construye tarjeta -------------------------- */
  const buildCard=s=>{
    const isReq=s.tipoPet==='requests';
    const title=isReq?'Solicitud de cita':'Solicitud de reprogramación';
    const lbl=isReq?'Fecha solicitada':'Nueva fecha propuesta';
    const card=document.createElement('div');
    card.className='request-item';
    card.innerHTML=`
       <h3>${title}</h3>
       <p><strong>Paciente:</strong> ${s.paciente}</p>
       <p><strong>Tipo de evento:</strong> ${EVT_NAME[s.tipoEv]}</p>
       <p><strong>${lbl}:</strong> ${s.fecha} ${s.hora}</p>
       <div class="request-actions">
         <button class="approve-btn">Gestionar</button>
       </div>`;
    card.querySelector('.approve-btn').onclick=()=>{
      lastManagedId=s.id;
      window.lastManagedId=s.id;             //  comparte con agenda.js
      window.dispatchEvent(new CustomEvent('openRequest',{detail:s}));
    };
    return card;
  };

  /* ---------- Pinta bandeja ------------------------------ */
  const renderInbox=()=>{
    ['requests','reschedules'].forEach(key=>{
      const cont=document.getElementById(`${key}-tab`);
      cont.innerHTML='';
      const items=solicitudes.filter(x=>x.tipoPet===key);
      items.forEach(s=>cont.appendChild(buildCard(s)));
      counts[key].textContent=`(${items.length})`;
    });
  };

  /* ---------- Cambiar pestañas --------------------------- */
  tabBtns.forEach(btn=>btn.onclick=e=>{
    tabBtns.forEach(x=>x.classList.remove('active'));
    document.querySelectorAll('.tab-content').forEach(c=>c.classList.remove('active'));
    const tab=e.currentTarget.dataset.tab;
    e.currentTarget.classList.add('active');
    document.getElementById(`${tab}-tab`).classList.add('active');
  });

  /* ---------- Escucha confirmación desde agenda ---------- */
  window.addEventListener('eventCreated',e=>{
    const managedId=e.detail && e.detail.requestId ? e.detail.requestId : (window.lastManagedId||lastManagedId);
    if(!managedId) return;

    const idx=solicitudes.findIndex(s=>s.id===managedId);
    if(idx>=0){
      solicitudes.splice(idx,1);
      lastManagedId=null;
      window.lastManagedId=null;
      renderInbox();
    }
  });

  renderInbox();
});
