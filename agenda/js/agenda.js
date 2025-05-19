/* ============================================================
   js/agenda.js – Calendario con franjas de 30 min, ejemplos,
   validaciones reforzadas, reprogramaciones y valoración auto
   ============================================================ */
document.addEventListener('DOMContentLoaded', () => {

  /* ---------- UTILITARIOS DE FECHAS Y CONSTANTES ------------ */
  function pad(n){ return String(n).padStart(2,'0'); }
  function iso(d){ return `${d.getFullYear()}-${pad(d.getMonth()+1)}-${pad(d.getDate())}`; }
  function parseISO(s){ const [Y,M,D]=s.split('-').map(Number); return new Date(Y,M-1,D); }
  function addDays(d,n){ const r=new Date(d); r.setDate(r.getDate()+n); return r; }
  function isWE(d){ return [0,6].includes(d.getDay()); }
  function monday(d){ const w=d.getDay(); return addDays(d, w===0?1:1-w); }
  function minutesAdd(t,min){
    let [h,m]=t.split(':').map(Number);
    m+=min; while(m>=60){h++;m-=60;}
    return `${pad(h)}:${pad(m)}`;
  }
  // Función añadida para validar rango de meses
  function diffMonths(a,b){
    return (a.getFullYear()-b.getFullYear())*12 + (a.getMonth()-b.getMonth());
  }
  function nextSlot(hora,dur){ return minutesAdd(hora, dur); }

  const OPEN_HOUR        =  9;    // Inicio de jornada (09:00)
  const CLOSE_HOUR       = 17;    // Fin de jornada (17:30)
  const SLOT_MINUTES     = 30;    // Duración de cada franja, en minutos
  const ROWS_PER_DAY     = ((CLOSE_HOUR - OPEN_HOUR) * 60) / SLOT_MINUTES + 1;
  const MAX_MONTHS_AHEAD = 6;     // máximo 6 meses en el futuro

  /* ---------- MENSAJES DE ERROR ----------------------------- */
  const ERR = {
    weekend:      'No se pueden programar eventos en fin de semana.',
    hours:        `Horario permitido: ${pad(OPEN_HOUR)}:00–${pad(CLOSE_HOUR)}:30.`,
    slotStep:     'Solo se permiten minutos :00 o :30.',
    patientBusy:  'El paciente ya tiene un evento en ese horario.',
    salaBusy:     'La sala no está libre durante toda la duración.',
    therBusy:     'El terapeuta no está libre durante toda la duración.',
    onlyOneSocio: 'Solo una Evaluación Socioeconómica por paciente.',
    needSocio:    'El paciente debe pasar primero por Evaluación Socioeconómica.',
    alreadyVal:   'El paciente ya tiene Consulta de Valoración Psicológica.',
    autoValDup:   'Ya existe valoración automática para este paciente.',
    dateRange:    `Solo se permiten citas hasta ${MAX_MONTHS_AHEAD} meses en el futuro.`
  };

  /* ---------- CATÁLOGOS ------------------------------------- */
  const TIPOS = {
    1: { nombre: 'Evaluación Socioeconómica',        dur: 30, terapeutas: [] },
    2: { nombre: 'Consulta de Valoración Psicológica',dur: 60, terapeutas: ['Terapeuta A','Terapeuta B'] },
    3: { nombre: 'Cita de Terapia',                  dur: 60, terapeutas: ['Terap. 1','Terap. 2','Terap. 3','Terap. 4'] }
  };
  const SALAS     = ['Sala 101','Sala 102','Sala 103'];
  const PACIENTES = 'Ana Martínez,Luis García,Carmen Robles,José Romero,María Torres,Diego Fuentes,Sofía Paredes,Ricardo Vargas,Elena Castillo,Pedro Rivas'.split(',');

  /* ---------- ELEMENTOS DEL DOM ---------------------------- */
  const filtroPeriodo  = document.getElementById('filterPeriod');
  const filtroFecha    = document.getElementById('filterDate');
  const btnFiltro      = document.getElementById('applyFilter');
  const grid           = document.getElementById('calendarContainer');
  const btnNuevo       = document.getElementById('newEventBtn');

  const modal          = document.getElementById('newEventModal');
  const modalTitle     = document.getElementById('newEventTitle');
  const form           = document.getElementById('newEventForm');
  const closeModal     = document.getElementById('closeNewEventModal');

  const selTipo        = document.getElementById('eventType');
  const selPaciente    = document.getElementById('eventPatient');
  const inputFecha     = document.getElementById('eventDate');
  const inputHora      = document.getElementById('eventStartTime');
  const lblDur         = document.getElementById('eventDurationLabel');
  const hidDur         = document.getElementById('eventDuration');
  const autoWrap       = document.getElementById('autoValWrapper');
  const chkAuto        = document.getElementById('autoValChk');
  const autoTherGroup  = document.getElementById('autoTherGroup');
  const autoTherSel    = document.getElementById('autoTherSel');
  const therGroup      = document.getElementById('therapistGroup');
  const selTher        = document.getElementById('eventTherapist');
  const selSala        = document.getElementById('eventRoom');

  const detModal       = document.getElementById('appointmentModal');
  const detInfo        = document.getElementById('modalInfo');
  const detClose       = document.getElementById('closeModal');

  /* ---------- MEMORIA DE EVENTOS --------------------------- */
  const eventos = [];

  /* ---------- GENERACIÓN DE EJEMPLOS (una sola vez) --------- */
  const EJ_FLAG = '__ejemplos_gen__';
  function genEjemplos(semIni){
    if(window[EJ_FLAG]) return;
    const lu = semIni;
    // Lunes
    eventos.push({ id:'ej-lun1', tipo:3, paciente:'Elena Castillo', fecha:iso(lu), hora:'09:00', sala:'Sala 101', ther:'Terap. 3', dur:TIPOS[3].dur });
    eventos.push({ id:'ej-lun2', tipo:1, paciente:'Ana Martínez',   fecha:iso(lu), hora:'10:00', sala:'Sala 102', dur:TIPOS[1].dur });
    // Miércoles
    const mi = addDays(lu,2);
    [['09','Ana Martínez'],['10','Luis García'],['11','Carmen Robles'],['13','José Romero'],['15','María Torres']]
      .forEach(([h,p])=> eventos.push({
        id:`ej-mie${h}`, tipo:3, paciente:p,
        fecha:iso(mi), hora:`${h}:00`, sala:'Sala 101', ther:'Terap. 2', dur:TIPOS[3].dur
      }));
    // Viernes
    const vi = addDays(lu,4);
    PACIENTES.slice(0,7).forEach((p,i)=>{
      const h = 9 + i, tp = (i%2?2:3);
      eventos.push({
        id:`ej-vie${h}`, tipo:tp, paciente:p,
        fecha:iso(vi), hora:`${pad(h)}:00`,
        sala:'Sala 102', ther:`Terap. ${(i%4)+1}`,
        dur:TIPOS[tp].dur
      });
    });
    window[EJ_FLAG] = true;
  }

  /* ---------- CONSTRUCCIÓN DEL GRID ------------------------- */
  let headerMap = {};
  function buildHeader(start,cols){
    headerMap={};
    grid.appendChild(Object.assign(document.createElement('div'),{ className:'day-header' }));
    for(let c=0;c<cols;c++){
      const d = addDays(start,c);
      const h = document.createElement('div');
      h.className='day-header';
      h.textContent=d.toLocaleDateString('es-ES',{weekday:'short',day:'numeric',month:'short'});
      grid.appendChild(h);
      headerMap[iso(d)] = h;
    }
  }
  function buildRows(start,cols){
    for(let r=0;r<ROWS_PER_DAY;r++){
      const mins = r * SLOT_MINUTES;
      const hour = OPEN_HOUR + Math.floor(mins/60);
      const min  = mins % 60;
      const label = document.createElement('div');
      label.className='time-cell';
      label.textContent=`${pad(hour)}:${pad(min)}`;
      grid.appendChild(label);
      for(let c=0;c<cols;c++){
        const cell = document.createElement('div');
        cell.className='empty-cell cell-container';
        cell.dataset.fecha = iso(addDays(start,c));
        cell.dataset.hora  = `${pad(hour)}:${pad(min)}`;
        cell.addEventListener('click',()=>openModal(cell.dataset.fecha,cell.dataset.hora));
        grid.appendChild(cell);
      }
    }
  }
  function placeEvents(start,cols){
    const end = iso(addDays(start,cols-1));
    eventos.forEach(ev=>{
      if(ev.fecha<iso(start)||ev.fecha> end) return;
      for(let m=0;m<ev.dur;m+=SLOT_MINUTES){
        const t = minutesAdd(ev.hora,m);
        const cont = grid.querySelector(`.cell-container[data-fecha="${ev.fecha}"][data-hora="${t}"]`);
        if(!cont) continue;
        const div = document.createElement('div');
        div.className=`appointment tipo-${ev.tipo}`;
        if(m===0) div.textContent=`${TIPOS[ev.tipo].nombre} – ${ev.paciente}`;
        div.addEventListener('click',e=>{ e.stopPropagation(); showDetails(ev); });
        cont.appendChild(div);
      }
    });
  }
  function colorHeaders(){
    Object.values(headerMap).forEach(el=>el.classList.remove('day-low','day-mid','day-high'));
    Object.entries(headerMap).forEach(([f,el])=>{
      const occ = eventos.filter(e=>e.fecha===f).length;
      const pct = occ/ROWS_PER_DAY*100;
      if(pct<25)       el.classList.add('day-low');
      else if(pct<=75) el.classList.add('day-mid');
      else             el.classList.add('day-high');
    });
  }

  /* ---------- RENDER PRINCIPAL ------------------------------ */
  function render(){
    grid.innerHTML='';
    let ref = filtroFecha.value?parseISO(filtroFecha.value):new Date();
    if(isWE(ref)) ref=monday(ref);
    genEjemplos(monday(ref));
    filtroFecha.value=iso(ref);

    const mode = filtroPeriodo.value;
    const start= mode==='day'?ref:monday(ref);
    const cols = mode==='day'?1:5;
    grid.style.gridTemplateColumns = cols===1?'60px 1fr':`60px repeat(${cols},1fr)`;

    buildHeader(start,cols);
    buildRows(start,cols);
    placeEvents(start,cols);
    colorHeaders();
  }

  /* ---------- VALIDACIONES ----------------------------------- */
  function sameSlot(a,b){ return a.fecha===b.fecha && a.hora===b.hora; }
  function isSlotRangeFree(prop,val,fecha,hora,dur){
    for(let m=0;m<dur;m+=SLOT_MINUTES){
      const t = minutesAdd(hora,m);
      if(eventos.some(e=>e[prop]===val && sameSlot(e,{fecha,hora:t}))) return false;
    }
    return true;
  }
  function validate(ev, skipId=null){
    const d = parseISO(ev.fecha);
    if(isWE(d)) return ERR.weekend;
    if(diffMonths(parseISO(ev.fecha), new Date()) > MAX_MONTHS_AHEAD) return ERR.dateRange;

    const [H,M] = ev.hora.split(':').map(Number);
    const totalMins = H*60 + M;
    const minAllowed = OPEN_HOUR*60;
    const maxAllowed = CLOSE_HOUR*60 + SLOT_MINUTES;
    if(totalMins<minAllowed||totalMins>maxAllowed) return ERR.hours;
    if(M!==0&&M!==30) return ERR.slotStep;

    if(eventos.some(e=>e.paciente===ev.paciente && sameSlot(e,ev) && e.id!==skipId))
      return ERR.patientBusy;
    if(ev.sala && !isSlotRangeFree('sala',ev.sala,ev.fecha,ev.hora,ev.dur))
      return ERR.salaBusy;
    if(ev.ther && !isSlotRangeFree('ther',ev.ther,ev.fecha,ev.hora,ev.dur))
      return ERR.therBusy;

    if(ev.tipo===1 && eventos.some(e=>e.tipo===1 && e.paciente===ev.paciente && e.id!==skipId))
      return ERR.onlyOneSocio;
    if(ev.tipo===2){
      if(!isReprog){
        const hasSocio = eventos.some(e=>e.tipo===1 && e.paciente===ev.paciente);
        if(!hasSocio) return ERR.needSocio;
      }
      if(eventos.some(e=>e.tipo===2 && e.paciente===ev.paciente && e.id!==skipId))
        return ERR.alreadyVal;
    }
    if(ev.tipo===1 && chkAuto.checked){
      const dup = eventos.some(e=>e.tipo===2 && e.id.startsWith(ev.id+'_'));
      if(dup) return ERR.autoValDup;
    }
    return '';
  }

  /* ---------- FORMULARIO DINÁMICO --------------------------- */
  selTipo.addEventListener('change',()=>{
    const cfg = TIPOS[selTipo.value]||null;
    if(!cfg){
      lblDur.textContent='--'; hidDur.value='';
      therGroup.classList.add('hidden'); selTher.innerHTML='';
      autoWrap.classList.add('hidden');
      autoTherGroup.classList.add('hidden'); autoTherSel.innerHTML='';
      autoTherSel.disabled=true; autoTherSel.removeAttribute('required');
      return;
    }
    lblDur.textContent = `${cfg.dur} min`; hidDur.value=cfg.dur;
    if(cfg.terapeutas.length){
      therGroup.classList.remove('hidden');
      selTher.innerHTML = '<option value="">Seleccionar terapeuta</option>' +
        cfg.terapeutas.map(t=>`<option>${t}</option>`).join('');
    } else {
      therGroup.classList.add('hidden'); selTher.innerHTML='';
    }
    if(selTipo.value==='1'){
      autoWrap.classList.remove('hidden');
      autoTherGroup.classList.remove('hidden');
      autoTherSel.innerHTML = '<option value="">Seleccionar terapeuta</option>' +
        TIPOS[2].terapeutas.map(t=>`<option>${t}</option>`).join('');
      autoTherSel.disabled = !chkAuto.checked;
      chkAuto.checked
        ? autoTherSel.setAttribute('required','')
        : autoTherSel.removeAttribute('required');
    } else {
      autoWrap.classList.add('hidden');
      autoTherGroup.classList.add('hidden');
      autoTherSel.innerHTML='';
      autoTherSel.disabled=true; autoTherSel.removeAttribute('required');
    }
  });
  chkAuto.addEventListener('change',()=>{
    autoTherSel.disabled = !chkAuto.checked;
    chkAuto.checked
      ? autoTherSel.setAttribute('required','')
      : autoTherSel.removeAttribute('required');
    autoTherSel.classList.toggle('hidden', !chkAuto.checked);
  });

  /* ---------- MANEJO DEL MODAL ----------------------------- */
  let isReprog=false, originalEv=null;
  function openModal(fecha,hora,repro=false,ev=null){
    isReprog=repro; originalEv=ev;  
    modalTitle.textContent = repro ? 'Reprogramar Evento' : 'Nuevo Evento';
    form.reset(); chkAuto.checked=false; autoTherSel.disabled=true;
    autoTherSel.removeAttribute('required'); autoTherSel.classList.add('hidden');
    selTipo.disabled     = repro;
    selPaciente.disabled = repro;
    if(repro && ev){
      selTipo.value     = ev.tipo;
      selPaciente.value = ev.paciente;
      selSala.value     = ev.sala||'';
      selTher.value     = ev.ther||'';
      selTipo.dispatchEvent(new Event('change'));
    } else {
      selTipo.value=''; selPaciente.value=''; selSala.value=''; selTher.value='';
      selTipo.dispatchEvent(new Event('change'));
    }
    inputFecha.value = fecha;
    inputHora.value  = hora;
    modal.style.display='block';
  }
  btnNuevo.addEventListener('click',()=>{
    let d=new Date();
    if(isWE(d)) d.setDate(d.getDate() + (d.getDay()===6?2:1));
    openModal(iso(d),`${pad(OPEN_HOUR)}:00`);
  });
  closeModal.addEventListener('click',()=> modal.style.display='none');

  /* ---------- GUARDAR EVENTO ------------------------------- */
  form.addEventListener('submit', e=>{
    e.preventDefault();
    const evData = {
      id:       Date.now().toString(36),
      tipo:     Number(selTipo.value),
      paciente: selPaciente.value,
      fecha:    inputFecha.value,
      hora:     inputHora.value,
      sala:     selSala.value,
      ther:     selTher.value,
      dur:      Number(hidDur.value)
    };
    const err = validate(evData, originalEv?.id);
    if(err){ alert(err); return; }

    if(isReprog){
      const idx = eventos.indexOf(originalEv);
      if(idx>=0) eventos.splice(idx,1);
    }
    eventos.push(evData);
    window.dispatchEvent(new CustomEvent('eventCreated',{ detail:{ id:evData.id } }));

    /* valoración automática */
    if(evData.tipo===1 && chkAuto.checked){
      if(!autoTherSel.value){
        alert('Seleccione un terapeuta para la valoración.');
      } else {
        const val = {
          ...evData,
          id:   evData.id+'_v',
          tipo: 2,
          ther: autoTherSel.value,
          hora: nextSlot(evData.hora, evData.dur),
          dur:  TIPOS[2].dur
        };
        if(!isSlotRangeFree('sala',val.sala,val.fecha,val.hora,val.dur)){
          const libre = SALAS.find(s=>isSlotRangeFree('sala',s,val.fecha,val.hora,val.dur));
          if(libre) val.sala=libre;
        }
        const err2 = validate(val);
        if(err2) alert(`No se creó valoración automática: ${err2}`);
        else {
          eventos.push(val);
          window.dispatchEvent(new CustomEvent('eventCreated',{ detail:{ id:val.id } }));
        }
      }
    }

    modal.style.display='none';
    render();
  });

  /* ---------- DETALLES Y REPROGRAMACIÓN --------------------- */
  function showDetails(ev){
    detInfo.innerHTML=`
      <p><strong>Tipo:</strong> ${TIPOS[ev.tipo].nombre}</p>
      <p><strong>Paciente:</strong> ${ev.paciente}</p>
      <p><strong>Fecha:</strong> ${ev.fecha}</p>
      <p><strong>Hora:</strong> ${ev.hora}</p>
      <p><strong>Sala:</strong> ${ev.sala||'—'}</p>
      ${ev.ther?`<p><strong>Terapeuta:</strong> ${ev.ther}</p>`:''}
      <div class="request-actions">
        <button class="approve-btn" id="repBtn">Solicitar Reprogramación</button>
      </div>`;
    detModal.style.display='block';
    document.getElementById('repBtn').onclick=()=>{
      detModal.style.display='none';
      openModal(ev.fecha,ev.hora,true,ev);
    };
  }
  detClose.addEventListener('click',()=> detModal.style.display='none');

  /* ---------- INTEGRACIÓN BANDEJA DE ENTRADA ------------ */
  window.addEventListener('openRequest', e=>{
    const r=e.detail;
    if(r.tipoPet==='serv'){
      selTipo.value=r.tipoEv; selPaciente.value=r.paciente;
      selTipo.dispatchEvent(new Event('change'));
      openModal(r.fecha,r.hora,false,null);
    } else {
      const original = eventos.find(x=>x.tipo===r.tipoEv && x.paciente===r.paciente);
      if(original) openModal(original.fecha,original.hora,true,original);
      else         alert('No se encontró el evento original para reprogramar.');
    }
  });

  /* ---------- INICIALIZACIÓN ------------------------------- */
  filtroPeriodo.value='day';
  filtroFecha.value  =iso(monday(new Date()));
  filtroPeriodo.addEventListener('change',render);
  filtroFecha  .addEventListener('change',render);
  btnFiltro    .addEventListener('click',render);
  render();

});
