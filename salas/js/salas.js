document.addEventListener('DOMContentLoaded', function() {
  // Elementos del DOM
  const consultoriosTableBody = document.querySelector('#salasTable tbody');
  const btnAgregar = document.getElementById('btnAgregarSala');
  const modalForm = document.getElementById('modalSala');
  const cerrarModal = document.getElementById('cerrarModalSala');
  const consultorioForm = document.getElementById('salaForm');
  const formTitle = document.getElementById('formTitle');
  const inputId = document.getElementById('salaId');
  const inputNombre = document.getElementById('nombre');
  const inputTipo = document.getElementById('tipo');
  const inputHoraInicio = document.getElementById('horaInicio');  // Control para la hora de inicio
  const inputHoraFin = document.getElementById('horaFin');        // Control para la hora de fin

  let consultorios = [];

  // Cargar consultorios del localStorage si existen
  function loadConsultorios() {
    const data = localStorage.getItem('consultorios');
    consultorios = data ? JSON.parse(data) : [];
  }

  // Guardar consultorios en localStorage
  function saveConsultorios() {
    localStorage.setItem('consultorios', JSON.stringify(consultorios));
  }

  // Renderizar consultorios en la tabla
  function renderConsultorios() {
    consultoriosTableBody.innerHTML = '';
    consultorios.forEach((consultorio, index) => {
      const row = document.createElement('tr');
      row.innerHTML = `
        <td>${index + 1}</td>
        <td>${consultorio.nombre}</td>
        <td>${consultorio.tipo}</td>
        <td>${consultorio.horaInicio} - ${consultorio.horaFin}</td>
        <td>
          <button class="edit-btn" data-index="${index}">Editar</button>
          <button class="delete-btn" data-index="${index}">Eliminar</button>
        </td>
      `;
      consultoriosTableBody.appendChild(row);
    });
    // Asignar eventos a los botones de editar y eliminar
    const editButtons = document.querySelectorAll('.edit-btn');
    editButtons.forEach(button => {
      button.addEventListener('click', function() {
        const index = this.dataset.index;
        abrirFormularioEdicion(index);
      });
    });

    const deleteButtons = document.querySelectorAll('.delete-btn');
    deleteButtons.forEach(button => {
      button.addEventListener('click', function() {
        const index = this.dataset.index;
        eliminarConsultorio(index);
      });
    });
  }

  // Abrir modal para agregar/editar consultorio
  function abrirModal() {
    modalForm.style.display = 'block';
  }

  function cerrarModalForm() {
    modalForm.style.display = 'none';
    consultorioForm.reset();
    inputId.value = '';
  }

  // Abrir formulario con datos para editar
  function abrirFormularioEdicion(index) {
    const consultorio = consultorios[index];
    inputId.value = index;
    inputNombre.value = consultorio.nombre;
    inputTipo.value = consultorio.tipo;
    inputHoraInicio.value = consultorio.horaInicio;
    inputHoraFin.value = consultorio.horaFin;
    formTitle.textContent = 'Editar Consultorio';
    abrirModal();
  }

  // Eliminar consultorio
  function eliminarConsultorio(index) {
    if (confirm('¿Está seguro de eliminar este consultorio?')) {
      consultorios.splice(index, 1);
      saveConsultorios();
      renderConsultorios();
    }
  }

  // Manejar el envío del formulario
  consultorioForm.addEventListener('submit', function(e) {
    e.preventDefault();
    const nombre = inputNombre.value.trim();
    const tipo = inputTipo.value;
    const horaInicio = inputHoraInicio.value;
    const horaFin = inputHoraFin.value;
    const id = inputId.value;

    // Validar campos obligatorios
    if (!nombre || !tipo || !horaInicio || !horaFin) {
      alert('Por favor, complete todos los campos.');
      return;
    }

    // Validar que la hora de inicio sea menor a la hora de fin
    if (horaInicio >= horaFin) {
      alert('La hora de inicio debe ser menor a la hora de fin.');
      return;
    }

    // Validar límites: la hora de inicio no antes de 09:00 y la hora de fin no después de 18:00
    if (horaInicio < "09:00" || horaFin > "18:00") {
      alert('El horario operativo debe estar entre 09:00 y 18:00.');
      return;
    }

    if (id === '') {
      // Crear nuevo consultorio
      const nuevoConsultorio = { nombre, tipo, horaInicio, horaFin };
      consultorios.push(nuevoConsultorio);
    } else {
      // Actualizar consultorio existente
      consultorios[id] = { nombre, tipo, horaInicio, horaFin };
    }
    saveConsultorios();
    renderConsultorios();
    cerrarModalForm();
  });

  // Eventos de botones
  btnAgregar.addEventListener('click', function() {
    consultorioForm.reset();
    inputId.value = '';
    formTitle.textContent = 'Agregar Consultorio';
    abrirModal();
  });

  cerrarModal.addEventListener('click', cerrarModalForm);

  // Cerrar modal al hacer clic fuera del contenido
  window.addEventListener('click', function(e) {
    if (e.target === modalForm) {
      cerrarModalForm();
    }
  });

  // Inicializar datos y renderizar
  loadConsultorios();
  renderConsultorios();
});

