document.addEventListener('DOMContentLoaded', function() {
  // Elementos para el menú de pestañas
  const tabReportes = document.getElementById('tabReportes');
  const tabConfiguracion = document.getElementById('tabConfiguracion');
  const reportesSection = document.getElementById('reportesSection');
  const configuracionSection = document.getElementById('configuracionSection');

  // Función para cambiar de pestaña
  function activarPestana(pestana) {
    if (pestana === 'reportes') {
      tabReportes.classList.add('active');
      tabConfiguracion.classList.remove('active');
      reportesSection.style.display = 'block';
      configuracionSection.style.display = 'none';
    } else if (pestana === 'configuracion') {
      tabReportes.classList.remove('active');
      tabConfiguracion.classList.add('active');
      reportesSection.style.display = 'none';
      configuracionSection.style.display = 'block';
    }
  }

  // Eventos para cambiar pestañas
  tabReportes.addEventListener('click', () => activarPestana('reportes'));
  tabConfiguracion.addEventListener('click', () => activarPestana('configuracion'));

  /* REPORTES */

  const formReporte = document.getElementById('formReporte');
  const reporteResultado = document.getElementById('reporteResultado');

  formReporte.addEventListener('submit', function(e) {
    e.preventDefault();
    // Obtener filtros del formulario
    const fechaInicio = document.getElementById('fechaInicio').value;
    const fechaFin = document.getElementById('fechaFin').value;
    const filtroServicio = document.getElementById('filtroServicio').value;

    // Simulación: Generar datos de reporte (este ejemplo usa datos estáticos)
    const datosReporte = [
      { paciente: "María Aguilar", servicio: "psicodiagnostico", citas: 3 },
      { paciente: "Carlos Ruiz", servicio: "terapia", citas: 5 },
      { paciente: "Ana García", servicio: "psicodiagnostico", citas: 2 }
    ];

    // Filtrar datos de acuerdo a los valores ingresados
    const datosFiltrados = datosReporte.filter(dato => {
      // Solo aplicamos filtro de servicio si se ha seleccionado un valor
      if (filtroServicio && dato.servicio !== filtroServicio) return false;
      // Para este ejemplo, ignoramos la fecha, pero en un caso real deberíamos filtrar según fechaInicio y fechaFin
      return true;
    });

    // Renderizar resultados en una tabla
    let html = `<table>
                  <thead>
                    <tr>
                      <th>#</th>
                      <th>Paciente</th>
                      <th>Servicio</th>
                      <th>Citas</th>
                    </tr>
                  </thead>
                  <tbody>`;
    datosFiltrados.forEach((dato, index) => {
      html += `<tr>
                 <td>${index + 1}</td>
                 <td>${dato.paciente}</td>
                 <td>${dato.servicio}</td>
                 <td>${dato.citas}</td>
               </tr>`;
    });
    html += `</tbody></table>`;
    reporteResultado.innerHTML = html;
  });

  /* CONFIGURACIÓN */

  const formConfiguracion = document.getElementById('formConfiguracion');
  const configResultado = document.getElementById('configResultado');

  // Al cargar la página, cargar configuración guardada, si existe
  function cargarConfiguracion() {
    const config = localStorage.getItem('configSistema');
    if (config) {
      const { notificaciones, tiempoEspera, maxReprogramaciones } = JSON.parse(config);
      document.getElementById('notificaciones').value = notificaciones;
      document.getElementById('tiempoEspera').value = tiempoEspera;
      document.getElementById('maxReprogramaciones').value = maxReprogramaciones;
    }
  }

  formConfiguracion.addEventListener('submit', function(e) {
    e.preventDefault();
    // Obtener valores del formulario
    const notificaciones = document.getElementById('notificaciones').value;
    const tiempoEspera = document.getElementById('tiempoEspera').value;
    const maxReprogramaciones = document.getElementById('maxReprogramaciones').value;

    // Guardar configuración en localStorage
    const config = { notificaciones, tiempoEspera, maxReprogramaciones };
    localStorage.setItem('configSistema', JSON.stringify(config));

    // Mostrar mensaje de éxito
    configResultado.textContent = 'Configuración guardada correctamente.';
    setTimeout(() => {
      configResultado.textContent = '';
    }, 3000);
  });

  // Inicializar la configuración al cargar la página
  cargarConfiguracion();
});

