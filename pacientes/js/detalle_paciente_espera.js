document.addEventListener('DOMContentLoaded', function() {
    // Botones de acción
    const volverBtn = document.getElementById('volver-lista');
    const iniciarBtn = document.getElementById('iniciar-expediente');
  
    // Confirmación para volver a la lista
    volverBtn.addEventListener('click', function() {
      if(confirm('¿Estás seguro que deseas volver a la lista de pacientes?')) {
        window.location.href = '../pacientes/pacientes.html';
      }
    });
  
    // Confirmación para iniciar expediente
    iniciarBtn.addEventListener('click', function() {
      if(confirm('¿Estás seguro que deseas inicializar este expediente? El paciente pasará a estado "Activo"')) {
        // Aquí iría la lógica para cambiar el estado en la base de datos
        alert('El expediente ha sido inicializado correctamente');
        window.location.href = '../pacientes/pacientes.html';
      }
    });
  
    // Opcional: Lógica para abrir documentos
    document.querySelectorAll('.document-item').forEach(item => {
        item.addEventListener('click', function(e) {
          if(this.classList.contains('locked')) {
            e.preventDefault();
            alert('Este documento no está disponible hasta que el paciente sea activado');
            return;
          }
          // Resto de la lógica para documentos desbloqueados
          alert(`Abriendo: ${this.textContent.replace('🔒', '').trim()}`);
        });
      });
  });