document.addEventListener("DOMContentLoaded", function () {
  // Datos del terapeuta
  let terapeuta = {
    nombre: "Ana García",
    email: "ana@clinica.com",
    telefono: "5551234567",
    rol: "activo",
    servicio: "Psicodiagnóstico",
    horarios: [
      { dia: "Lunes", inicio: "10:00", fin: "12:00", detalle: "sesión con María López" },
      { dia: "Miércoles", inicio: "14:00", fin: "16:00", detalle: "disponible" },
      { dia: "Viernes", inicio: "10:00", fin: "12:00", detalle: "disponible" }
    ]
  };

  // Elementos del DOM
  const btnEditar = document.getElementById("btnEditar");
  const btnGuardar = document.getElementById("btnGuardar");
  const btnCancelar = document.getElementById("btnCancelar");
  const btnAddHorario = document.getElementById("btnAddHorario");
  const viewMode = document.getElementById("view-mode");
  const editMode = document.getElementById("edit-mode");
  const calendarSlots = document.getElementById("calendar-slots");
  const horariosEdit = document.getElementById("horarios-edit");

  // Cargar datos iniciales
  cargarDatosVista();
  generarCalendario();

  // Evento para editar
  btnEditar.addEventListener("click", function () {
    viewMode.style.display = "none";
    editMode.style.display = "block";
    btnEditar.style.display = "none";
    btnGuardar.style.display = "block";
    btnCancelar.style.display = "block";

    // Cargar datos en el formulario
    document.getElementById("edit-email").value = terapeuta.email;
    document.getElementById("edit-telefono").value = terapeuta.telefono;
    document.getElementById("edit-rol").value = terapeuta.rol;
    document.getElementById("edit-servicio").value = terapeuta.servicio;

    // Cargar horarios editables
    cargarHorariosEdicion();
  });

  // Evento para cancelar edición
  btnCancelar.addEventListener("click", function () {
    viewMode.style.display = "block";
    editMode.style.display = "none";
    btnEditar.style.display = "block";
    btnGuardar.style.display = "none";
    btnCancelar.style.display = "none";
  });

  // Evento para guardar cambios
  btnGuardar.addEventListener("click", function (e) {
    e.preventDefault();

    // Actualizar datos del terapeuta
    terapeuta.email = document.getElementById("edit-email").value;
    terapeuta.telefono = document.getElementById("edit-telefono").value;
    terapeuta.rol = document.getElementById("edit-rol").value;
    terapeuta.servicio = document.getElementById("edit-servicio").value;

    // Actualizar horarios
    const nuevosHorarios = [];
    document.querySelectorAll(".horario-editable").forEach((item) => {
      nuevosHorarios.push({
        dia: item.querySelector(".edit-dia").value,
        inicio: item.querySelector(".edit-inicio").value,
        fin: item.querySelector(".edit-fin").value,
        detalle: item.querySelector(".edit-detalle").value
      });
    });
    terapeuta.horarios = nuevosHorarios;

    // Volver a modo vista
    viewMode.style.display = "block";
    editMode.style.display = "none";
    btnEditar.style.display = "block";
    btnGuardar.style.display = "none";
    btnCancelar.style.display = "none";

    // Actualizar vista
    cargarDatosVista();
    generarCalendario();
  });

  // Añadir nuevo horario
  btnAddHorario.addEventListener("click", function () {
    const horarioItem = document.createElement("div");
    horarioItem.className = "horario-editable";
    horarioItem.innerHTML = `
      <select class="edit-dia">
        <option value="Lunes">Lunes</option>
        <option value="Martes">Martes</option>
        <option value="Miércoles">Miércoles</option>
        <option value="Jueves">Jueves</option>
        <option value="Viernes">Viernes</option>
      </select>
      <input type="time" class="edit-inicio" value="09:00">
      <span>a</span>
      <input type="time" class="edit-fin" value="13:00">
      <input type="text" class="edit-detalle" placeholder="disponible/sesión con...">
      <button type="button" class="btn-remove-horario">✕</button>
    `;
    horariosEdit.appendChild(horarioItem);

    // Evento para eliminar horario
    horarioItem.querySelector(".btn-remove-horario").addEventListener("click", function () {
      horarioItem.remove();
    });
  });

  // Función para cargar datos en modo vista
  function cargarDatosVista() {
    document.getElementById("terapeuta-nombre").textContent = terapeuta.nombre;
    document.getElementById("terapeuta-email").textContent = terapeuta.email;
    document.getElementById("terapeuta-telefono").textContent = terapeuta.telefono;
    document.getElementById("terapeuta-rol").textContent = 
      terapeuta.rol.charAt(0).toUpperCase() + terapeuta.rol.slice(1);
    document.getElementById("terapeuta-servicio").textContent = terapeuta.servicio;
  }

  // Función para generar el calendario semanal
  function generarCalendario() {
    calendarSlots.innerHTML = "";

    // Generar franjas horarias de 8:00 a 18:00 en intervalos de 30 minutos
    for (let hour = 9; hour <= 18; hour++) {
      for (let minute = 0; minute < 60; minute += 30) {
        const timeLabel = `${hour.toString().padStart(2, "0")}:${minute.toString().padStart(2, "0")}`;
        const timeRow = document.createElement("div");
        timeRow.className = "time-row";
        timeRow.innerHTML = `<div class="time-label">${timeLabel}</div>`;

        // Crear slots para cada día de la semana
        ["Lunes", "Martes", "Miércoles", "Jueves", "Viernes"].forEach(dia => {
          const daySlot = document.createElement("div");
          daySlot.className = "day-slot";
          daySlot.dataset.day = dia;
          daySlot.dataset.time = timeLabel;

          // Verificar si hay un horario en este slot
          const horario = terapeuta.horarios.find(h => 
            h.dia === dia && 
            h.inicio <= timeLabel && 
            h.fin > timeLabel
          );

          if (horario) {
            const slot = document.createElement("div");
            slot.className = `slot ${horario.detalle.includes("sesión") ? "ocupado" : "disponible"}`;
            slot.textContent = horario.detalle;
            daySlot.appendChild(slot);
          }

          timeRow.appendChild(daySlot);
        });

        calendarSlots.appendChild(timeRow);
      }
    }
  }

  // Función para cargar horarios en modo edición
  function cargarHorariosEdicion() {
    horariosEdit.innerHTML = "";
    terapeuta.horarios.forEach((horario) => {
      const horarioItem = document.createElement("div");
      horarioItem.className = "horario-editable";
      horarioItem.innerHTML = `
        <select class="edit-dia">
          <option value="Lunes" ${horario.dia === "Lunes" ? "selected" : ""}>Lunes</option>
          <option value="Martes" ${horario.dia === "Martes" ? "selected" : ""}>Martes</option>
          <option value="Miércoles" ${horario.dia === "Miércoles" ? "selected" : ""}>Miércoles</option>
          <option value="Jueves" ${horario.dia === "Jueves" ? "selected" : ""}>Jueves</option>
          <option value="Viernes" ${horario.dia === "Viernes" ? "selected" : ""}>Viernes</option>
        </select>
        <input type="time" class="edit-inicio" value="${horario.inicio}">
        <span>a</span>
        <input type="time" class="edit-fin" value="${horario.fin}">
        <input type="text" class="edit-detalle" value="${horario.detalle}" placeholder="disponible/sesión con...">
        <button type="button" class="btn-remove-horario">✕</button>
      `;
      horariosEdit.appendChild(horarioItem);

      // Evento para eliminar horario
      horarioItem.querySelector(".btn-remove-horario").addEventListener("click", function () {
        horarioItem.remove();
      });
    });
  }
});