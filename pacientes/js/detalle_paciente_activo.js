document.addEventListener('DOMContentLoaded', function() {
  // =============================================
  // ELEMENTOS DEL DOM
  // =============================================
  const volverBtn = document.getElementById('volver-lista');
  const cerrarBtn = document.getElementById('cerrar-expediente');
  const documentosItems = document.querySelectorAll('.document-item');
  
  // =============================================
  // FUNCIONES DE MANEJO DE EVENTOS
  // =============================================
  
  /**
   * Maneja el evento de volver a la lista de pacientes
   */
  const handleVolver = () => {
      if(confirm('¿Estás seguro que deseas volver a la lista de pacientes?')) {
          window.location.href = '../pacientes.html';
      }
  };
  
  /**
   * Maneja el evento de archivar el expediente
   */
  const handleArchivar = () => {
      if(confirm('¿Estás seguro que deseas archivar este expediente? El paciente pasará a estado "Archivado"')) {
          // Aquí iría la llamada a la API para cambiar el estado
          fetch('/api/pacientes/archivar', {
              method: 'POST',
              headers: {
                  'Content-Type': 'application/json',
              },
              body: JSON.stringify({ idPaciente: obtenerIdPaciente() })
          })
          .then(response => response.json())
          .then(data => {
              if(data.success) {
                  mostrarNotificacion('success', 'Expediente archivado correctamente');
                  setTimeout(() => {
                      window.location.href = '../pacientes.html';
                  }, 1500);
              } else {
                  mostrarNotificacion('error', 'Error al archivar expediente');
              }
          })
          .catch(error => {
              console.error('Error:', error);
              mostrarNotificacion('error', 'Error en la conexión');
          });
      }
  };
  
  /**
   * Maneja el clic en los documentos
   * @param {Event} e - Evento de clic
   * @param {HTMLElement} item - Elemento del documento clickeado
   */
  const handleDocumentoClick = (e, item) => {
      e.preventDefault();
      const docName = item.textContent.trim();
      
      // Lógica especial para entrevista inicial
      if(docName.includes('Entrevista inicial')) {
          window.location.href = 'documentos/entrevista_inicial.html';
          return;
      }
      
      // Para otros documentos (ejemplo temporal)
      mostrarModalDocumento(docName);
  };
  
  // =============================================
  // FUNCIONES AUXILIARES
  // =============================================
  
  /**
   * Muestra una notificación estilizada
   * @param {string} type - Tipo de notificación (success/error/info)
   * @param {string} message - Mensaje a mostrar
   */
  const mostrarNotificacion = (type, message) => {
      // Implementación real usaría Toast o similar
      alert(`${type.toUpperCase()}: ${message}`);
  };
  
  /**
   * Muestra un modal con el documento seleccionado
   * @param {string} docName - Nombre del documento
   */
  const mostrarModalDocumento = (docName) => {
      // Implementación real abriría un modal o redirigiría
      console.log(`Abriendo documento: ${docName}`);
      alert(`Preparando documento: ${docName}`);
  };
  
  /**
   * Obtiene el ID del paciente actual (simulado)
   */
  const obtenerIdPaciente = () => {
      // En una implementación real, esto vendría de la URL o estado
      return new URLSearchParams(window.location.search).get('id') || '123';
  };
  
  // =============================================
  // ASIGNACIÓN DE EVENTOS
  // =============================================
  volverBtn.addEventListener('click', handleVolver);
  cerrarBtn.addEventListener('click', handleArchivar);
  
  documentosItems.forEach(item => {
      item.addEventListener('click', (e) => handleDocumentoClick(e, item));
  });
  
  // =============================================
  // INICIALIZACIONES ADICIONALES
  // =============================================
  // Marcar documentos completados (ejemplo)
  marcarDocumentosCompletados();
  
  /**
   * Ejemplo: Marcar documentos completados
   */
  function marcarDocumentosCompletados() {
      // Esto normalmente vendría de una API
      const docsCompletados = ['Entrevista inicial', 'Control de sesión'];
      
      documentosItems.forEach(item => {
          const docName = item.textContent.replace(/^\d+\.\s*/, '').trim();
          if(docsCompletados.includes(docName)) {
              item.classList.add('documento-completado');
              item.innerHTML += ' <span class="badge-completo">✓</span>';
          }
      });
  }
});