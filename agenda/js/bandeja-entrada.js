/* ============================================================
   bandeja-entrada.js – demo solicitudes y reprogramaciones
============================================================ */
document.addEventListener('DOMContentLoaded', () => {

  /* --- Pestañas y contenedores dinámicos ------------------- */
  const tabBtns = document.querySelectorAll('.tab-btn');
  const solicitudes = [
    { id: 1, tipoPet: 'requests',   tipoEv: 3, paciente: 'Sofía Paredes', fecha: '2025-05-25', hora: '12:00' },
    { id: 2, tipoPet: 'reschedules', tipoEv: 2, paciente: 'Luis García',    fecha: '2025-05-22', hora: '11:00' }
  ];

  /**
   * Construye la tarjeta de solicitud/reprogramación.
   * @param {Object} s 
   */
  function buildCard(s) {
    const isReq    = s.tipoPet === 'requests';
    const title    = isReq ? 'Solicitud de Cita' : 'Solicitud de Reprogramación';
    const dateLabel= isReq ? 'Fecha solicitada' : 'Nueva fecha propuesta';
    const evNames  = [
      '', 
      'Evaluación Socioeconómica', 
      'Consulta de Valoración Psicológica', 
      'Cita de Terapia'
    ];

    const card = document.createElement('div');
    card.className = 'request-item';
    card.innerHTML = `
      <h3>${title}</h3>
      <p><strong>Paciente:</strong> ${s.paciente}</p>
      <p><strong>Tipo de Evento:</strong> ${evNames[s.tipoEv]}</p>
      <p><strong>${dateLabel}:</strong> ${s.fecha} ${s.hora}</p>
      <div class="request-actions">
        <button class="approve-btn">Gestionar</button>
      </div>`;

    // Al hacer click, lanzamos el evento para abrir el modal de agenda
    card.querySelector('.approve-btn').addEventListener('click', () => {
      window.dispatchEvent(new CustomEvent('openRequest', { detail: s }));
    });

    return card;
  }

  /**
   * Renderiza ambas pestañas (requests / reschedules) según data-tab.
   */
  function renderInbox() {
    tabBtns.forEach(btn => {
      const tabKey   = btn.dataset.tab;                // 'requests' o 'reschedules'
      const container= document.getElementById(`${tabKey}-tab`);
      const countEl  = document.getElementById(`${tabKey}-count`);
      // Limpia
      container.innerHTML = '';
      // Filtra y pinta
      const items = solicitudes.filter(s => s.tipoPet === tabKey);
      items.forEach(s => container.appendChild(buildCard(s)));
      // Actualiza contador
      countEl.textContent = `(${items.length})`;
    });
  }

  // Inicializa la bandeja
  renderInbox();

  /* --- Cambio de pestañas ---------------------------------- */
  tabBtns.forEach(btn => btn.addEventListener('click', e => {
    tabBtns.forEach(x => x.classList.remove('active'));
    document.querySelectorAll('.tab-content').forEach(x => x.classList.remove('active'));
    e.currentTarget.classList.add('active');
    document.getElementById(`${e.currentTarget.dataset.tab}-tab`).classList.add('active');
  }));

  /* --- Al crear un evento en la agenda eliminamos la solicitud correspondiente --- */
  window.addEventListener('eventCreated', e => {
    const createdId = e.detail.id;
    const idx = solicitudes.findIndex(s => s.id === createdId);
    if (idx >= 0) {
      solicitudes.splice(idx, 1);
      renderInbox();
    }
  });

});
