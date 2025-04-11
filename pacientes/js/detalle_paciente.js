document.addEventListener('DOMContentLoaded', function() {
  // ======================
  // ELEMENTOS DEL DOM
  // ======================
  const listaDocumentos = document.getElementById('listaDocumentos');
  const documentoView = document.getElementById('documentoView');
  const documentoContenido = document.getElementById('documentoContenido');
  const btnMinimizarDoc = document.getElementById('btnMinimizarDoc');
  const btnVolverLista = document.getElementById('btnVolverLista');
  const accionesDocumento = document.getElementById('accionesDocumento');
  const btnEditarDoc = document.getElementById('btnEditarDoc');
  const btnGuardarDoc = document.getElementById('btnGuardarDoc');
  const btnImprimirDoc = document.getElementById('btnImprimirDoc');
  const btnNuevoDocumento = document.getElementById('btnNuevoDocumento');
  const fileUpload = document.getElementById('fileUpload');
  const modalImpresion = document.getElementById('modalImpresion');
  const btnImprimirAhora = document.getElementById('btnImprimirAhora');
  const btnCerrarPreview = document.getElementById('btnCerrarPreview');
  const printPreviewContent = document.getElementById('printPreviewContent');
  const closeModal = document.querySelector('.close-modal');

  // ======================
  // ESTADO DE LA APLICACIÓN
  // ======================
  let documentoActual = null;
  let enEdicion = false;
  let contenidoOriginal = null;
  let sesiones = [];

  // Datos del paciente (simulados)
  const paciente = {
    nombre: "María Aguilar",
    email: "maria.aguilar@correo.com",
    telefono: "(999) 5148 568",
    servicio: "Psicodiagnóstico",
    terapeuta: "Victor Sánchez",
    estado: "Activo",
    fechaRegistro: "26/07/2024",
    sesiones: {
      completadas: 4,
      programadas: 6,
      faltasJustificadas: 0,
      faltasInjustificadas: 1,
      total: 10
    }
  };

  // ======================
  // FUNCIONES DE INICIALIZACIÓN
  // ======================
  function init() {
    cargarDatosPaciente();
    setupEventListeners();
    cargarSesionesEjemplo();
  }

  function cargarSesionesEjemplo() {
    sesiones = [
      {
        numero: 1,
        fecha: "2024-08-01",
        asistio: true,
        cancelo: false,
        quienCancelo: "",
        motivoCancelacion: "",
        descripcion: "Sesión inicial de evaluación. Paciente colaboradora.",
        observaciones: "Se recomienda continuar con el proceso."
      },
      {
        numero: 2,
        fecha: "2024-08-08",
        asistio: false,
        cancelo: true,
        quienCancelo: "Paciente",
        motivoCancelacion: "Problemas de transporte",
        descripcion: "",
        observaciones: "Reprogramar para la siguiente semana."
      }
    ];
  }

  function cargarDatosPaciente() {
    document.getElementById('paciente-nombre').textContent = paciente.nombre;
    document.getElementById('paciente-email').textContent = paciente.email;
    document.getElementById('paciente-telefono').textContent = paciente.telefono;
    document.getElementById('paciente-servicio').textContent = paciente.servicio;
    document.getElementById('paciente-terapeuta').textContent = paciente.terapeuta;
    document.getElementById('paciente-fecha').textContent = paciente.fechaRegistro;
    
    document.getElementById('sesiones-completadas').textContent = paciente.sesiones.completadas;
    document.getElementById('sesiones-programadas').textContent = paciente.sesiones.programadas;
    document.getElementById('faltas-justificadas').textContent = paciente.sesiones.faltasJustificadas;
    document.getElementById('faltas-injustificadas').textContent = paciente.sesiones.faltasInjustificadas;
    document.getElementById('total-sesiones').textContent = paciente.sesiones.total;
  }

  // ======================
  // CONFIGURACIÓN DE EVENTOS
  // ======================
  function setupEventListeners() {
    // Documentos
    document.querySelectorAll('.documento-item').forEach(item => {
      item.addEventListener('click', function(e) {
        if (!e.target.classList.contains('doc-checkbox')) {
          const checkbox = this.querySelector('.doc-checkbox');
          checkbox.checked = !checkbox.checked;
          toggleDocumento(checkbox.checked, this.dataset.doc);
        }
      });
    });

    document.querySelectorAll('.doc-checkbox').forEach(checkbox => {
      checkbox.addEventListener('change', function() {
        toggleDocumento(this.checked, this.closest('.documento-item').dataset.doc);
      });
    });

    // Botones principales
    btnMinimizarDoc.addEventListener('click', minimizarDocumento);
    btnVolverLista.addEventListener('click', minimizarDocumento);
    btnEditarDoc.addEventListener('click', editarDocumento);
    btnGuardarDoc.addEventListener('click', guardarDocumento);
    btnImprimirDoc.addEventListener('click', mostrarVistaPrevia);
    btnNuevoDocumento.addEventListener('click', () => fileUpload.click());
    fileUpload.addEventListener('change', subirDocumento);

    // Modal de impresión
    btnImprimirAhora.addEventListener('click', imprimirDocumento);
    btnCerrarPreview.addEventListener('click', cerrarModalImpresion);
    closeModal.addEventListener('click', cerrarModalImpresion);
    modalImpresion.addEventListener('click', function(e) {
      if (e.target === modalImpresion) {
        cerrarModalImpresion();
      }
    });
  }

  // ======================
  // FUNCIONES PRINCIPALES
  // ======================
  function toggleDocumento(mostrar, docId) {
    if (mostrar) {
      documentoActual = docId;
      mostrarDocumento(docId);
    } else {
      minimizarDocumento();
    }
  }

  function mostrarDocumento(docId) {
    document.getElementById('documentoTitulo').textContent = obtenerNombreDocumento(docId);
    cargarContenidoDocumento(docId);
    
    listaDocumentos.style.display = 'none';
    documentoView.style.display = 'flex';
    accionesDocumento.style.display = 'flex';
    
    document.querySelectorAll('.doc-checkbox').forEach(cb => {
      if (cb !== document.querySelector(`.documento-item[data-doc="${docId}"] .doc-checkbox`)) {
        cb.checked = false;
      }
    });
  }

  function minimizarDocumento() {
    if (enEdicion && !confirm('Tienes cambios sin guardar. ¿Seguro que quieres salir?')) {
      return;
    }
    
    listaDocumentos.style.display = 'block';
    documentoView.style.display = 'none';
    accionesDocumento.style.display = 'none';
    
    if (documentoActual) {
      document.querySelector(`.documento-item[data-doc="${documentoActual}"] .doc-checkbox`).checked = false;
      documentoActual = null;
    }
    
    enEdicion = false;
    btnEditarDoc.textContent = '✏️ Editar documento';
    btnGuardarDoc.style.display = 'none';
  }

  function obtenerNombreDocumento(docId) {
    const nombres = {
      'entrevista': 'Entrevista inicial',
      'hoja-control': 'Hoja de control SEAP',
      'datos-generales': 'Datos generales'
    };
    return nombres[docId] || 'Documento';
  }

  function cargarContenidoDocumento(docId) {
    let contenido = '';
    
    switch(docId) {
      case 'entrevista':
        contenido = generarFormularioEntrevista();
        break;
        
      case 'hoja-control':
        contenido = generarFormularioHojaControl();
        break;
        
      default:
        contenido = `<p>Este documento no tiene vista previa disponible.</p>`;
    }
    
    documentoContenido.innerHTML = contenido;
    contenidoOriginal = documentoContenido.innerHTML;
  }

  // ======================
  // FUNCIONES DE FORMULARIOS
  // ======================
  function generarFormularioEntrevista() {
    return `
      <form id="formEntrevista">
        <div class="form-group">
          <label>Prestador asignado:</label>
          <div>
            <label><input type="checkbox" name="prestador" value="maestria_adultos" checked disabled> Maestría Adultos</label>
            <label><input type="checkbox" name="prestador" value="maestria_infantil" disabled> Maestría Infantil</label>
          </div>
        </div>
        
        <div class="form-group">
          <label>Servicio ofrecido:</label>
          <div>
            <label><input type="checkbox" name="servicio" value="psicodiagnostico" checked disabled> Psicodiagnóstico</label>
          </div>
        </div>
        
        <div class="form-group">
          <label>Observaciones:</label>
          <textarea name="observaciones" rows="6" disabled>Paciente muestra buena disposición al tratamiento. Se recomienda evaluación psicológica completa.</textarea>
        </div>
      </form>
    `;
  }

  function generarFormularioHojaControl() {
    let sesionesHTML = '';
    
    sesiones.forEach(sesion => {
      sesionesHTML += generarCamposSesion(sesion);
    });
    
    // Agregar campos para una nueva sesión
    sesionesHTML += generarCamposSesion({
      numero: sesiones.length + 1,
      fecha: '',
      asistio: false,
      cancelo: false,
      quienCancelo: '',
      motivoCancelacion: '',
      descripcion: '',
      observaciones: ''
    });
    
    return `
      <div class="encabezado">
        <h2>Documento Interno SEAP</h2>
        <h3>Actualización 2024</h3>
        <h4>SERVICIO EXTERNO DE APOYO PSICOLÓGICO</h4>
        <h4>HOJA DE CONTROL</h4>
      </div>
      
      <form id="formHojaControl">
        <div class="datos-paciente">
          <p><strong>Nombre del Paciente:</strong> ${paciente.nombre} <strong>Edad:</strong> ______ <strong>Sexo:</strong> ______</p>
          <p><strong>Nombre del Terapeuta:</strong> ${paciente.terapeuta}</p>
        </div>
        
        ${sesionesHTML}
        
        <div class="botones-formulario">
          <button type="button" id="btnAgregarSesion" class="btn-action">➕ Agregar otra sesión</button>
        </div>
      </form>
    `;
  }

  function generarCamposSesion(sesion) {
    return `
      <div class="sesion">
        <div class="sesion-header">
          <div class="sesion-linea">
            <span><strong>No. De Sesión</strong></span>
            <input type="text" class="input-sesion" value="${sesion.numero}" disabled>
            <span><strong>Fecha</strong></span>
            <input type="date" class="input-fecha" value="${sesion.fecha}" ${enEdicion ? '' : 'disabled'}>
          </div>
        </div>
        
        <div class="sesion-linea">
          <span><strong>Asistió el paciente:</strong></span>
          <label><input type="radio" name="asistencia_${sesion.numero}" value="si" ${sesion.asistio ? 'checked' : ''} ${enEdicion ? '' : 'disabled'}> Sí</label>
          <label><input type="radio" name="asistencia_${sesion.numero}" value="no" ${!sesion.asistio && !sesion.cancelo ? 'checked' : ''} ${enEdicion ? '' : 'disabled'}> No</label>
          <label><input type="radio" name="asistencia_${sesion.numero}" value="cancelo" ${sesion.cancelo ? 'checked' : ''} ${enEdicion ? '' : 'disabled'}> Canceló</label>
          <span><strong>¿Quién?</strong></span>
          <input type="text" class="input-quien" value="${sesion.quienCancelo}" ${enEdicion ? '' : 'disabled'}>
        </div>
        
        <div class="sesion-linea">
          <span><strong>Motivo de Cancelación:</strong></span>
          <input type="text" class="input-motivo" value="${sesion.motivoCancelacion}" ${enEdicion ? '' : 'disabled'}>
        </div>
        
        <div class="sesion-linea">
          <div>
            <strong>Descripción de la Sesión:</strong>
            <textarea class="textarea-descripcion" ${enEdicion ? '' : 'disabled'}>${sesion.descripcion}</textarea>
          </div>
        </div>
        
        <div class="sesion-linea">
          <div>
            <strong>Observación del Terapeuta:</strong>
            <textarea class="textarea-observaciones" ${enEdicion ? '' : 'disabled'}>${sesion.observaciones}</textarea>
          </div>
        </div>
      </div>
    `;
  }

  // ======================
  // FUNCIONES DE EDICIÓN
  // ======================
  function editarDocumento() {
    if (documentoActual === 'hoja-control') {
      documentoContenido.querySelectorAll('input, textarea').forEach(input => {
        if (!input.classList.contains('input-sesion')) {
          input.disabled = false;
        }
      });
      
      const btnAgregarSesion = document.getElementById('btnAgregarSesion');
      if (btnAgregarSesion) {
        btnAgregarSesion.addEventListener('click', agregarNuevaSesion);
      }
    } else {
      const form = documentoContenido.querySelector('form');
      if (form) {
        form.querySelectorAll('input, textarea, select').forEach(input => {
          input.disabled = false;
        });
      }
    }
    
    enEdicion = true;
    btnEditarDoc.textContent = 'Editando...';
    btnGuardarDoc.style.display = 'flex';
  }

  function agregarNuevaSesion() {
    const nuevaSesionNumero = sesiones.length + 1;
    const nuevaSesion = {
      numero: nuevaSesionNumero,
      fecha: '',
      asistio: false,
      cancelo: false,
      quienCancelo: '',
      motivoCancelacion: '',
      descripcion: '',
      observaciones: ''
    };
    
    sesiones.push(nuevaSesion);
    
    const form = document.getElementById('formHojaControl');
    const divSesion = document.createElement('div');
    divSesion.innerHTML = generarCamposSesion(nuevaSesion);
    form.insertBefore(divSesion, document.querySelector('.botones-formulario'));
    
    divSesion.scrollIntoView({ behavior: 'smooth' });
  }

  function guardarDocumento() {
    if (confirm('¿Guardar los cambios realizados?')) {
      if (documentoActual === 'hoja-control') {
        const sesionesElements = documentoContenido.querySelectorAll('.sesion');
        sesiones = [];
        
        sesionesElements.forEach((sesionElement, index) => {
          const numero = parseInt(sesionElement.querySelector('.input-sesion').value);
          const fecha = sesionElement.querySelector('.input-fecha').value;
          const asistio = sesionElement.querySelector(`input[name="asistencia_${numero}"]:checked`).value === 'si';
          const cancelo = sesionElement.querySelector(`input[name="asistencia_${numero}"]:checked`).value === 'cancelo';
          const quienCancelo = sesionElement.querySelector('.input-quien').value;
          const motivoCancelacion = sesionElement.querySelector('.input-motivo').value;
          const descripcion = sesionElement.querySelector('.textarea-descripcion').value;
          const observaciones = sesionElement.querySelector('.textarea-observaciones').value;
          
          sesiones.push({
            numero,
            fecha,
            asistio,
            cancelo,
            quienCancelo,
            motivoCancelacion,
            descripcion,
            observaciones
          });
        });
      }
      
      documentoContenido.querySelectorAll('input, textarea').forEach(input => {
        input.disabled = true;
      });
      
      enEdicion = false;
      btnEditarDoc.textContent = '✏️ Editar documento';
      btnGuardarDoc.style.display = 'none';
      contenidoOriginal = documentoContenido.innerHTML;
      alert('Cambios guardados correctamente');
    }
  }

  // ======================
  // FUNCIONES DE IMPRESIÓN
  // ======================
  function mostrarVistaPrevia() {
    if (!documentoActual) return;
    
    let contenido = '';
    let titulo = '';
    
    switch(documentoActual) {
      case 'entrevista':
        titulo = 'ENTREVISTA INICIAL';
        const formEntrevista = document.getElementById('formEntrevista');
        contenido = `
          <div class="print-document">
            <h2>${titulo}</h2>
            <p><strong>Paciente:</strong> ${paciente.nombre}</p>
            <p><strong>Fecha:</strong> ${new Date().toLocaleDateString()}</p>
            <div class="print-section">
              <h3>Observaciones:</h3>
              <div class="print-textarea">${formEntrevista?.querySelector('[name="observaciones"]')?.value || 'Sin observaciones'}</div>
            </div>
          </div>
        `;
        break;
        
      case 'hoja-control':
        titulo = 'HOJA DE CONTROL SEAP';
        contenido = generarVistaPreviaHojaControl();
        break;
        
      default:
        contenido = '<p>Vista previa no disponible para este documento</p>';
    }
    
    mostrarModalImpresion(titulo, contenido);
  }

  function generarVistaPreviaHojaControl() {
    let sesionesHTML = '';
    
    sesiones.forEach(sesion => {
      sesionesHTML += `
        <div class="print-session">
          <div class="session-header">
            <p><strong>No. De Sesión:</strong> ${sesion.numero} <strong>Fecha:</strong> ${sesion.fecha || '______'}</p>
          </div>
          
          <div class="session-line">
            <p><strong>Asistió el paciente:</strong> 
            ${sesion.asistio ? 'Sí ______' : 
              sesion.cancelo ? 'No ______ Canceló ______ ¿Quién? ' + (sesion.quienCancelo || '______') : 
              'No ______'}</p>
          </div>
          
          ${sesion.cancelo ? `
          <div class="session-line">
            <p><strong>Motivo de Cancelación:</strong> ${sesion.motivoCancelacion || '______'}</p>
          </div>` : ''}
          
          <div class="session-line">
            <p><strong>Descripción de la Sesión:</strong></p>
            <div class="print-textarea">${sesion.descripcion || '______'}</div>
          </div>
          
          <div class="session-line">
            <p><strong>Observación del Terapeuta:</strong></p>
            <div class="print-textarea">${sesion.observaciones || '______'}</div>
          </div>
          
          ${sesion.numero < sesiones.length ? '<hr class="session-divider">' : ''}
        </div>
      `;
    });
    
    return `
      <div class="print-document">
        <div class="document-header">
          <h2>Documento Interno SEAP</h2>
          <h3>Actualización 2024</h3>
          <h4>SERVICIO EXTERNO DE APOYO PSICOLÓGICO</h4>
          <h4>HOJA DE CONTROL</h4>
        </div>
        
        <div class="patient-info">
          <p><strong>Nombre del Paciente:</strong> ${paciente.nombre} <strong>Edad:</strong> ______ <strong>Sexo:</strong> ______</p>
          <p><strong>Nombre del Terapeuta:</strong> ${paciente.terapeuta}</p>
        </div>
        
        ${sesionesHTML}
      </div>
    `;
  }

  function mostrarModalImpresion(titulo, contenido) {
    printPreviewContent.innerHTML = `
      <div class="print-preview-container">
        <h3>${titulo}</h3>
        ${contenido}
      </div>
    `;
    
    modalImpresion.style.display = 'flex';
    document.body.style.overflow = 'hidden';
  }

  function imprimirDocumento() {
    const ventanaImpresion = window.open('', '_blank');
    const estilos = `
      <style>
        body {
          font-family: Arial, sans-serif;
          line-height: 1.5;
          padding: 20px;
          max-width: 800px;
          margin: 0 auto;
        }
        .print-document {
          border: 1px solid #ddd;
          padding: 20px;
        }
        .document-header {
          text-align: center;
          margin-bottom: 20px;
        }
        .document-header h2 {
          font-size: 18px;
          margin-bottom: 5px;
        }
        .document-header h3 {
          font-size: 16px;
          margin: 5px 0;
        }
        .document-header h4 {
          font-size: 14px;
          margin: 5px 0;
          text-decoration: underline;
        }
        .patient-info {
          margin-bottom: 30px;
        }
        .patient-info p {
          margin: 8px 0;
        }
        .print-session {
          margin-bottom: 25px;
        }
        .session-line p {
          margin: 8px 0;
        }
        .print-textarea {
          border-bottom: 1px solid #000;
          min-height: 60px;
          padding: 5px;
          margin-top: 5px;
          white-space: pre-wrap;
        }
        .session-divider {
          border: none;
          border-top: 1px dashed #ccc;
          margin: 20px 0;
        }
        @page {
          size: A4;
          margin: 15mm;
        }
        @media print {
          body {
            padding: 0;
          }
          .print-document {
            border: none;
            padding: 0;
          }
        }
      </style>
    `;
    
    ventanaImpresion.document.write(`
      <!DOCTYPE html>
      <html>
      <head>
        <title>${document.getElementById('documentoTitulo').textContent}</title>
        ${estilos}
      </head>
      <body>
        ${printPreviewContent.querySelector('.print-preview-container').innerHTML}
      </body>
      </html>
    `);
    
    ventanaImpresion.document.close();
    
    ventanaImpresion.onload = function() {
      setTimeout(() => {
        ventanaImpresion.print();
        ventanaImpresion.close();
        cerrarModalImpresion();
      }, 500);
    };
  }

  function cerrarModalImpresion() {
    modalImpresion.style.display = 'none';
    document.body.style.overflow = 'auto';
  }

  // ======================
  // FUNCIONES ADICIONALES
  // ======================
  function subirDocumento(e) {
    if (e.target.files.length > 0) {
      const file = e.target.files[0];
      const fileName = file.name;
      
      const validTypes = ['application/pdf', 'application/msword', 
                         'application/vnd.openxmlformats-officedocument.wordprocessingml.document'];
      
      if (!validTypes.includes(file.type)) {
        alert("Por favor, sube un archivo PDF o Word");
        return;
      }
      
      setTimeout(() => {
        alert(`Documento "${fileName}" subido correctamente`);
        fileUpload.value = '';
      }, 1000);
    }
  }

  // ======================
  // INICIALIZACIÓN
  // ======================
  init();
});