document.addEventListener('DOMContentLoaded', () => {
    const lista = document.querySelectorAll('#lista-documentos li');
    const titulo = document.getElementById('doc-title');
    const contenido = document.getElementById('doc-content');
    const btnEditar = document.getElementById('editar');
    const btnGuardar = document.getElementById('guardar');
    const btnCancelar = document.getElementById('cancelar');
    const btnImprimir = document.getElementById('imprimir');
  
    lista.forEach(item => {
      item.addEventListener('click', () => {
        const nombre = item.textContent.trim();
        titulo.textContent = nombre;
        contenido.value = `Contenido simulado de "${nombre}"...`;
        contenido.disabled = true;
  
        btnEditar.style.display = 'inline-block';
        btnGuardar.style.display = 'none';
        btnCancelar.style.display = 'none';
      });
    });
  
    btnEditar.addEventListener('click', () => {
      contenido.disabled = false;
      btnGuardar.style.display = 'inline-block';
      btnCancelar.style.display = 'inline-block';
      btnEditar.style.display = 'none';
    });
  
    btnCancelar.addEventListener('click', () => {
      contenido.disabled = true;
      btnGuardar.style.display = 'none';
      btnCancelar.style.display = 'none';
      btnEditar.style.display = 'inline-block';
    });
  
    btnGuardar.addEventListener('click', () => {
      alert("Contenido guardado.");
      contenido.disabled = true;
      btnGuardar.style.display = 'none';
      btnCancelar.style.display = 'none';
      btnEditar.style.display = 'inline-block';
    });
  
    btnImprimir.addEventListener('click', () => {
      window.print();
    });
  });
  