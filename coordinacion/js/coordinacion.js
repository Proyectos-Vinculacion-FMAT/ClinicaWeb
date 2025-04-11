document.addEventListener('DOMContentLoaded', function() {
  // Elementos generales para citas
  const tipoCitaSelect = document.getElementById('tipoCita');
  const primerContactoSection = document.getElementById('primerContactoSection');
  const terapiaSection = document.getElementById('terapiaSection');

  // Elementos para Primer Contacto
  const pacientePrimerSelect = document.getElementById('pacientePrimer');
  const terapeutaPrimerContainer = document.getElementById('terapeutaPrimerContainer');
  const terapeutaPrimerSelect = document.getElementById('terapeutaPrimer');
  const salaPrimerContainer = document.getElementById('salaPrimerContainer');
  const salaPrimerSelect = document.getElementById('salaPrimer');
  const fechaPrimer = document.getElementById('fechaPrimer');
  const horaInicioPrimer = document.getElementById('horaInicioPrimer');
  const horaFinPrimer = document.getElementById('horaFinPrimer');
  const guardarPrimerBtn = document.getElementById('guardarPrimer');

  // Elementos para Terapia
  const pacienteTerapiaSelect = document.getElementById('pacienteTerapia');
  const terapeutaTerapiaContainer = document.getElementById('terapeutaTerapiaContainer');
  const terapeutaTerapiaSelect = document.getElementById('terapeutaTerapia');
  const salaTerapiaContainer = document.getElementById('salaTerapiaContainer');
  const salaTerapiaSelect = document.getElementById('salaTerapia');
  const colaEsperaContainer = document.getElementById('colaEsperaContainer');
  const btnColaEspera = document.getElementById('btnColaEspera');
  const sesionesContainer = document.getElementById('sesionesContainer');
  const fechaTerapia = document.getElementById('fechaTerapia');
  const horaInicioTerapia = document.getElementById('horaInicioTerapia');
  const horaFinTerapia = document.getElementById('horaFinTerapia');
  const guardarTerapiaBtn = document.getElementById('guardarTerapia');
  
  // Contenedor final (Fecha, Horas, Botón) para Terapia
  const finalTerapiaContainer = document.getElementById('finalTerapiaContainer');

  // Elementos para Nuevo Paciente Modal
  const modalNuevoPaciente = document.getElementById('modalNuevoPaciente');
  const cerrarModalNuevoPaciente = document.getElementById('cerrarModalNuevoPaciente');
  const nuevoPacienteForm = document.getElementById('nuevoPacienteForm');
  const nombrePacienteNuevo = document.getElementById('nombrePacienteNuevo');
  const edadPacienteNuevo = document.getElementById('edadPacienteNuevo');
  const horaInicioPacienteNuevo = document.getElementById('horaInicioPacienteNuevo');
  const horaFinPacienteNuevo = document.getElementById('horaFinPacienteNuevo');
  const guardarPacienteNuevoBtn = document.getElementById('guardarPacienteNuevo');

  // Función para poblar select de tiempo (de 09:00 a 18:00 en intervalos de 1 hora)
  function populateTimeSelect(selectElement) {
    selectElement.innerHTML = '<option value="">-- Seleccionar Hora --</option>';
    for (let hour = 9; hour <= 18; hour++) {
      let hStr = (hour < 10 ? '0' + hour : hour) + ":00";
      let option = document.createElement('option');
      option.value = hStr;
      option.textContent = hStr;
      selectElement.appendChild(option);
    }
  }

  // Poblar select de horas para Primer Contacto, Terapia y Nuevo Paciente
  populateTimeSelect(horaInicioPrimer);
  populateTimeSelect(horaFinPrimer);
  populateTimeSelect(horaInicioTerapia);
  populateTimeSelect(horaFinTerapia);
  populateTimeSelect(horaInicioPacienteNuevo);
  populateTimeSelect(horaFinPacienteNuevo);

  // Detectar cambio en el tipo de cita
  tipoCitaSelect.addEventListener('change', function() {
    if (this.value === "primer") {
      primerContactoSection.style.display = "block";
      terapiaSection.style.display = "none";
    } else if (this.value === "terapia") {
      terapiaSection.style.display = "block";
      primerContactoSection.style.display = "none";
    } else {
      primerContactoSection.style.display = "none";
      terapiaSection.style.display = "none";
    }
  });

  // Flujo Primer Contacto: Al elegir paciente
  pacientePrimerSelect.addEventListener('change', function() {
    if (this.value === "nuevo") {
      // Abrir modal para crear nuevo paciente
      modalNuevoPaciente.style.display = "block";
    } else if (this.value !== "") {
      terapeutaPrimerContainer.style.display = "block";
    } else {
      terapeutaPrimerContainer.style.display = "none";
      salaPrimerContainer.style.display = "none";
    }
  });

  // En Primer Contacto, al seleccionar terapeuta, mostrar sala
  terapeutaPrimerSelect.addEventListener('change', function() {
    if (this.value !== "") {
      salaPrimerContainer.style.display = "block";
    } else {
      salaPrimerContainer.style.display = "none";
    }
  });

  // Flujo Terapia: Al elegir paciente
  pacienteTerapiaSelect.addEventListener('change', function() {
    if (this.value !== "") {
      terapeutaTerapiaContainer.style.display = "block";
    } else {
      terapeutaTerapiaContainer.style.display = "none";
      salaTerapiaContainer.style.display = "none";
      colaEsperaContainer.style.display = "none";
      sesionesContainer.style.display = "none";
      finalTerapiaContainer.style.display = "none";
    }
  });

  // En Terapia, según la selección de terapeuta
  terapeutaTerapiaSelect.addEventListener('change', function() {
    let selected = this.value;
    salaTerapiaSelect.innerHTML = '<option value="">-- Seleccionar Sala --</option>';

    if (selected === "Fernando García Ruiz") {
      // Terapeuta lleno: solo regresa a cola de espera
      salaTerapiaContainer.style.display = "none";
      sesionesContainer.style.display = "none";
      colaEsperaContainer.style.display = "block";
      finalTerapiaContainer.style.display = "none";  // Ocultar fecha, horas y botón final
    } 
    else if (selected === "Luisa Mendoza Torres") {
      // Terapeuta con 3 salas disponibles
      for (let i = 1; i <= 3; i++) {
        let option = document.createElement('option');
        option.value = "Sala " + i;
        option.textContent = "Sala " + i;
        salaTerapiaSelect.appendChild(option);
      }
      salaTerapiaContainer.style.display = "block";
      colaEsperaContainer.style.display = "none";
      sesionesContainer.style.display = "block";
      finalTerapiaContainer.style.display = "block"; // Mostrar fecha, horas y botón final
    } 
    else {
      // Resto de terapeutas (deshabilitados o no seleccionados)
      salaTerapiaContainer.style.display = "none";
      colaEsperaContainer.style.display = "none";
      sesionesContainer.style.display = "none";
      finalTerapiaContainer.style.display = "none";
    }
  });

  // Botón para regresar a cola de espera
  btnColaEspera.addEventListener('click', function() {
    alert("La cita se ha enviado a la cola de espera.");
  });

  // Validar y guardar datos para Primer Contacto
  guardarPrimerBtn.addEventListener('click', function() {
    let paciente = pacientePrimerSelect.value;
    let terapeuta = terapeutaPrimerSelect.value;
    let sala = salaPrimerSelect.value;
    let fecha = fechaPrimer.value;
    let horaInicio = horaInicioPrimer.value;
    let horaFin = horaFinPrimer.value;

    if (!paciente || !terapeuta || !sala || !fecha || !horaInicio || !horaFin) {
      alert("Por favor, complete todos los campos para Primer Contacto.");
      return;
    }
    if (horaInicio >= horaFin) {
      alert("La hora de inicio debe ser menor a la hora de fin.");
      return;
    }
    console.log("Cita de Primer Contacto:", { paciente, terapeuta, sala, fecha, horaInicio, horaFin });
    alert("Cita de Primer Contacto asignada exitosamente.");
  });

  // Validar y guardar datos para Terapia
  guardarTerapiaBtn.addEventListener('click', function() {
    let paciente = pacienteTerapiaSelect.value;
    let terapeuta = terapeutaTerapiaSelect.value;
    let sala = salaTerapiaSelect.value;
    let fecha = fechaTerapia.value;
    let horaInicio = horaInicioTerapia.value;
    let horaFin = horaFinTerapia.value;

    // Si está en la opción "Luisa Mendoza Torres" y no selecciona sala, es error
    if (!paciente || !terapeuta || (terapeuta === "Luisa Mendoza Torres" && !sala) 
        || !fecha || !horaInicio || !horaFin) {
      alert("Por favor, complete todos los campos para Terapia.");
      return;
    }
    if (horaInicio >= horaFin) {
      alert("La hora de inicio debe ser menor a la hora de fin.");
      return;
    }
    let sesionesFijas = document.getElementById('sesionesFijas').value;
    let sesionesAsignar = document.getElementById('sesionesAsignar').value;
    console.log("Cita de Terapia:", { paciente, terapeuta, sala, fecha, horaInicio, horaFin, sesionesFijas, sesionesAsignar });
    alert("Cita de Terapia creada exitosamente.");
  });

  // Manejar el modal para Nuevo Paciente
  cerrarModalNuevoPaciente.addEventListener('click', function() {
    modalNuevoPaciente.style.display = "none";
    nuevoPacienteForm.reset();
    pacientePrimerSelect.value = "";
  });

  guardarPacienteNuevoBtn.addEventListener('click', function() {
    let nuevoNombre = nombrePacienteNuevo.value.trim();
    let nuevaEdad = edadPacienteNuevo.value.trim();
    let nuevoHoraInicio = horaInicioPacienteNuevo.value;
    let nuevoHoraFin = horaFinPacienteNuevo.value;

    if (!nuevoNombre || !nuevaEdad || !nuevoHoraInicio || !nuevoHoraFin) {
      alert("Por favor, complete todos los campos para el nuevo paciente.");
      return;
    }
    if (nuevoHoraInicio >= nuevoHoraFin) {
      alert("La hora de disponibilidad inicio debe ser menor a la de fin.");
      return;
    }
    let option = document.createElement('option');
    option.value = nuevoNombre;
    option.textContent = nuevoNombre;
    pacientePrimerSelect.appendChild(option);
    pacientePrimerSelect.value = nuevoNombre;
    modalNuevoPaciente.style.display = "none";
    nuevoPacienteForm.reset();
    terapeutaPrimerContainer.style.display = "block";
    console.log("Nuevo paciente creado:", { nuevoNombre, nuevaEdad, nuevoHoraInicio, nuevoHoraFin });
    alert("Nuevo paciente creado exitosamente.");
  });

  window.addEventListener('click', function(e) {
    if (e.target === modalNuevoPaciente) {
      modalNuevoPaciente.style.display = "none";
      nuevoPacienteForm.reset();
      pacientePrimerSelect.value = "";
    }
  });
});



