document.addEventListener('DOMContentLoaded', function() {
  // Elementos del DOM
  const checklist = document.getElementById('checklist');
  const documentoView = document.getElementById('documentoView');
  const documentoTitulo = document.getElementById('documentoTitulo');
  const documentoContenido = document.getElementById('documentoContenido');
  const minimizarBtn = document.getElementById('minimizarDoc');
  const documentoLabels = document.querySelectorAll('.documento-titulo');
  const docActions = document.getElementById('documentActions');
  
  // Mostrar documento al hacer clic en el título
  documentoLabels.forEach(label => {
    label.addEventListener('click', function(e) {
      if (e.target.tagName !== 'INPUT') {
        const checkbox = this.previousElementSibling;
        checkbox.checked = !checkbox.checked;
        
        if (checkbox.checked) {
          const docId = checkbox.dataset.doc;
          mostrarDocumento(docId);
        } else {
          minimizarDocumento();
        }
      }
    });
  });

  // Función para mostrar documento
  function mostrarDocumento(docId) {
    // Mostrar acciones solo para documentos imprimibles
    if (['encuesta', 'entrevista', 'hoja-control'].includes(docId)) {
      docActions.style.display = 'block';
      document.getElementById('btnImprimir').onclick = () => mostrarVistaPreviaImpresion(docId);
    } else {
      docActions.style.display = 'none';
    }

    // Configurar contenido según el tipo de documento
    switch(docId) {
      case 'hoja-control':
        cargarHojaControl();
        break;
      case 'encuesta':
        cargarEncuesta();
        break;
      case 'entrevista':
        cargarEntrevista();
        break;
      default:
        documentoTitulo.textContent = 'Documento no disponible';
        documentoContenido.innerHTML = '<p>Este documento no tiene vista previa disponible.</p>';
    }

    // Mostrar vista de documento
    documentoView.classList.add('active');
    checklist.classList.add('slide-left');
    
    // Habilitar acciones
    document.querySelectorAll('.btn-action').forEach(btn => {
      btn.disabled = false;
    });
  }

  // Funciones para cargar documentos específicos
  function cargarHojaControl() {
    documentoTitulo.textContent = 'Hoja de Control de Sesión';
    documentoContenido.innerHTML = `
      <form id="formHojaControl">
        <div class="encabezado">
          <h2>Documento Interno SEAP</h2>
          <p>Actualización 2024</p>
          <h3>SERVICIO EXTERNO DE APOYO PSICOLÓGICO</h3>
          <h4>HOJA DE CONTROL</h4>
        </div>
        
        <div class="datos-paciente">
          <p>Nombre del Paciente: <input type="text" name="nombre" value="María Aguilar" disabled> 
          Edad: <input type="text" name="edad" style="width: 50px;" disabled> 
          Sexo: <input type="text" name="sexo" style="width: 70px;" disabled></p>
          <p>Nombre del Terapeuta: <input type="text" name="terapeuta" value="Victor Sánchez" disabled></p>
        </div>
        
        <div id="secciones-sesion">
          ${generarSeccionSesion(1)}
          ${generarSeccionSesion(2)}
        </div>
        
        <div class="botones-formulario no-print">
          <button type="button" id="btnAgregarSesion">➕ Añadir otra sesión</button>
        </div>
      </form>
    `;
    
    // Habilitar funcionalidad de añadir sesiones
    document.getElementById('btnAgregarSesion')?.addEventListener('click', agregarSesion);
  }

  function cargarEncuesta() {
    documentoTitulo.textContent = 'Encuesta Socioeconómica';
    documentoContenido.innerHTML = `
      <form id="formEncuesta">
        <h2>Encuesta Socioeconómica</h2>
        <!-- Contenido de la encuesta -->
      </form>
    `;
  }

  function cargarEntrevista() {
    documentoTitulo.textContent = 'Entrevista Inicial';
    documentoContenido.innerHTML = `
      <form id="formEntrevista">
        <h2>Entrevista Inicial</h2>
        <!-- Contenido de la entrevista -->
      </form>
    `;
  }

  // Función auxiliar para generar secciones de sesión
  function generarSeccionSesion(numeroSesion) {
    return `
      <div class="sesion" data-sesion="${numeroSesion}">
        <h4>No. De Sesión <input type="text" name="num_sesion_${numeroSesion}" style="width: 30px;" value="${numeroSesion}" disabled> 
        Fecha <input type="date" name="fecha_sesion_${numeroSesion}" disabled></h4>
        
        <div class="asistencia">
          <label>Asistió el paciente: 
            <label>Sí <input type="radio" name="asistencia_${numeroSesion}" value="si" disabled></label>
            <label>No <input type="radio" name="asistencia_${numeroSesion}" value="no" disabled></label>
            <label>Canceló <input type="radio" name="asistencia_${numeroSesion}" value="cancelo" disabled></label>
            <label>¿Quién? <input type="text" name="quien_cancelo_${numeroSesion}" disabled></label>
          </label>
        </div>
        
        <div class="motivo-cancelacion">
          <p>Motivo de Cancelación: <input type="text" name="motivo_cancelacion_${numeroSesion}" disabled></p>
        </div>
        
        <div class="descripcion-sesion">
          <p>Descripción de la Sesión:</p>
          <textarea name="descripcion_${numeroSesion}" rows="4" disabled></textarea>
        </div>
        
        <div class="observaciones-terapeuta">
          <p>Observación del Terapeuta:</p>
          <textarea name="observaciones_${numeroSesion}" rows="3" disabled></textarea>
        </div>
      </div>
    `;
  }

  // Función para añadir nueva sesión
  function agregarSesion() {
    const secciones = document.getElementById('secciones-sesion');
    const sesiones = secciones.querySelectorAll('.sesion');
    const nuevaSesion = generarSeccionSesion(sesiones.length + 1);
    secciones.insertAdjacentHTML('beforeend', nuevaSesion);
  }

  // Minimizar documento
  function minimizarDocumento() {
    documentoView.classList.remove('active');
    checklist.classList.remove('slide-left');
    docActions.style.display = 'none';
    document.querySelectorAll('.documentos-list input[type="checkbox"]').forEach(cb => {
      cb.checked = false;
    });
  }

  // Evento para el botón minimizar
  minimizarBtn.addEventListener('click', minimizarDocumento);

  // Acciones de los botones
  document.getElementById('btnModificar')?.addEventListener('click', function() {
    const form = document.querySelector('.documento-content form');
    if (form) {
      form.querySelectorAll('input, textarea, select').forEach(input => {
        input.disabled = false;
      });
      this.textContent = 'Editando...';
    }
  });

  document.getElementById('btnGuardar')?.addEventListener('click', function() {
    alert('Cambios guardados correctamente');
    const form = document.querySelector('.documento-content form');
    if (form) {
      form.querySelectorAll('input, textarea, select').forEach(input => {
        input.disabled = true;
      });
    }
    document.getElementById('btnModificar').textContent = '✏️ Modificar archivo';
  });

  document.getElementById('btnDeshacer')?.addEventListener('click', function() {
    const form = document.querySelector('.documento-content form');
    if (form) form.reset();
  });

  document.getElementById('btnMinimizar')?.addEventListener('click', minimizarDocumento);

  // Deshabilitar botones inicialmente
  document.querySelectorAll('.btn-action').forEach(btn => {
    btn.disabled = true;
  });
});

// Función para vista previa de impresión
function mostrarVistaPreviaImpresion(docId) {
  const modal = document.getElementById('modalPrintPreview');
  const previewContent = document.getElementById('printPreviewContent');
  
  if (docId === 'hoja-control') {
    const form = document.getElementById('formHojaControl');
    let printHTML = `
      <div class="documento-print">
        <div class="encabezado-print">
          <h2>Documento Interno SEAP</h2>
          <p>Actualización 2024</p>
          <h3>SERVICIO EXTERNO DE APOYO PSICOLÓGICO</h3>
          <h4>HOJA DE CONTROL</h4>
        </div>
        
        <div class="datos-paciente-print">
          <p><strong>Nombre del Paciente:</strong> ${form?.querySelector('[name="nombre"]')?.value || 'María Aguilar'}</p>
          <p><strong>Terapeuta:</strong> ${form?.querySelector('[name="terapeuta"]')?.value || 'Victor Sánchez'}</p>
        </div>
    `;
    
    // Generar secciones de sesión para imprimir
    document.querySelectorAll('.sesion').forEach(sesion => {
      const numSesion = sesion.dataset.sesion;
      const asistencia = sesion.querySelector('input[type="radio"]:checked')?.value || 'No especificado';
      
      printHTML += `
        <div class="sesion-print">
          <h4>Sesión ${numSesion} - ${sesion.querySelector('[name^="fecha_sesion"]')?.value || ''}</h4>
          <p><strong>Asistencia:</strong> ${asistencia}</p>
          ${asistencia === 'cancelo' ? `<p><strong>Motivo:</strong> ${sesion.querySelector('[name^="motivo_cancelacion"]')?.value || ''}</p>` : ''}
          <p><strong>Descripción:</strong> ${sesion.querySelector('textarea[name^="descripcion"]')?.value || 'Sin descripción'}</p>
          <p><strong>Observaciones:</strong> ${sesion.querySelector('textarea[name^="observaciones"]')?.value || 'Ninguna'}</p>
        </div>
      `;
    });
    
    printHTML += `</div>`;
    previewContent.innerHTML = printHTML;
  } else {
    previewContent.innerHTML = '<p>Vista previa no disponible para este documento</p>';
  }
  
  modal.style.display = 'block';
}

// Cerrar modal
document.getElementById('btnClosePreview')?.addEventListener('click', function() {
  document.getElementById('modalPrintPreview').style.display = 'none';
});

// Cerrar al hacer clic fuera
document.getElementById('modalPrintPreview')?.addEventListener('click', function(e) {
  if (e.target === this) {
    this.style.display = 'none';
  }
});

// Imprimir documento
document.getElementById('btnActualPrint')?.addEventListener('click', function() {
  window.print();
});