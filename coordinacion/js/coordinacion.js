document.addEventListener('DOMContentLoaded', function() {
  const citasTableBody = document.querySelector('#citasTable tbody');
  const btnAgregarCita = document.getElementById('btnAgregarCita');
  const modalCita = document.getElementById('modalCita');
  const cerrarModalCita = document.getElementById('cerrarModalCita');
  const citaForm = document.getElementById('citaForm');
  const citaFormTitle = document.getElementById('citaFormTitle');
  const inputCitaId = document.getElementById('citaId');
  const inputPaciente = document.getElementById('paciente');
  const inputTerapeuta = document.getElementById('terapeuta');
  const inputConsultorio = document.getElementById('consultorio');
  const inputFecha = document.getElementById('fecha');
  const inputHora = document.getElementById('hora');
  const inputEstado = document.getElementById('estado');

  let citas = [];

  // Cargar citas del localStorage si existen
  function loadCitas() {
    const data = localStorage.getItem('citas');
    if (data) {
      citas = JSON.parse(data);
    } else {
      citas = [];
    }
  }

  // Guardar citas en localStorage
  function saveCitas() {
    localStorage.setItem('citas', JSON.stringify(citas));
  }

  // Renderizar citas en la tabla
  function renderCitas() {
    citasTableBody.innerHTML = '';
    citas.forEach((cita, index) => {
      const row = document.createElement('tr');
      row.innerHTML = `
        <td>${index + 1}</td>
        <td>${cita.paciente}</td>
        <td>${cita.terapeuta}</td>
        <td>${cita.consultorio}</td>
        <td>${cita.fecha}</td>
        <td>${cita.hora}</td>
        <td>${cita.estado}</td>
        <td>
          <button class="edit-cita-btn" data-index="${index}">Editar</button>
          <button class="delete-cita-btn" data-index="${index}">Eliminar</button>
        </td>
      `;
      citasTableBody.appendChild(row);
    });

    // Asignar eventos a botones de editar y eliminar
    const editButtons = document.querySelectorAll('.edit-cita-btn');
    editButtons.forEach(button => {
      button.addEventListener('click', function() {
        const index = this.dataset.index;
        abrirFormularioEdicion(index);
      });
    });

    const deleteButtons = document.querySelectorAll('.delete-cita-btn');
    deleteButtons.forEach(button => {
      button.addEventListener('click', function() {
        const index = this.dataset.index;
        eliminarCita(index);
      });
    });
  }

  // Función para abrir el modal
  function abrirModal() {
    modalCita.style.display = 'block';
  }

  // Función para cerrar el modal
  function cerrarModal() {
    modalCita.style.display = 'none';
    citaForm.reset();
    inputCitaId.value = '';
    citaFormTitle.textContent = 'Agregar Cita';
  }

  // Abrir formulario con datos para editar
  function abrirFormularioEdicion(index) {
    const cita = citas[index];
    inputCitaId.value = index;
    inputPaciente.value = cita.paciente;
    inputTerapeuta.value = cita.terapeuta;
    inputConsultorio.value = cita.consultorio;
    inputFecha.value = cita.fecha;
    inputHora.value = cita.hora;
    inputEstado.value = cita.estado;
    citaFormTitle.textContent = 'Editar Cita';
    abrirModal();
  }

  // Eliminar cita
  function eliminarCita(index) {
    if (confirm('¿Está seguro de eliminar esta cita?')) {
      citas.splice(index, 1);
      saveCitas();
      renderCitas();
    }
  }

  // Manejar el envío del formulario
  citaForm.addEventListener('submit', function(e) {
    e.preventDefault();
    const paciente = inputPaciente.value.trim();
    const terapeuta = inputTerapeuta.value.trim();
    const consultorio = inputConsultorio.value.trim();
    const fecha = inputFecha.value;
    const hora = inputHora.value;
    const estado = inputEstado.value;
    const id = inputCitaId.value;

    if (!paciente || !terapeuta || !consultorio || !fecha || !hora || !estado) {
      alert('Por favor, complete todos los campos.');
      return;
    }

    if (id === '') {
      // Crear nueva cita
      const nuevaCita = { paciente, terapeuta, consultorio, fecha, hora, estado };
      citas.push(nuevaCita);
    } else {
      // Actualizar cita existente
      citas[id] = { paciente, terapeuta, consultorio, fecha, hora, estado };
    }

    saveCitas();
    renderCitas();
    cerrarModal();
  });

  // Eventos de botones
  btnAgregarCita.addEventListener('click', function() {
    citaForm.reset();
    inputCitaId.value = '';
    citaFormTitle.textContent = 'Agregar Cita';
    abrirModal();
  });

  cerrarModalCita.addEventListener('click', cerrarModal);

  // Cerrar modal al hacer clic fuera del contenido
  window.addEventListener('click', function(e) {
    if (e.target === modalCita) {
      cerrarModal();
    }
  });

  // Inicializar
  loadCitas();
  renderCitas();
});

