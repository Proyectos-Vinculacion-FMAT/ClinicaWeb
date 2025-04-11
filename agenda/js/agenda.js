document.addEventListener('DOMContentLoaded', () => {
    // Elementos para filtros
    const filterPeriodSelect = document.getElementById('filterPeriod');
    const filterDateInput = document.getElementById('filterDate');
    const applyFilterBtn = document.getElementById('applyFilter');
    const printBtn = document.getElementById('printView');
    
    // Contenedor del calendario
    const calendarContainer = document.getElementById('calendarContainer');
  
    // Modal de cita
    const appointmentModal = document.getElementById('appointmentModal');
    const closeModalBtn = document.getElementById('closeModal');
    const modalInfo = document.getElementById('modalInfo');
  
    // Horario de atención (9 a.m. a 6 p.m.)
    const startHour = 9;
    const endHour = 18; // Se asume que la última hora de inicio es 17:00 para una cita de 1 hora
  
    // Citas de ejemplo (17 citas) utilizando solo dos tipos: "Primer Contacto" y "Terapia"
    const sampleAppointments = [
      { id: 1, date: getFormattedDate(addDays(new Date(), 0)), start: "09:00", end: "10:00", therapy: "Primer Contacto", patient: "Carlos Gómez Martínez", therapist: "Lucía Rivera Torres", room: "Sala 101", phone: "555-1234" },
      { id: 2, date: getFormattedDate(addDays(new Date(), 1)), start: "10:00", end: "11:00", therapy: "Terapia", patient: "Mariana López Sánchez", therapist: "Lucía Rivera Torres", room: "Sala 101", phone: "555-2345" },
      { id: 3, date: getFormattedDate(addDays(new Date(), 1)), start: "11:00", end: "12:00", therapy: "Terapia", patient: "Jorge Hernández Castro", therapist: "Lucía Rivera Torres", room: "Sala 101", phone: "555-3456" },
      { id: 4, date: getFormattedDate(addDays(new Date(), 2)), start: "14:00", end: "15:00", therapy: "Terapia", patient: "Mariana López Sánchez", therapist: "Lucía Rivera Torres", room: "Sala 101", phone: "555-2345" },
      { id: 5, date: getFormattedDate(addDays(new Date(), 3)), start: "09:00", end: "10:00", therapy: "Primer Contacto", patient: "Carlos Gómez Martínez", therapist: "Lucía Rivera Torres", room: "Sala 101", phone: "555-1234" },
      { id: 6, date: getFormattedDate(addDays(new Date(), 4)), start: "15:00", end: "16:00", therapy: "Terapia", patient: "Jorge Hernández Castro", therapist: "Lucía Rivera Torres", room: "Sala 101", phone: "555-3456" },
      { id: 7, date: getFormattedDate(addDays(new Date(), 5)), start: "16:00", end: "17:00", therapy: "Terapia", patient: "Mariana López Sánchez", therapist: "Lucía Rivera Torres", room: "Sala 101", phone: "555-2345" },
      { id: 8, date: getFormattedDate(addDays(new Date(), 2)), start: "10:00", end: "11:00", therapy: "Primer Contacto", patient: "Andrea Ramírez Soto", therapist: "Gabriela Morales Díaz", room: "Sala 102", phone: "555-4567" },
      { id: 9, date: getFormattedDate(addDays(new Date(), 3)), start: "11:00", end: "12:00", therapy: "Terapia", patient: "Luis Fernández Pineda", therapist: "Gabriela Morales Díaz", room: "Sala 102", phone: "555-5678" },
      { id: 10, date: getFormattedDate(addDays(new Date(), 4)), start: "09:00", end: "10:00", therapy: "Terapia", patient: "Verónica Soto Jiménez", therapist: "Gabriela Morales Díaz", room: "Sala 102", phone: "555-6789" },
      { id: 11, date: getFormattedDate(addDays(new Date(), 0)), start: "14:00", end: "15:00", therapy: "Primer Contacto", patient: "Andrés Pérez Díaz", therapist: "Lucía Rivera Torres", room: "Sala 101", phone: "555-1122" },
      { id: 12, date: getFormattedDate(addDays(new Date(), 1)), start: "15:00", end: "16:00", therapy: "Terapia", patient: "Elena Torres Rojas", therapist: "Lucía Rivera Torres", room: "Sala 101", phone: "555-2233" },
      { id: 13, date: getFormattedDate(addDays(new Date(), 5)), start: "09:00", end: "10:00", therapy: "Terapia", patient: "Roberto Castillo Pérez", therapist: "Lucía Rivera Torres", room: "Sala 101", phone: "555-3344" },
      { id: 14, date: getFormattedDate(addDays(new Date(), 6)), start: "10:00", end: "11:00", therapy: "Primer Contacto", patient: "Sofía Jiménez García", therapist: "Lucía Rivera Torres", room: "Sala 101", phone: "555-4455" },
      { id: 15, date: getFormattedDate(addDays(new Date(), 6)), start: "11:00", end: "12:00", therapy: "Terapia", patient: "Jorge Hernández Castro", therapist: "Lucía Rivera Torres", room: "Sala 101", phone: "555-5566" },
      { id: 16, date: getFormattedDate(addDays(new Date(), 3)), start: "16:00", end: "17:00", therapy: "Terapia", patient: "Mariana López Sánchez", therapist: "Lucía Rivera Torres", room: "Sala 101", phone: "555-6677" },
      { id: 17, date: getFormattedDate(addDays(new Date(), 2)), start: "15:00", end: "16:00", therapy: "Primer Contacto", patient: "Carlos Gómez Martínez", therapist: "Lucía Rivera Torres", room: "Sala 101", phone: "555-7788" }
    ];
  
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
      const diff = (day === 0 ? -6 : 1 - day);
      return addDays(date, diff);
    }
  
    // Función para limpiar el contenedor del calendario
    function clearCalendar() {
      calendarContainer.innerHTML = "";
    }
  
    // Función para renderizar la cabecera del calendario (días de la semana)
    function renderCalendarHeader(startDate) {
      let emptyHeader = document.createElement('div');
      emptyHeader.className = 'day-header';
      calendarContainer.appendChild(emptyHeader);
      for (let i = 0; i < 7; i++) {
        let currentDate = addDays(startDate, i);
        let headerCell = document.createElement('div');
        headerCell.className = 'day-header';
        headerCell.textContent = currentDate.toLocaleDateString('es-ES', { weekday: 'short', day: 'numeric', month: 'numeric' });
        calendarContainer.appendChild(headerCell);
      }
    }
  
    // Función para renderizar la columna de horarios y las celdas vacías de cada fila
    function renderCalendarGrid(startDate) {
      for (let hour = startHour; hour < endHour; hour++) {
        let timeCell = document.createElement('div');
        timeCell.className = 'time-cell';
        timeCell.textContent = (hour < 10 ? "0" + hour : hour) + ":00";
        calendarContainer.appendChild(timeCell);
        for (let i = 0; i < 7; i++) {
          let cellDiv = document.createElement('div');
          cellDiv.className = 'empty-cell cell-container';
          let cellDate = addDays(startDate, i);
          cellDiv.dataset.date = getFormattedDate(cellDate);
          cellDiv.dataset.hour = (hour < 10 ? "0" + hour : hour) + ":00";
          calendarContainer.appendChild(cellDiv);
        }
      }
    }
  
    // Función para asignar un color basado en el nombre del paciente (hash simple)
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
      appointments.forEach(app => {
        let appDate = new Date(app.date);
        let startWeek = startDate;
        let endWeek = addDays(startDate, 6);
        if (appDate >= startWeek && appDate <= endWeek) {
          let cellSelector = `.cell-container[data-date="${app.date}"][data-hour="${app.start}"]`;
          let cell = calendarContainer.querySelector(cellSelector);
          if (cell) {
            let apptDiv = document.createElement('div');
            apptDiv.className = `appointment ${getColorClass(app.patient)}`;
            // Mostrar "Tipo de terapia" en vez de "Terapia"
            apptDiv.textContent = `Tipo de terapia: ${app.therapy} - ${app.patient} - ${app.therapist}`;
            apptDiv.style.top = "0";
            apptDiv.style.left = "0";
            apptDiv.style.width = "100%";
            apptDiv.style.height = "100%";
            apptDiv.dataset.info = JSON.stringify(app);
            apptDiv.addEventListener('click', function(e) {
              let info = JSON.parse(this.dataset.info);
              openModal(info);
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
        let emptyHeader = document.createElement('div');
        emptyHeader.className = 'day-header';
        calendarContainer.appendChild(emptyHeader);
        let headerCell = document.createElement('div');
        headerCell.className = 'day-header';
        headerCell.textContent = refDate.toLocaleDateString('es-ES', { weekday: 'long', day: 'numeric', month: 'numeric' });
        calendarContainer.appendChild(headerCell);
        for (let hour = startHour; hour < endHour; hour++) {
          let timeCell = document.createElement('div');
          timeCell.className = 'time-cell';
          timeCell.textContent = (hour < 10 ? "0" + hour : hour) + ":00";
          calendarContainer.appendChild(timeCell);
          let cellDiv = document.createElement('div');
          cellDiv.className = 'empty-cell cell-container';
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
  
    // Función para abrir el modal con detalles de la cita
    function openModal(info) {
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
  
    // Eventos para cerrar el modal y aplicar el filtro
    closeModalBtn.addEventListener('click', function() {
      appointmentModal.style.display = "none";
    });
    applyFilterBtn.addEventListener('click', function() {
      calendarContainer.style.gridTemplateColumns = "60px repeat(7, 1fr)";
      renderCalendar();
    });
    printBtn.addEventListener('click', function() {
      window.print();
    });
  
    // Establecer la fecha de filtro a hoy y renderizar la vista inicial
    filterDateInput.value = getFormattedDate(new Date());
    renderCalendar();
    filterPeriodSelect.addEventListener('change', renderCalendar);
  });
  
