document.addEventListener('DOMContentLoaded', function() {
    // Datos del terapeuta (en una app real vendrían de una API)
    let terapeuta = {
      nombre: "Ana García",
      email: "ana@clinica.com",
      telefono: "5551234567",
      rol: "activo",
      servicio: "Psicodiagnóstico",
      horarios: [
        { dia: "Lunes", inicio: "09:00", fin: "13:00" },
        { dia: "Miércoles", inicio: "14:00", fin: "18:00" },
        { dia: "Viernes", inicio: "10:00", fin: "15:00" }
      ]
    };
  
    // Elementos del DOM
    const btnEditar = document.getElementById('btnEditar');
    const btnGuardar = document.getElementById('btnGuardar');
    const btnCancelar = document.getElementById('btnCancelar');
    const btnAddHorario = document.getElementById('btnAddHorario');
    const viewMode = document.getElementById('view-mode');
    const editMode = document.getElementById('edit-mode');
    const horariosView = document.getElementById('horarios-view');
    const horariosEdit = document.getElementById('horarios-edit');
  
    // Cargar datos iniciales
    cargarDatosVista();
    cargarHorariosVista();
    
    // Evento para editar
    btnEditar.addEventListener('click', function() {
      viewMode.style.display = 'none';
      editMode.style.display = 'block';
      btnEditar.style.display = 'none';
      btnGuardar.style.display = 'block';
      btnCancelar.style.display = 'block';
      
      // Cargar datos en el formulario
      document.getElementById('edit-email').value = terapeuta.email;
      document.getElementById('edit-telefono').value = terapeuta.telefono;
      document.getElementById('edit-rol').value = terapeuta.rol;
      document.getElementById('edit-servicio').value = terapeuta.servicio;
      
      // Cargar horarios editables
      cargarHorariosEdicion();
    });
  
    // Evento para cancelar edición
    btnCancelar.addEventListener('click', function() {
      viewMode.style.display = 'block';
      editMode.style.display = 'none';
      btnEditar.style.display = 'block';
      btnGuardar.style.display = 'none';
      btnCancelar.style.display = 'none';
    });
  
    // Evento para guardar cambios
    btnGuardar.addEventListener('click', function(e) {
      e.preventDefault();
      
      // Actualizar datos del terapeuta
      terapeuta.email = document.getElementById('edit-email').value;
      terapeuta.telefono = document.getElementById('edit-telefono').value;
      terapeuta.rol = document.getElementById('edit-rol').value;
      terapeuta.servicio = document.getElementById('edit-servicio').value;
      
      // Actualizar horarios
      const nuevosHorarios = [];
      document.querySelectorAll('.horario-editable').forEach(item => {
        nuevosHorarios.push({
          dia: item.querySelector('.edit-dia').value,
          inicio: item.querySelector('.edit-inicio').value,
          fin: item.querySelector('.edit-fin').value
        });
      });
      terapeuta.horarios = nuevosHorarios;
      
      // Volver a modo vista
      viewMode.style.display = 'block';
      editMode.style.display = 'none';
      btnEditar.style.display = 'block';
      btnGuardar.style.display = 'none';
      btnCancelar.style.display = 'none';
      
      // Actualizar vista
      cargarDatosVista();
      cargarHorariosVista();
      
      alert("Cambios guardados correctamente");
    });
  
    // Añadir nuevo horario
    btnAddHorario.addEventListener('click', function() {
      const horarioItem = document.createElement('div');
      horarioItem.className = 'horario-editable';
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
        <button type="button" class="btn-remove-horario">✕</button>
      `;
      horariosEdit.appendChild(horarioItem);
      
      // Evento para eliminar horario
      horarioItem.querySelector('.btn-remove-horario').addEventListener('click', function() {
        horarioItem.remove();
      });
    });
  
    // Función para cargar datos en modo vista
    function cargarDatosVista() {
      document.getElementById('terapeuta-email').textContent = terapeuta.email;
      document.getElementById('terapeuta-telefono').textContent = terapeuta.telefono;
      document.getElementById('terapeuta-rol').textContent = terapeuta.rol;
      document.getElementById('terapeuta-rol').className = `badge ${terapeuta.rol}`;
      document.getElementById('terapeuta-servicio').textContent = terapeuta.servicio;
    }
  
    // Función para cargar horarios en modo vista
    function cargarHorariosVista() {
      horariosView.innerHTML = '';
      terapeuta.horarios.forEach(horario => {
        const horarioItem = document.createElement('div');
        horarioItem.className = 'horario-item';
        horarioItem.innerHTML = `
          <span class="dia">${horario.dia}</span>
          <span class="horas">${horario.inicio} - ${horario.fin}</span>
        `;
        horariosView.appendChild(horarioItem);
      });
    }
  
    // Función para cargar horarios en modo edición
    function cargarHorariosEdicion() {
      horariosEdit.innerHTML = '';
      terapeuta.horarios.forEach(horario => {
        const horarioItem = document.createElement('div');
        horarioItem.className = 'horario-editable';
        horarioItem.innerHTML = `
          <select class="edit-dia">
            <option value="Lunes" ${horario.dia === 'Lunes' ? 'selected' : ''}>Lunes</option>
            <option value="Martes" ${horario.dia === 'Martes' ? 'selected' : ''}>Martes</option>
            <option value="Miércoles" ${horario.dia === 'Miércoles' ? 'selected' : ''}>Miércoles</option>
            <option value="Jueves" ${horario.dia === 'Jueves' ? 'selected' : ''}>Jueves</option>
            <option value="Viernes" ${horario.dia === 'Viernes' ? 'selected' : ''}>Viernes</option>
          </select>
          <input type="time" class="edit-inicio" value="${horario.inicio}">
          <span>a</span>
          <input type="time" class="edit-fin" value="${horario.fin}">
          <button type="button" class="btn-remove-horario">✕</button>
        `;
        horariosEdit.appendChild(horarioItem);
        
        // Evento para eliminar horario
        horarioItem.querySelector('.btn-remove-horario').addEventListener('click', function() {
          horarioItem.remove();
        });
      });
    }
  });