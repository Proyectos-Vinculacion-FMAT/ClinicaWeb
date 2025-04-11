document.addEventListener('DOMContentLoaded', function() {
  const consultoriosTableBody = document.querySelector('#consultoriosTable tbody');
  const btnAgregar = document.getElementById('btnAgregar');
  const modalForm = document.getElementById('modalForm');
  const cerrarModal = document.getElementById('cerrarModal');
  const consultorioForm = document.getElementById('consultorioForm');
  const formTitle = document.getElementById('formTitle');
  const inputId = document.getElementById('consultorioId');
  const inputNombre = document.getElementById('nombre');
  const inputTipo = document.getElementById('tipo');

  let consultorios = [];

  // Cargar consultorios del localStorage si existen
  function loadConsultorios() {
    const data = localStorage.getItem('consultorios');
    if (data) {
      consultorios = JSON.parse(data);
    } else {
      consultorios = [];
    }
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
        <td>
          <button class="edit-btn" data-index="${index}">Editar</button>
          <button class="delete-btn" data-index="${index}">Eliminar</button>
        </td>
      `;
      consultoriosTableBody.appendChild(row);
    });
    // Agregar eventos a los botones de editar y eliminar
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
    formTitle.textContent = 'Agregar Consultorio';
  }

  // Abrir formulario con datos para editar
  function abrirFormularioEdicion(index) {
    const consultorio = consultorios[index];
    inputId.value = index;
    inputNombre.value = consultorio.nombre;
    inputTipo.value = consultorio.tipo;
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
    const id = inputId.value;

    if (!nombre || !tipo) {
      alert('Por favor, complete todos los campos.');
      return;
    }

    if (id === '') {
      // Crear nuevo consultorio
      const nuevoConsultorio = { nombre, tipo };
      consultorios.push(nuevoConsultorio);
    } else {
      // Actualizar consultorio existente
      consultorios[id].nombre = nombre;
      consultorios[id].tipo = tipo;
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

  // Inicializar
  loadConsultorios();
  renderConsultorios();
});

