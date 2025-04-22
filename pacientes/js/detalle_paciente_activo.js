document.addEventListener('DOMContentLoaded', function() {
    // Botones de acción
    const volverBtn = document.getElementById('volver-lista');
    const cerrarBtn = document.getElementById('cerrar-expediente');
  
    // Confirmación para volver a la lista
    volverBtn.addEventListener('click', function() {
      if(confirm('¿Estás seguro que deseas volver a la lista de pacientes?')) {
        window.location.href = '../pacientes/pacientes.html';
      }
    });
  
    // Confirmación para archivar paciente
    cerrarBtn.addEventListener('click', function() {
      if(confirm('¿Estás seguro que deseas archivar este expediente? El paciente pasará a estado "Archivado"')) {
        // Aquí iría la lógica para cambiar el estado en la base de datos
        alert('El expediente ha sido archivado correctamente');
        window.location.href = '../pacientes/pacientes.html';
      }
    });
  
    // Opcional: Lógica para abrir documentos
    document.querySelectorAll('.document-item').forEach(item => {
      item.addEventListener('click', function(e) {
        e.preventDefault();
        // Aquí iría la lógica para abrir el documento correspondiente
        alert(`Abriendo: ${this.textContent}`);
      });
    });
  });