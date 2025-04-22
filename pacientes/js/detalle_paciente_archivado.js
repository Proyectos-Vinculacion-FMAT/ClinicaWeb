document.addEventListener('DOMContentLoaded', function() {
    // Botón de volver
    const volverBtn = document.getElementById('volver-lista');

    // Confirmación para volver a la lista
    volverBtn.addEventListener('click', function() {
        if(confirm('¿Estás seguro que deseas volver a la lista de pacientes?')) {
          window.location.href = '../pacientes/pacientes.html';
        }
      });
  
    // Lógica para abrir documentos
    document.querySelectorAll('.document-item').forEach(item => {
      item.addEventListener('click', function(e) {
        e.preventDefault();
        alert(`Abriendo: ${this.textContent}`);
      });
    });
  });