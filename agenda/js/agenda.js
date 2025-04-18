document.addEventListener("DOMContentLoaded", () => {
  // Elementos para filtros
  const filterPeriodSelect = document.getElementById("filterPeriod");
  const filterDateInput = document.getElementById("filterDate");
  const applyFilterBtn = document.getElementById("applyFilter");
  const printBtn = document.getElementById("printView");

  // Variables globales adicionales
  const diagnosticTime = document.getElementById("diagnosticTime");
  const diagnosticDuration = document.getElementById("diagnosticDuration");

  // Contenedor del calendario
  const calendarContainer = document.getElementById("calendarContainer");

  // Modales
  const appointmentModal = document.getElementById("appointmentModal");
  const closeModalBtn = document.getElementById("closeModal");
  const modalInfo = document.getElementById("modalInfo");

  const messageModal = document.getElementById("messageModal");
  const closeMessageModalBtn = document.getElementById("closeMessageModal");
  const messageForm = document.getElementById("messageForm");
  const messageRecipient = document.getElementById("messageRecipient");
  const specificPatientContainer = document.getElementById("specificPatientContainer");

  // Bandeja de entrada
  const tabButtons = document.querySelectorAll(".tab-btn");
  const tabContents = document.querySelectorAll(".tab-content");
  const newMessageBtn = document.getElementById("newMessageBtn");

  // Modal de solicitudes
  const requestModal = document.getElementById("requestModal");
  const closeRequestModalBtn = document.getElementById("closeRequestModal");
  const requestModalTitle = document.getElementById("requestModalTitle");
  const requestModalInfo = document.getElementById("requestModalInfo");
  const initialInterviewForm = document.getElementById("initialInterviewForm");
  const scheduleInterviewForm = document.getElementById("scheduleInterviewForm");
  const includeDiagnosticCheckbox = document.getElementById("includeDiagnostic");
  const diagnosticInterviewFields = document.getElementById("diagnosticInterviewFields");
  const cancelScheduleBtn = document.getElementById("cancelScheduleBtn");

  // Elementos del formulario de entrevista
  const interviewTime = document.getElementById("interviewTime");
  const interviewDuration = document.getElementById("interviewDuration");

  // Horario de atención (9 a.m. a 6 p.m.)
  const startHour = 9;
  const endHour = 18;

  // Citas de ejemplo
  const sampleAppointments = [
    {
      id: 1,
      date: getFormattedDate(addDays(new Date(), 0)),
      start: "09:00",
      end: "10:00",
      therapy: "Primer Contacto",
      patient: "Carlos Gómez Martínez",
      therapist: "Lucía Rivera Torres",
      room: "Sala 101",
      phone: "555-1234",
    },
    // ... (resto de las citas de ejemplo)
  ];

  // Solicitudes de ejemplo
  const sampleRequests = [
    {
      id: 1,
      type: "new",
      patient: "Juan Pérez López",
      email: "juan.perez@example.com",
      phone: "5551234567",
      requestedDate: "2023-12-15",
      requestedTime: "10:00",
      therapyType: "Primer Contacto",
      status: "pending",
      details: "Necesito ayuda con ansiedad generalizada",
    },
    // ... (resto de las solicitudes de ejemplo)
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

  /* FUNCIONES PRINCIPALES */

  // Función para agregar días a una fecha
  function addDays(date, days) {
    let result = new Date(date);
    result.setDate(result.getDate() + days);
    return result;
  }

  // Función para formatear fecha como "YYYY-MM-DD"
  function getFormattedDate(date) {
    let year = date.getFullYear();
    let month = ("0" + (date.getMonth() + 1)).slice(-2);
    let day = ("0" + date.getDate()).slice(-2);
    return `${year}-${month}-${day}`;
  }

  // Función para formatear fecha legible
  function formatReadableDate(dateString) {
    const options = { weekday: "long", year: "numeric", month: "long", day: "numeric" };
    return new Date(dateString).toLocaleDateString("es-ES", options);
  }

  // Función para obtener el inicio de la semana (lunes) de una fecha dada
  function getStartOfWeek(date) {
    const day = date.getDay();
    const diff = day === 0 ? -6 : 1 - day;
    return addDays(date, diff);
  }

  // Función para limpiar el contenedor del calendario
  function clearCalendar() {
    calendarContainer.innerHTML = "";
  }

  // Función para renderizar la cabecera del calendario (días de la semana)
  function renderCalendarHeader(startDate) {
    let emptyHeader = document.createElement("div");
    emptyHeader.className = "day-header";
    calendarContainer.appendChild(emptyHeader);
    for (let i = 0; i < 7; i++) {
      let currentDate = addDays(startDate, i);
      let headerCell = document.createElement("div");
      headerCell.className = "day-header";
      headerCell.textContent = currentDate.toLocaleDateString("es-ES", {
        weekday: "short",
        day: "numeric",
        month: "numeric",
      });
      calendarContainer.appendChild(headerCell);
    }
  }

  // Función para renderizar la columna de horarios y las celdas vacías de cada fila
  function renderCalendarGrid(startDate) {
    for (let hour = startHour; hour < endHour; hour++) {
      let timeCell = document.createElement("div");
      timeCell.className = "time-cell";
      timeCell.textContent = (hour < 10 ? "0" + hour : hour) + ":00";
      calendarContainer.appendChild(timeCell);
      for (let i = 0; i < 7; i++) {
        let cellDiv = document.createElement("div");
        cellDiv.className = "empty-cell cell-container";
        let cellDate = addDays(startDate, i);
        cellDiv.dataset.date = getFormattedDate(cellDate);
        cellDiv.dataset.hour = (hour < 10 ? "0" + hour : hour) + ":00";
        calendarContainer.appendChild(cellDiv);
      }
    }
  }

  // Función para asignar un color basado en el nombre del paciente
  function getColorClass(patientName) {
    const colors = ["color1", "color2", "color3", "color4", "color5", "color6", "color7"];
    let hash = 0;
    for (let i = 0; i < patientName.length; i++) {
      hash = patientName.charCodeAt(i) + ((hash << 5) - hash);
    }
    return colors[Math.abs(hash) % colors.length];
  }

  // Función para renderizar las citas dentro del calendario
  function renderAppointments(appointments, startDate, viewPeriod = "week") {
    appointments.forEach((app) => {
      let appDate = new Date(app.date);
      let startWeek = startDate;
      let endWeek = addDays(startDate, 6);
      if (appDate >= startWeek && appDate <= endWeek) {
        let cellSelector = `.cell-container[data-date="${app.date}"][data-hour="${app.start}"]`;
        let cell = calendarContainer.querySelector(cellSelector);
        if (cell) {
          let apptDiv = document.createElement("div");
          apptDiv.className = `appointment ${getColorClass(app.patient)}`;
          apptDiv.textContent = `Tipo de terapia: ${app.therapy} - ${app.patient} - ${app.therapist}`;
          apptDiv.style.top = "0";
          apptDiv.style.left = "0";
          apptDiv.style.width = "100%";
          apptDiv.style.height = "100%";
          apptDiv.dataset.info = JSON.stringify(app);
          apptDiv.addEventListener("click", function (e) {
            let info = JSON.parse(this.dataset.info);
            openAppointmentModal(info);
            e.stopPropagation();
          });
          cell.appendChild(apptDiv);
        }
      }
    });
  }

  // Función para renderizar la vista completa del calendario según el filtro
  function renderCalendar() {
    clearCalendar();
    let filterPeriod = filterPeriodSelect.value;
    let refDate = filterDateInput.value ? new Date(filterDateInput.value) : new Date();

    if (filterPeriod === "week" || filterPeriod === "") {
      let startOfWeek = getStartOfWeek(refDate);
      renderCalendarHeader(startOfWeek);
      renderCalendarGrid(startOfWeek);
      renderAppointments(sampleAppointments, startOfWeek, "week");
    } else if (filterPeriod === "day") {
      calendarContainer.style.gridTemplateColumns = "60px 1fr";
      calendarContainer.innerHTML = "";
      let emptyHeader = document.createElement("div");
      emptyHeader.className = "day-header";
      calendarContainer.appendChild(emptyHeader);
      let headerCell = document.createElement("div");
      headerCell.className = "day-header";
      headerCell.textContent = refDate.toLocaleDateString("es-ES", {
        weekday: "long",
        day: "numeric",
        month: "numeric",
      });
      calendarContainer.appendChild(headerCell);
      for (let hour = startHour; hour < endHour; hour++) {
        let timeCell = document.createElement("div");
        timeCell.className = "time-cell";
        timeCell.textContent = (hour < 10 ? "0" + hour : hour) + ":00";
        calendarContainer.appendChild(timeCell);
        let cellDiv = document.createElement("div");
        cellDiv.className = "empty-cell cell-container";
        cellDiv.dataset.date = getFormattedDate(refDate);
        cellDiv.dataset.hour = (hour < 10 ? "0" + hour : hour) + ":00";
        calendarContainer.appendChild(cellDiv);
      }
      renderAppointments(sampleAppointments, refDate, "day");
    } else if (filterPeriod === "month") {
      let startOfWeek = getStartOfWeek(refDate);
      renderCalendarHeader(startOfWeek);
      renderCalendarGrid(startOfWeek);
      renderAppointments(sampleAppointments, startOfWeek, "week");
    }
  }

  /* FUNCIONES PARA MODALES */

  // Función para abrir modal de cita
  function openAppointmentModal(info) {
    modalInfo.innerHTML = `
      <p><strong>Fecha:</strong> ${info.date}</p>
      <p><strong>Hora:</strong> ${info.start} - ${info.end}</p>
      <p><strong>Sala:</strong> ${info.room}</p>
      <p><strong>Paciente:</strong> ${info.patient}</p>
      <p><strong>Terapeuta:</strong> ${info.therapist}</p>
      <p><strong>Tipo de terapia:</strong> ${info.therapy}</p>
      <p><strong>Contacto:</strong> ${info.phone}</p>
    `;
    appointmentModal.style.display = "block";
  }

  // Función para mostrar los detalles de una solicitud
  function showRequestDetails(requestId) {
    const request = sampleRequests.find((r) => r.id === requestId);
    if (!request) return;

    currentRequest = request;

    if (request.type === "new") {
      requestModalTitle.textContent = "Solicitud de Nueva Cita";
      requestModalInfo.innerHTML = `
        <p><strong>Paciente:</strong> ${request.patient}</p>
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

  // Función para programar entrevista (actualizada)
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
    
    // Calcular hora de fin de la entrevista inicial
    const endInitialTime = calculateEndTime(interviewTimeValue, interviewDurationValue);
    
    // Validar horarios si se incluye diagnóstico
    if (includeDiagnostic) {
      const diagnosticTimeValue = diagnosticTime.value;
      const diagnosticDurationValue = diagnosticDuration.value;
      
      if (!diagnosticTimeValue || !diagnosticDurationValue) {
        alert("Por complete los campos de la entrevista diagnóstica");
        return;
      }
      
      // Validar que la hora diagnóstica sea posterior a la inicial
      if (diagnosticTimeValue <= endInitialTime) {
        alert("La entrevista diagnóstica debe programarse después de que termine la entrevista inicial");
        return;
      }
      
      // Validar disponibilidad para diagnóstico
      const diagnosticEndTime = calculateEndTime(diagnosticTimeValue, diagnosticDurationValue);
      if (!checkAvailability(interviewDate, diagnosticTimeValue, diagnosticEndTime)) {
        alert("El horario seleccionado para la entrevista diagnóstica no está disponible");
        return;
      }
    }
    
    // Validar disponibilidad para entrevista inicial
    if (!checkAvailability(interviewDate, interviewTimeValue, endInitialTime)) {
      alert("El horario seleccionado para la entrevista inicial no está disponible");
      return;
    }
    
    // Crear nueva cita para entrevista inicial
    const newAppointment = {
      id: sampleAppointments.length + 1,
      date: interviewDate,
      start: interviewTimeValue,
      end: endInitialTime,
      therapy: "Entrevista Inicial",
      patient: currentRequest.patient,
      therapist: document.getElementById("interviewTherapist").options[
        document.getElementById("interviewTherapist").selectedIndex
      ].text,
      room: room,
      phone: currentRequest.phone
    };
    
    // Agregar a las citas
    sampleAppointments.push(newAppointment);
    
    // Crear cita de diagnóstico si está marcado
    if (includeDiagnostic) {
      const diagnosticTimeValue = diagnosticTime.value;
      const diagnosticDurationValue = diagnosticDuration.value;
      const diagnosticEndTime = calculateEndTime(diagnosticTimeValue, diagnosticDurationValue);
      
      const diagnosticAppointment = {
        id: sampleAppointments.length + 1,
        date: interviewDate,
        start: diagnosticTimeValue,
        end: diagnosticEndTime,
        therapy: "Entrevista Diagnóstica",
        patient: currentRequest.patient,
        therapist: document.getElementById("diagnosticTherapist").options[
          document.getElementById("diagnosticTherapist").selectedIndex
        ].text,
        room: document.getElementById("diagnosticRoom").value,
        phone: currentRequest.phone
      };
      sampleAppointments.push(diagnosticAppointment);
    }
    
    // Actualizar calendario y cerrar modal
    renderCalendar();
    alert("Entrevista(s) programada(s) exitosamente");
    requestModal.style.display = "none";
    scheduleInterviewForm.reset();
  }

  // Función para verificar disponibilidad (simulada)
  function checkAvailability(date, startTime, endTime) {
    // En una implementación real, verificaría contra las citas existentes
    // Aquí simplemente devolvemos true para el ejemplo
    return true;
  }

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

  /* EVENT LISTENERS */

  // Calendario
  closeModalBtn.addEventListener("click", () => {
    appointmentModal.style.display = "none";
  });

  applyFilterBtn.addEventListener("click", () => {
    calendarContainer.style.gridTemplateColumns = "60px repeat(7, 1fr)";
    renderCalendar();
  });

  printBtn.addEventListener("click", () => {
    window.print();
  });

  filterPeriodSelect.addEventListener("change", renderCalendar);

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
    // Guardar posición actual del scroll
    const currentScroll = requestModal.scrollTop;

    if (this.checked) {
      diagnosticInterviewFields.classList.remove("hidden");
      updateDiagnosticTime(); // Actualizar hora de diagnóstico al mostrar
    } else {
      diagnosticInterviewFields.classList.add("hidden");
    }

    // Restaurar posición del scroll después del cambio
    requestModal.scrollTop = currentScroll;
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

  /* INICIALIZACIÓN */

  // Establecer la fecha de filtro a hoy y renderizar la vista inicial
  filterDateInput.value = getFormattedDate(new Date());
  renderCalendar();
});