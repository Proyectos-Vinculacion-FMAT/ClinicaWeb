/* ==========================================================================
   bandeja-entrada.js – lógica de solicitudes, mensajería y programación
   ========================================================================== */
document.addEventListener('DOMContentLoaded', () => {
  /* -----------------------------------------------------------------------
     ELEMENTOS BÁSICOS
     ----------------------------------------------------------------------- */
  const tabButtons               = document.querySelectorAll('.tab-btn');
  const tabContents              = document.querySelectorAll('.tab-content');

  /* Mensajes */
  const newMessageBtn            = document.getElementById('newMessageBtn');
  const messageModal             = document.getElementById('messageModal');
  const closeMessageModalBtn     = document.getElementById('closeMessageModal');
  const messageForm              = document.getElementById('messageForm');
  const messageRecipient         = document.getElementById('messageRecipient');
  const specificPatientContainer = document.getElementById('specificPatientContainer');

  /* Solicitudes */
  const requestModal             = document.getElementById('requestModal');
  const closeRequestModalBtn     = document.getElementById('closeRequestModal');
  const requestModalTitle        = document.getElementById('requestModalTitle');
  const requestModalInfo         = document.getElementById('requestModalInfo');

  /* Formulario de entrevista */
  const initialInterviewForm     = document.getElementById('initialInterviewForm');
  const scheduleInterviewForm    = document.getElementById('scheduleInterviewForm');
  const includeDiagnosticCheckbox= document.getElementById('includeDiagnostic');
  const diagnosticInterviewFields= document.getElementById('diagnosticInterviewFields');
  const cancelScheduleBtn        = document.getElementById('cancelScheduleBtn');

  const interviewTime            = document.getElementById('interviewTime');
  const interviewDuration        = document.getElementById('interviewDuration');
  const diagnosticTime           = document.getElementById('diagnosticTime');
  const diagnosticDuration       = document.getElementById('diagnosticDuration');

  /* -----------------------------------------------------------------------
     DATOS DE DEMOSTRACIÓN
     ----------------------------------------------------------------------- */
  const sampleRequests = [
    {
      id: 1,
      type: 'new',
      patient: 'Juan Pérez López',
      email: 'juan.perez@example.com',
      phone: '5551234567',
      requestedDate: '2025-04-21',
      requestedTime: '10:00',
      therapyType: 'Primer Contacto',
      status: 'pending',
      details: 'Necesito ayuda con ansiedad generalizada'
    },
    {
      id: 2,
      type: 'reschedule',
      patient: 'Mariana López Sánchez',
      email: 'mariana.lopez@example.com',
      phone: '5552345678',
      currentDate: '2023-12-20',
      currentTime: '16:30',
      requestedDate: '2023-12-22',
      requestedTime: '11:00',
      reason: 'Conflicto de horario',
      status: 'pending',
      details: 'Tengo un compromiso laboral ineludible'
    }
  ];

  /* -----------------------------------------------------------------------
     UTILIDADES
     ----------------------------------------------------------------------- */
  const pad = n => String(n).padStart(2, '0');

  const formatDate = iso =>
    new Date(iso).toLocaleDateString('es-ES', { weekday: 'long', year: 'numeric', month: 'long', day: 'numeric' });

  const calcEndTime = (start, mins) => {
    const [h, m] = start.split(':').map(Number);
    const total  = h * 60 + m + Number(mins);
    return `${pad(Math.floor(total / 60))}:${pad(total % 60)}`;
  };

  /* -----------------------------------------------------------------------
     RENDER DE BANDEJA (Solicitudes)
     ----------------------------------------------------------------------- */
  const requestsTab    = document.getElementById('requests-tab');
  const reschedulesTab = document.getElementById('reschedules-tab');

  function buildRequestItem(req) {
    const div = document.createElement('div');
    div.className   = 'request-item';
    div.dataset.id  = req.id;

    if (req.type === 'new') {
      div.innerHTML = `
        <h3>Solicitud de Cita</h3>
        <p><strong>Candidato:</strong> ${req.patient}</p>
        <p><strong>Fecha solicitada:</strong> ${formatDate(req.requestedDate)}</p>
        <p><strong>Estado:</strong> <span class="status-pending">Pendiente</span></p>
        <div class="request-actions">
          <button class="approve-btn" data-id="${req.id}">Ver Solicitud</button>
        </div>`;
    } else {
      div.innerHTML = `
        <h3>Solicitud de Reprogramación</h3>
        <p><strong>Paciente:</strong> ${req.patient}</p>
        <p><strong>Nueva fecha propuesta:</strong> ${formatDate(req.requestedDate)} ${req.requestedTime}</p>
        <p><strong>Estado:</strong> <span class="status-pending">Pendiente</span></p>
        <div class="request-actions">
          <button class="approve-btn" data-id="${req.id}">Ver Solicitud</button>
        </div>`;
    }
    return div;
  }

  function renderRequests() {
    requestsTab.innerHTML    = '';
    reschedulesTab.innerHTML = '';
    sampleRequests.forEach(r => {
      (r.type === 'new' ? requestsTab : reschedulesTab).appendChild(buildRequestItem(r));
    });
  }

  /* -----------------------------------------------------------------------
     CAMBIO DE PESTAÑA
     ----------------------------------------------------------------------- */
  function switchTab(e) {
    const tab = e.target.dataset.tab;
    tabButtons.forEach(b => b.classList.remove('active'));
    tabContents.forEach(c => c.classList.remove('active'));
    e.target.classList.add('active');
    document.getElementById(`${tab}-tab`).classList.add('active');
  }

  /* -----------------------------------------------------------------------
     MENSAJERÍA
     ----------------------------------------------------------------------- */
  function openMessageModal() {
    messageModal.style.display = 'block';
  }

  function handleRecipientChange() {
    specificPatientContainer.classList.toggle('hidden', messageRecipient.value !== 'specific');
  }

  function sendMessage(e) {
    e.preventDefault();
    const subject   = document.getElementById('messageSubject').value.trim();
    const content   = document.getElementById('messageContent').value.trim();
    const recipient = messageRecipient.value === 'specific'
      ? document.getElementById('specificPatient').selectedOptions[0].text
      : messageRecipient.selectedOptions[0].text;

    if (!subject || !content) return alert('Asunto y mensaje son obligatorios');
    alert(`Mensaje enviado a ${recipient}: ${subject}`);
    messageForm.reset();
    messageModal.style.display = 'none';
  }

  /* -----------------------------------------------------------------------
     DETALLE DE SOLICITUD
     ----------------------------------------------------------------------- */
  let currentRequest = null;

  function showRequestDetails(id) {
    const r = sampleRequests.find(x => x.id === id);
    if (!r) return;
    currentRequest = r;

    if (r.type === 'new') {
      requestModalTitle.textContent = 'Solicitud de Nueva Cita';
      requestModalInfo.innerHTML = `
        <p><strong>Candidato:</strong> ${r.patient}</p>
        <p><strong>Contacto:</strong> ${r.phone} / ${r.email}</p>
        <p><strong>Fecha solicitada:</strong> ${formatDate(r.requestedDate)} a las ${r.requestedTime}</p>
        <p><strong>Tipo de terapia:</strong> ${r.therapyType}</p>
        <p><strong>Detalles:</strong> ${r.details}</p>`;
      initialInterviewForm.classList.remove('hidden');
      document.getElementById('interviewDate').value = r.requestedDate;
      document.getElementById('interviewTime').value = r.requestedTime;
    } else {
      requestModalTitle.textContent = 'Solicitud de Reprogramación';
      requestModalInfo.innerHTML = `
        <p><strong>Paciente:</strong> ${r.patient}</p>
        <p><strong>Contacto:</strong> ${r.phone} / ${r.email}</p>
        <p><strong>Cita actual:</strong> ${formatDate(r.currentDate)} a las ${r.currentTime}</p>
        <p><strong>Nueva fecha propuesta:</strong> ${formatDate(r.requestedDate)} a las ${r.requestedTime}</p>
        <p><strong>Motivo:</strong> ${r.reason}</p>
        <p><strong>Detalles:</strong> ${r.details}</p>`;
      initialInterviewForm.classList.add('hidden');
    }

    requestModal.style.display = 'block';
  }

  /* -----------------------------------------------------------------------
     PROGRAMAR ENTREVISTA
     ----------------------------------------------------------------------- */
  function updateDiagnosticTime() {
    if (!interviewTime.value || !interviewDuration.value) return;
    const end   = calcEndTime(interviewTime.value, interviewDuration.value);
    const [h,m] = end.split(':').map(Number);
    const n     = new Date();
    n.setHours(h, m + 15, 0, 0); // +15 minutos
    diagnosticTime.value = `${pad(n.getHours())}:${pad(n.getMinutes())}`;
  }

  function scheduleInterview(e) {
    e.preventDefault();
    const date  = document.getElementById('interviewDate').value;
    const time  = interviewTime.value;
    const dur   = interviewDuration.value;
    const ther  = document.getElementById('interviewTherapist').value;
    const room  = document.getElementById('interviewRoom').value;
    if (!date || !time || !dur || !ther || !room) return alert('Complete todos los campos');
    alert('Entrevista programada exitosamente');
    requestModal.style.display = 'none';
    scheduleInterviewForm.reset();
  }

  /* -----------------------------------------------------------------------
     EVENT LISTENERS
     ----------------------------------------------------------------------- */
  tabButtons.forEach(b => b.addEventListener('click', switchTab));

  /* Mensajes */
  newMessageBtn      .addEventListener('click', openMessageModal);
  closeMessageModalBtn.addEventListener('click', () => messageModal.style.display = 'none');
  messageRecipient   .addEventListener('change', handleRecipientChange);
  messageForm        .addEventListener('submit', sendMessage);

  /* Solicitudes */
  document.addEventListener('click', e => {
    if (e.target.matches('.approve-btn')) showRequestDetails(Number(e.target.dataset.id));
  });
  closeRequestModalBtn.addEventListener('click', () => requestModal.style.display = 'none');

  /* Entrevista */
  interviewTime     .addEventListener('change', updateDiagnosticTime);
  interviewDuration .addEventListener('change', updateDiagnosticTime);
  includeDiagnosticCheckbox.addEventListener('change', () =>
    diagnosticInterviewFields.classList.toggle('hidden', !includeDiagnosticCheckbox.checked)
  );
  scheduleInterviewForm.addEventListener('submit', scheduleInterview);
  cancelScheduleBtn     .addEventListener('click', () => {
    requestModal.style.display = 'none';
    scheduleInterviewForm.reset();
  });

  /* -----------------------------------------------------------------------
     INICIALIZACIÓN
     ----------------------------------------------------------------------- */
  renderRequests();
  handleRecipientChange();
});
