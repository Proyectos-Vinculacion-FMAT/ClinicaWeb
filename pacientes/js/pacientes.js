document.addEventListener('DOMContentLoaded', function() {
    // Elementos del DOM
    const patientItems = document.querySelectorAll('.patient-item');
    const estadoRadios = document.querySelectorAll('input[name="estado"]');
    const nombreInput = document.getElementById('buscar-nombre');
    const tipoServicioSelect = document.getElementById('tipo-servicio');
    const aplicarFiltrosBtn = document.getElementById('aplicar-filtros');
    const eliminarFiltrosBtn = document.getElementById('eliminar-filtros');
  
    // Función para restablecer filtros
    function resetearFiltros() {
      document.getElementById('activo').checked = true;
      nombreInput.value = '';
      tipoServicioSelect.selectedIndex = 0;
      aplicarFiltros();
    }
  
    // Función principal para aplicar filtros
    function aplicarFiltros() {
      const estadoSeleccionado = document.querySelector('input[name="estado"]:checked').id;
      const nombreBusqueda = nombreInput.value.toLowerCase();
      const tipoServicio = tipoServicioSelect.value;
  
      patientItems.forEach(item => {
        const nombre = item.dataset.nombre.toLowerCase();
        const tipo = item.dataset.tipo;
        const estadoPaciente = item.dataset.estado;
        let mostrar = true;
  
        // Filtro por estado seleccionado
        if (estadoSeleccionado === 'activo' && estadoPaciente !== 'activo') {
          mostrar = false;
        } else if (estadoSeleccionado === 'espera' && estadoPaciente !== 'espera') {
          mostrar = false;
        } else if (estadoSeleccionado === 'archivados' && estadoPaciente !== 'archivado') {
          mostrar = false;
        }
  
        // Filtro por nombre
        if (nombreBusqueda && !nombre.includes(nombreBusqueda)) {
          mostrar = false;
        }
  
        // Filtro por tipo de servicio (solo aplica para activos)
        if (tipoServicio && estadoPaciente === 'activo' && tipo !== tipoServicio) {
          mostrar = false;
        }
  
        item.style.display = mostrar ? 'block' : 'none';
      });
    }
  
    // Event listeners
    estadoRadios.forEach(radio => {
      radio.addEventListener('change', aplicarFiltros);
    });
  
    aplicarFiltrosBtn.addEventListener('click', aplicarFiltros);
    eliminarFiltrosBtn.addEventListener('click', resetearFiltros);
  
    // Búsqueda por nombre con debounce
    let timeout;
    nombreInput.addEventListener('input', () => {
      clearTimeout(timeout);
      timeout = setTimeout(aplicarFiltros, 300);
    });
  
    // Aplicar filtros al cargar
    aplicarFiltros();
  });