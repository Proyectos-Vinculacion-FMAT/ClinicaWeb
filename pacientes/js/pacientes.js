document.addEventListener('DOMContentLoaded', function() {
  // Elementos del DOM
  const buscarNombreInput = document.getElementById('buscar-nombre');
  const tipoServicioSelect = document.getElementById('tipo-servicio');
  const estadoRadios = document.querySelectorAll('input[name="estado"]');
  const pacientesItems = document.querySelectorAll('.patient-item');

  // Función para aplicar filtros
  function aplicarFiltros() {
    const nombreFiltro = buscarNombreInput.value.toLowerCase();
    const servicioFiltro = tipoServicioSelect.value;
    const estadoFiltro = document.querySelector('input[name="estado"]:checked').value;

    pacientesItems.forEach(paciente => {
      const nombrePaciente = paciente.textContent.toLowerCase();
      const servicioPaciente = paciente.getAttribute('data-servicio') || '';
      const estadoPaciente = paciente.getAttribute('data-estado');

      // Verificar coincidencias con los filtros
      const nombreCoincide = nombrePaciente.includes(nombreFiltro);
      const servicioCoincide = servicioFiltro === '' || servicioPaciente === servicioFiltro;
      const estadoCoincide = estadoFiltro === 'todos' || estadoPaciente === estadoFiltro;

      // Mostrar u ocultar según los filtros
      if (nombreCoincide && servicioCoincide && estadoCoincide) {
        paciente.style.display = 'flex';
      } else {
        paciente.style.display = 'none';
      }
    });
  }

  // Event listeners para los filtros
  buscarNombreInput.addEventListener('input', aplicarFiltros);
  tipoServicioSelect.addEventListener('change', aplicarFiltros);
  estadoRadios.forEach(radio => {
    radio.addEventListener('change', aplicarFiltros);
  });

  // Aplicar filtros al cargar la página (por si hay valores por defecto)
  aplicarFiltros();
});