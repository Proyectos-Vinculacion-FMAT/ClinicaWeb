document.addEventListener('DOMContentLoaded', function() {
  // Elementos del DOM
  const buscarNombre = document.getElementById('buscar-nombre');
  const tipoServicio = document.getElementById('tipo-servicio');
  const radioEstados = document.querySelectorAll('input[name="estado"]');
  const btnAplicarFiltros = document.getElementById('aplicar-filtros');
  const btnEliminarFiltros = document.getElementById('eliminar-filtros');
  const btnNuevoPaciente = document.getElementById('btnNuevoPaciente');
  const patientItems = document.querySelectorAll('.patient-item');

  // Datos de ejemplo (en una app real vendrían de una API)
  const pacientes = [
    { nombre: "María López", tipo: "tipo1", estado: "activo" },
    { nombre: "Juan Pérez", tipo: "tipo2", estado: "activo" },
    { nombre: "Carlos Ruiz", tipo: "", estado: "espera" },
    { nombre: "Ana García", tipo: "tipo1", estado: "archivado" }
  ];

  // Evento para aplicar filtros
  btnAplicarFiltros.addEventListener('click', aplicarFiltros);

  // Evento para eliminar filtros
  btnEliminarFiltros.addEventListener('click', function() {
    buscarNombre.value = '';
    tipoServicio.value = '';
    document.querySelector('input[name="estado"][value="activo"]').checked = true;
    aplicarFiltros();
  });

  // Evento para nuevo paciente
  btnNuevoPaciente.addEventListener('click', function() {
    // Aquí iría la lógica para abrir formulario de nuevo paciente
    alert("Abrir formulario para nuevo paciente");
  });

  // Función para aplicar filtros
  function aplicarFiltros() {
    const textoBusqueda = buscarNombre.value.toLowerCase();
    const tipoSeleccionado = tipoServicio.value;
    const estadoSeleccionado = document.querySelector('input[name="estado"]:checked').value;

    patientItems.forEach(item => {
      const nombre = item.dataset.nombre.toLowerCase();
      const tipo = item.dataset.tipo;
      const estado = item.dataset.estado;

      let mostrar = true;

      // Filtro por texto
      if (textoBusqueda && !nombre.includes(textoBusqueda)) {
        mostrar = false;
      }

      // Filtro por tipo de servicio
      if (tipoSeleccionado && tipo !== tipoSeleccionado) {
        mostrar = false;
      }

      // Filtro por estado
      if (estadoSeleccionado !== 'todos' && estado !== estadoSeleccionado) {
        mostrar = false;
      }

      // Mostrar u ocultar según los filtros
      item.style.display = mostrar ? 'flex' : 'none';
    });
  }

  // Aplicar filtros al escribir (con debounce)
  let timeout;
  buscarNombre.addEventListener('input', function() {
    clearTimeout(timeout);
    timeout = setTimeout(aplicarFiltros, 300);
  });

  // Aplicar filtros al cambiar otros controles
  tipoServicio.addEventListener('change', aplicarFiltros);
  
  // Actualizado para funcionar con la nueva estructura de radio buttons
  document.querySelectorAll('.estado-option input').forEach(radio => {
    radio.addEventListener('change', aplicarFiltros);
  });

  // Inicializar filtros al cargar la página
  aplicarFiltros();
});