document.addEventListener("DOMContentLoaded", () => {
  // Elementos para filtros
  const filterPeriodSelect = document.getElementById("filterPeriod");
  const filterDateInput = document.getElementById("filterDate");
  const applyFilterBtn = document.getElementById("applyFilter");
  const printBtn = document.getElementById("printView");

  // Contenedor del calendario
  const calendarContainer = document.getElementById("calendarContainer");

  // Modales
  const appointmentModal = document.getElementById("appointmentModal");
  const closeModalBtn = document.getElementById("closeModal");
  const modalInfo = document.getElementById("modalInfo");

  // Botón para nuevo evento
  const newEventBtn = document.createElement("button");
  newEventBtn.id = "newEventBtn";
  newEventBtn.textContent = "Nuevo Evento";
  document.querySelector("#filters .filter-group").appendChild(newEventBtn);

  // Modal para nuevo evento
  const newEventModal = document.createElement("div");
  newEventModal.id = "newEventModal";
  newEventModal.className = "modal";
  newEventModal.innerHTML = `
    <div class="modal-content">
      <span class="close-button" id="closeNewEventModal">&times;</span>
      <h2>Nuevo Evento</h2>
      <form id="newEventForm">
        <div class="form-group">
          <label for="eventTitle">Título:</label>
          <input type="text" id="eventTitle" required>
        </div>
        <div class="form-group">
          <label for="eventDate">Fecha:</label>
          <input type="date" id="eventDate" required>
        </div>
        <div class="time-selection">
          <div class="form-group">
            <label for="eventStartTime">Hora Inicio:</label>
            <input type="time" id="eventStartTime" required>
          </div>
          <div class="form-group">
            <label for="eventDuration">Duración (min):</label>
            <select id="eventDuration" required>
              <option value="30">30 minutos</option>
              <option value="45">45 minutos</option>
              <option value="60" selected>60 minutos</option>
              <option value="90">90 minutos</option>
              <option value="120">120 minutos</option>
            </select>
          </div>
        </div>
        <div class="form-group">
          <label for="eventTherapist">Terapeuta:</label>
          <select id="eventTherapist">
            <option value="">Ninguno</option>
            <option value="1">Dra. Ana Rodríguez</option>
            <option value="2">Dr. Carlos Sánchez</option>
            <option value="3">Lic. Gabriela Morales</option>
          </select>
        </div>
        <div class="form-group">
          <label for="eventRoom">Sala:</label>
          <select id="eventRoom">
            <option value="">Ninguna</option>
            <option value="101">Sala 101</option>
            <option value="102">Sala 102</option>
            <option value="103">Sala 103</option>
          </select>
        </div>
        <div class="form-group">
          <label for="eventDescription">Descripción:</label>
          <textarea id="eventDescription" rows="3"></textarea>
        </div>
        <button type="submit">Crear Evento</button>
      </form>
    </div>
  `;
  document.body.appendChild(newEventModal);
  const closeNewEventModalBtn = document.getElementById("closeNewEventModal");
  const newEventForm = document.getElementById("newEventForm");

  // Horario de atención (9 a.m. a 6 p.m.)
  const startHour = 9;
  const endHour = 18;

  // Citas de ejemplo
  let sampleAppointments = [
    // ... (mantener las mismas citas de ejemplo que tenías antes)
  ];

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
        cellDiv.addEventListener("click", () =>
          openNewEventModal(cellDiv.dataset.date, cellDiv.dataset.hour)
        );
        calendarContainer.appendChild(cellDiv);
      }
    }
  }

  // Función para asignar un color basado en el nombre del paciente
  function getColorClass(patientName) {
    const colors = [
      "color1",
      "color2",
      "color3",
      "color4",
      "color5",
      "color6",
      "color7",
    ];
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
          apptDiv.className = `appointment ${getColorClass(
            app.patient || app.title
          )}`;
          apptDiv.textContent = app.patient
            ? `Tipo de terapia: ${app.therapy} - ${app.patient} - ${app.therapist}`
            : `Evento: ${app.title}${
                app.therapist ? ` - ${app.therapist}` : ""
              }`;
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
    let refDate = filterDateInput.value
      ? new Date(filterDateInput.value)
      : new Date();

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
        cellDiv.addEventListener("click", () =>
          openNewEventModal(cellDiv.dataset.date, cellDiv.dataset.hour)
        );
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
      <p><strong>${info.patient ? "Paciente:" : "Evento:"}</strong> ${
      info.patient || info.title
    }</p>
      <p><strong>Fecha:</strong> ${info.date}</p>
      <p><strong>Hora:</strong> ${info.start} - ${info.end}</p>
      ${info.room ? `<p><strong>Sala:</strong> ${info.room}</p>` : ""}
      ${
        info.therapist
          ? `<p><strong>Terapeuta:</strong> ${info.therapist}</p>`
          : ""
      }
      ${
        info.therapy
          ? `<p><strong>Tipo de terapia:</strong> ${info.therapy}</p>`
          : ""
      }
      ${info.phone ? `<p><strong>Contacto:</strong> ${info.phone}</p>` : ""}
      ${
        info.description
          ? `<p><strong>Descripción:</strong> ${info.description}</p>`
          : ""
      }
      <div class="modal-actions">
        <button class="delete-btn" data-id="${info.id}">Eliminar</button>
      </div>
    `;
    appointmentModal.style.display = "block";

    // Agregar evento para eliminar cita
    document
      .querySelector(".delete-btn")
      ?.addEventListener("click", function () {
        deleteAppointment(parseInt(this.dataset.id));
      });
  }

  // Función para abrir modal de nuevo evento con fecha y hora preseleccionadas
  function openNewEventModal(date, time) {
    document.getElementById("eventDate").value = date;
    document.getElementById("eventStartTime").value = time;
    newEventModal.style.display = "block";
  }

  // Función para crear un nuevo evento
  function createNewEvent(event) {
    event.preventDefault();

    // Obtener valores del formulario
    const title = document.getElementById("eventTitle").value;
    const date = document.getElementById("eventDate").value;
    const startTime = document.getElementById("eventStartTime").value;
    const duration = document.getElementById("eventDuration").value;
    const therapist = document.getElementById("eventTherapist").value;
    const therapistName =
      document.getElementById("eventTherapist").options[
        document.getElementById("eventTherapist").selectedIndex
      ].text;
    const room = document.getElementById("eventRoom").value;
    const description = document.getElementById("eventDescription").value;

    // Validar campos requeridos
    if (!title || !date || !startTime || !duration) {
      alert("Por favor complete los campos requeridos");
      return;
    }

    // Calcular hora de fin
    const endTime = calculateEndTime(startTime, duration);

    // Crear nuevo evento
    const newEvent = {
      id: sampleAppointments.length + 1,
      title: title,
      date: date,
      start: startTime,
      end: endTime,
      therapist: therapist ? therapistName : null,
      room: room || null,
      description: description || null,
    };

    // Agregar a las citas
    sampleAppointments.push(newEvent);

    // Actualizar calendario y cerrar modal
    renderCalendar();
    alert("Evento creado exitosamente");
    newEventModal.style.display = "none";
    newEventForm.reset();
  }

  // Función para calcular la hora de fin basada en la hora de inicio y duración
  function calculateEndTime(startTime, duration) {
    const [hours, minutes] = startTime.split(":").map(Number);
    const totalMinutes = hours * 60 + minutes + Number(duration);
    const endHours = Math.floor(totalMinutes / 60);
    const endMinutes = totalMinutes % 60;
    return `${String(endHours).padStart(2, "0")}:${String(endMinutes).padStart(
      2,
      "0"
    )}`;
  }

  // Función para eliminar una cita/evento
  function deleteAppointment(id) {
    if (confirm("¿Está seguro que desea eliminar este evento/cita?")) {
      sampleAppointments = sampleAppointments.filter((app) => app.id !== id);
      renderCalendar();
      appointmentModal.style.display = "none";
      alert("Evento/cita eliminado exitosamente");
    }
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

  // Nuevo evento
  newEventBtn.addEventListener("click", () => {
    // Abrir modal sin fecha/hora preseleccionada
    document.getElementById("eventDate").value =
      filterDateInput.value || getFormattedDate(new Date());
    document.getElementById("eventStartTime").value = "09:00";
    newEventModal.style.display = "block";
  });

  closeNewEventModalBtn.addEventListener("click", () => {
    newEventModal.style.display = "none";
  });

  newEventForm.addEventListener("submit", createNewEvent);

  /* INICIALIZACIÓN */

  // Establecer la fecha de filtro a hoy y renderizar la vista inicial
  filterDateInput.value = getFormattedDate(new Date());
  renderCalendar();
});
