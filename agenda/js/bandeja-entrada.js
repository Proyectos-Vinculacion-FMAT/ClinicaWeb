document.addEventListener("DOMContentLoaded", () => {
    // Elementos de la bandeja de entrada
    const tabButtons = document.querySelectorAll(".tab-btn");
    const tabContents = document.querySelectorAll(".tab-content");
    const newMessageBtn = document.getElementById("newMessageBtn");
    const messageModal = document.getElementById("messageModal");
    const closeMessageModalBtn = document.getElementById("closeMessageModal");
    const messageForm = document.getElementById("messageForm");
    const messageRecipient = document.getElementById("messageRecipient");
    const specificPatientContainer = document.getElementById("specificPatientContainer");
    const requestModal = document.getElementById("requestModal");
    const closeRequestModalBtn = document.getElementById("closeRequestModal");
    const requestModalTitle = document.getElementById("requestModalTitle");
    const requestModalInfo = document.getElementById("requestModalInfo");
    const initialInterviewForm = document.getElementById("initialInterviewForm");
    const scheduleInterviewForm = document.getElementById("scheduleInterviewForm");
    const includeDiagnosticCheckbox = document.getElementById("includeDiagnostic");
    const diagnosticInterviewFields = document.getElementById("diagnosticInterviewFields");
    const cancelScheduleBtn = document.getElementById("cancelScheduleBtn");
    const interviewTime = document.getElementById("interviewTime");
    const interviewDuration = document.getElementById("interviewDuration");
    const diagnosticTime = document.getElementById("diagnosticTime");
    const diagnosticDuration = document.getElementById("diagnosticDuration");
  
    // Solicitudes de ejemplo
    const sampleRequests = [
      {
        id: 1,
        type: "new",
        patient: "Juan Pérez López",
        email: "juan.perez@example.com",
        phone: "5551234567",
        requestedDate: "2025-04-21",
        requestedTime: "10:00",
        therapyType: "Primer Contacto",
        status: "pending",
        details: "Necesito ayuda con ansiedad generalizada",
      },
      {
        id: 2,
        type: "reschedule",
        patient: "Mariana López Sánchez",
        email: "mariana.lopez@example.com",
        phone: "5552345678",
        currentDate: "2023-12-20",
        currentTime: "16:30",
        requestedDate: "2023-12-22",
        requestedTime: "11:00",
        reason: "Conflicto de horario",
        status: "pending",
        details: "Tengo un compromiso laboral ineludible",
      },
    ];
  
    // Mensajes de ejemplo
    const sampleMessages = [
      {
        id: 1,
        subject: "Recordatorio de Pago",
        recipient: "Todos los pacientes",
        date: "10/12/2023 09:30",
        content: "Recordatorio: El pago de la sesión debe realizarse al menos 24 horas antes.",
      },
    ];
  
    // Variables de estado
    let currentRequest = null;
  
    /* FUNCIONES PARA BANDEJA DE ENTRADA */
  
    // Función para cambiar entre pestañas
    function switchTab(event) {
      const tabId = event.target.dataset.tab;
  
      // Remover clase active de todos los botones y contenidos
      tabButtons.forEach((btn) => btn.classList.remove("active"));
      tabContents.forEach((content) => content.classList.remove("active"));
  
      // Agregar clase active al botón clickeado
      event.target.classList.add("active");
  
      // Mostrar el contenido correspondiente
      document.getElementById(`${tabId}-tab`).classList.add("active");
    }
  
    // Función para abrir modal de nuevo mensaje
    function openMessageModal() {
      messageModal.style.display = "block";
    }
  
    // Función para manejar cambios en el destinatario
    function handleRecipientChange() {
      if (messageRecipient.value === "specific") {
        specificPatientContainer.classList.remove("hidden");
      } else {
        specificPatientContainer.classList.add("hidden");
      }
    }
  
    // Función para enviar mensaje
    function sendMessage(event) {
      event.preventDefault();
  
      const subject = document.getElementById("messageSubject").value;
      const content = document.getElementById("messageContent").value;
      const recipient =
        messageRecipient.value === "specific"
          ? document.getElementById("specificPatient").options[
              document.getElementById("specificPatient").selectedIndex
            ].text
          : messageRecipient.options[messageRecipient.selectedIndex].text;
  
      // Simular envío exitoso
      alert(`Mensaje enviado a ${recipient}: ${subject}`);
  
      // Limpiar formulario y cerrar modal
      messageForm.reset();
      messageModal.style.display = "none";
    }
  
    // Función para formatear fecha legible
    function formatReadableDate(dateString) {
      const options = { weekday: "long", year: "numeric", month: "long", day: "numeric" };
      return new Date(dateString).toLocaleDateString("es-ES", options);
    }
  
    // Función para mostrar los detalles de una solicitud
    function showRequestDetails(requestId) {
      const request = sampleRequests.find((r) => r.id === requestId);
      if (!request) return;
  
      currentRequest = request;
  
      if (request.type === "new") {
        requestModalTitle.textContent = "Solicitud de Nueva Cita";
        requestModalInfo.innerHTML = `
          <p><strong>Candidato:</strong> ${request.patient}</p>
          <p><strong>Contacto:</strong> ${request.phone} / ${request.email}</p>
          <p><strong>Fecha solicitada:</strong> ${formatReadableDate(
            request.requestedDate
          )} a las ${request.requestedTime}</p>
          <p><strong>Tipo de terapia:</strong> ${request.therapyType}</p>
          <p><strong>Detalles:</strong> ${request.details}</p>
        `;
        initialInterviewForm.classList.remove("hidden");
        
        // Establecer fecha por defecto como la solicitada
        document.getElementById("interviewDate").value = request.requestedDate;
        document.getElementById("interviewTime").value = request.requestedTime;
      } else {
        requestModalTitle.textContent = "Solicitud de Reprogramación";
        requestModalInfo.innerHTML = `
          <p><strong>Paciente:</strong> ${request.patient}</p>
          <p><strong>Contacto:</strong> ${request.phone} / ${request.email}</p>
          <p><strong>Cita actual:</strong> ${formatReadableDate(
            request.currentDate
          )} a las ${request.currentTime}</p>
          <p><strong>Nueva fecha propuesta:</strong> ${formatReadableDate(
            request.requestedDate
          )} a las ${request.requestedTime}</p>
          <p><strong>Motivo:</strong> ${request.reason}</p>
          <p><strong>Detalles:</strong> ${request.details}</p>
        `;
        initialInterviewForm.classList.add("hidden");
      }
  
      requestModal.style.display = "block";
    }
  
    // Función para calcular la hora de fin basada en la hora de inicio y duración
    function calculateEndTime(startTime, duration) {
      const [hours, minutes] = startTime.split(":").map(Number);
      const totalMinutes = hours * 60 + minutes + Number(duration);
      const endHours = Math.floor(totalMinutes / 60);
      const endMinutes = totalMinutes % 60;
      return `${String(endHours).padStart(2, "0")}:${String(endMinutes).padStart(2, "0")}`;
    }
  
    // Función para actualizar automáticamente la hora de la entrevista diagnóstica
    function updateDiagnosticTime() {
      const interviewTimeValue = interviewTime.value;
      const interviewDurationValue = interviewDuration.value;
      
      if (interviewTimeValue && interviewDurationValue) {
        // Calcular hora de fin de la entrevista inicial
        const endTime = calculateEndTime(interviewTimeValue, interviewDurationValue);
        
        // Establecer la hora de la entrevista diagnóstica 15 minutos después
        const [hours, minutes] = endTime.split(":").map(Number);
        const diagnosticTimeValue = new Date();
        diagnosticTimeValue.setHours(hours, minutes + 15, 0, 0);
        
        // Formatear como HH:MM
        const formattedTime = `${String(diagnosticTimeValue.getHours()).padStart(2, "0")}:${String(diagnosticTimeValue.getMinutes()).padStart(2, "0")}`;
        diagnosticTime.value = formattedTime;
      }
    }
  
    // Función para programar entrevista
    function scheduleInterview(event) {
      event.preventDefault();
      
      // Obtener valores del formulario
      const interviewDate = document.getElementById("interviewDate").value;
      const interviewTimeValue = interviewTime.value;
      const interviewDurationValue = interviewDuration.value;
      const therapist = document.getElementById("interviewTherapist").value;
      const room = document.getElementById("interviewRoom").value;
      const includeDiagnostic = includeDiagnosticCheckbox.checked;
      
      // Validar campos requeridos
      if (!interviewDate || !interviewTimeValue || !interviewDurationValue || !therapist || !room) {
        alert("Por favor complete todos los campos requeridos");
        return;
      }
      
      // Simular éxito (en una implementación real esto se conectaría al backend)
      alert("Entrevista programada exitosamente");
      
      // Cerrar modal y limpiar formulario
      requestModal.style.display = "none";
      scheduleInterviewForm.reset();
    }
  
    /* EVENT LISTENERS */
  
    // Bandeja de entrada
    tabButtons.forEach((btn) => btn.addEventListener("click", switchTab));
    newMessageBtn.addEventListener("click", openMessageModal);
    closeMessageModalBtn.addEventListener("click", () => (messageModal.style.display = "none"));
    messageRecipient.addEventListener("change", handleRecipientChange);
    messageForm.addEventListener("submit", sendMessage);
  
    // Solicitudes
    document.querySelectorAll(".approve-btn").forEach((btn) => {
      btn.addEventListener("click", function () {
        const requestId = parseInt(this.closest(".request-item").dataset.id);
        showRequestDetails(requestId);
      });
    });
  
    closeRequestModalBtn.addEventListener("click", () => {
      requestModal.style.display = "none";
    });
  
    // Actualizar hora de diagnóstico cuando cambia la hora inicial
    interviewTime.addEventListener("change", updateDiagnosticTime);
    interviewDuration.addEventListener("change", updateDiagnosticTime);
  
    includeDiagnosticCheckbox.addEventListener("change", function () {
      if (this.checked) {
        diagnosticInterviewFields.classList.remove("hidden");
        updateDiagnosticTime();
      } else {
        diagnosticInterviewFields.classList.add("hidden");
      }
    });
  
    scheduleInterviewForm.addEventListener("submit", scheduleInterview);
  
    cancelScheduleBtn.addEventListener("click", () => {
      requestModal.style.display = "none";
      scheduleInterviewForm.reset();
    });
  
    // Asignar IDs a las solicitudes en el DOM
    document.querySelectorAll(".request-item").forEach((item, index) => {
      item.dataset.id = sampleRequests[index].id;
    });
  });