document.addEventListener('DOMContentLoaded', function() {
    // Elementos del DOM
    const therapistItems = document.querySelectorAll('.therapist-item');
    const btnNuevoTerapeuta = document.getElementById('btnNuevoTerapeuta');
    const modal = document.getElementById('modalTerapeuta');
    const closeModal = document.querySelectorAll('.close-modal');
    const formTerapeuta = document.getElementById('formTerapeuta');
    const btnAddHorario = document.getElementById('btnAddHorario');
    const horariosContainer = document.getElementById('horarios-container');
    
    // Datos de ejemplo
    const terapeutas = [
      { id: 1, nombre: "Ana García", email: "ana@clinica.com", telefono: "5551234567", rol: "activo", tipo: "tipo1", horarios: [] },
      { id: 2, nombre: "Carlos Méndez", email: "carlos@clinica.com", telefono: "5557654321", rol: "activo", tipo: "tipo2", horarios: [] },
      { id: 3, nombre: "Luisa Fernández", email: "luisa@clinica.com", telefono: "5559876543", rol: "pasante", tipo: "tipo1", horarios: [] }
    ];
    
    // Abrir modal para nuevo terapeuta
    btnNuevoTerapeuta.addEventListener('click', function() {
      document.getElementById('modalTitle').textContent = "Nuevo Terapeuta";
      formTerapeuta.reset();
      horariosContainer.innerHTML = '';
      modal.style.display = "block";
    });
    
    // Cerrar modal
    closeModal.forEach(btn => {
      btn.addEventListener('click', function() {
        modal.style.display = "none";
      });
    });
    
    // Cerrar modal al hacer clic fuera
    window.addEventListener('click', function(e) {
      if (e.target === modal) {
        modal.style.display = "none";
      }
    });
    
    // Añadir horario
    btnAddHorario.addEventListener('click', function() {
      const horarioItem = document.createElement('div');
      horarioItem.className = 'horario-item';
      horarioItem.innerHTML = `
        <select class="dia-semana">
          <option value="lunes">Lunes</option>
          <option value="martes">Martes</option>
          <option value="miercoles">Miércoles</option>
          <option value="jueves">Jueves</option>
          <option value="viernes">Viernes</option>
        </select>
        <input type="time" class="hora-inicio">
        <span>a</span>
        <input type="time" class="hora-fin">
        <button type="button" class="btn-remove-horario">✕</button>
      `;
      horariosContainer.appendChild(horarioItem);
      
      // Eliminar horario
      horarioItem.querySelector('.btn-remove-horario').addEventListener('click', function() {
        horarioItem.remove();
      });
    });
    
    // Enviar formulario
    formTerapeuta.addEventListener('submit', function(e) {
      e.preventDefault();
      
      // Obtener datos del formulario
      const nombre = document.getElementById('nombre').value;
      const email = document.getElementById('email').value;
      const telefono = document.getElementById('telefono').value;
      const rol = document.getElementById('rol').value;
      const tipo = document.getElementById('tipo-servicio-modal').value;
      
      // Obtener horarios
      const horarios = [];
      document.querySelectorAll('.horario-item').forEach(item => {
        horarios.push({
          dia: item.querySelector('.dia-semana').value,
          inicio: item.querySelector('.hora-inicio').value,
          fin: item.querySelector('.hora-fin').value
        });
      });
      
      // Aquí iría la lógica para guardar en la base de datos
      console.log({
        nombre,
        email,
        telefono,
        rol,
        tipo,
        horarios
      });
      
      // Cerrar modal y actualizar lista
      modal.style.display = "none";
      alert("Terapeuta guardado correctamente");
    });
    
    // Seleccionar terapeuta para editar
    therapistItems.forEach(item => {
      item.addEventListener('click', function() {
        const nombre = this.dataset.nombre;
        const tipo = this.dataset.tipo;
        
        // Buscar terapeuta en los datos
        const terapeuta = terapeutas.find(t => t.nombre === nombre);
        
        if (terapeuta) {
          document.getElementById('modalTitle').textContent = "Editar Terapeuta";
          document.getElementById('nombre').value = terapeuta.nombre;
          document.getElementById('email').value = terapeuta.email;
          document.getElementById('telefono').value = terapeuta.telefono;
          document.getElementById('rol').value = terapeuta.rol;
          document.getElementById('tipo-servicio-modal').value = terapeuta.tipo;
          
          // Limpiar y cargar horarios
          horariosContainer.innerHTML = '';
          terapeuta.horarios.forEach(horario => {
            const horarioItem = document.createElement('div');
            horarioItem.className = 'horario-item';
            horarioItem.innerHTML = `
              <select class="dia-semana">
                <option value="lunes" ${horario.dia === 'lunes' ? 'selected' : ''}>Lunes</option>
                <option value="martes" ${horario.dia === 'martes' ? 'selected' : ''}>Martes</option>
                <option value="miercoles" ${horario.dia === 'miercoles' ? 'selected' : ''}>Miércoles</option>
                <option value="jueves" ${horario.dia === 'jueves' ? 'selected' : ''}>Jueves</option>
                <option value="viernes" ${horario.dia === 'viernes' ? 'selected' : ''}>Viernes</option>
              </select>
              <input type="time" class="hora-inicio" value="${horario.inicio}">
              <span>a</span>
              <input type="time" class="hora-fin" value="${horario.fin}">
              <button type="button" class="btn-remove-horario">✕</button>
            `;
            horariosContainer.appendChild(horarioItem);
            
            // Eliminar horario
            horarioItem.querySelector('.btn-remove-horario').addEventListener('click', function() {
              horarioItem.remove();
            });
          });
          
          modal.style.display = "block";
        }
      });
    });
  });