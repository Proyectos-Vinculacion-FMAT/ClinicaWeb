document.addEventListener('DOMContentLoaded', function() {
  // Elementos del DOM
  const btnNuevoDocumento = document.getElementById('btnNuevoDocumento');
  const fileUpload = document.getElementById('fileUpload');
  const cambiarEstado = document.getElementById('cambiarEstado');
  const btnEditarPaciente = document.getElementById('btnEditarPaciente');
  const modalEditar = document.getElementById('modalEditarPaciente');
  const closeModal = document.querySelectorAll('.close-modal');
  const formEditarPaciente = document.getElementById('formEditarPaciente');
  const checklistItems = document.querySelectorAll('.documentos-list input[type="checkbox"]');
  const documentoView = document.getElementById('documentoView');
  const minimizarDoc = document.getElementById('minimizarDoc');
  
  // Obtener parámetros de la URL
  const urlParams = new URLSearchParams(window.location.search);
  const pacienteNombre = urlParams.get('nombre') || 'María López';
  
  // Datos de ejemplo (en una app real vendrían de una API)
  const pacientes = {
    'María López': {
      email: "maria.lopez@example.com",
      telefono: "555-1234-567",
      servicio: "Psicodiagnóstico",
      terapeuta: "Ana García",
      fechaRegistro: "15/03/2024",
      estado: "activo",
      sesiones: {
        concluidas: 4,
        restantes: 6,
        faltasJustificadas: 0,
        faltasInjustificadas: 1,
        total: 10
      },
      notas: [
        "Paciente muestra buena respuesta al tratamiento inicial.",
        "Requiere seguimiento semanal."
      ],
      documentos: [
        { id: "doc1", nombre: "Entrevista inicial", estado: "completado" },
        { id: "doc2", nombre: "Historial médico", estado: "pendiente" },
        { id: "doc3", nombre: "Consentimiento informado", estado: "completado" }
      ]
    },
    'Juan Pérez': {
      email: "juan.perez@example.com",
      telefono: "555-9876-543",
      servicio: "Terapia Individual",
      terapeuta: "Carlos Méndez",
      fechaRegistro: "10/02/2024",
      estado: "activo",
      sesiones: {
        concluidas: 2,
        restantes: 8,
        faltasJustificadas: 1,
        faltasInjustificadas: 0,
        total: 10
      },
      notas: [
        "Paciente con ansiedad generalizada.",
        "Respondiendo bien a las técnicas de relajación."
      ],
      documentos: [
        { id: "doc1", nombre: "Entrevista inicial", estado: "completado" },
        { id: "doc2", nombre: "Historial médico", estado: "completado" },
        { id: "doc3", nombre: "Consentimiento informado", estado: "pendiente" }
      ]
    }
  };
  
  // Cargar datos del paciente
  const paciente = pacientes[pacienteNombre] || pacientes['María López'];
  cargarDatosPaciente(paciente);
  
  // Función para cargar los datos del paciente en la interfaz
  function cargarDatosPaciente(paciente) {
    // Información básica
    document.getElementById('paciente-nombre').textContent = pacienteNombre;
    document.getElementById('paciente-email').textContent = paciente.email;
    document.getElementById('paciente-telefono').textContent = paciente.telefono;
    document.getElementById('paciente-servicio').textContent = paciente.servicio;
    document.getElementById('paciente-terapeuta').textContent = paciente.terapeuta;
    document.getElementById('paciente-fecha').textContent = paciente.fechaRegistro;
    
    // Estado
    cambiarEstado.value = paciente.estado;
    actualizarEstadoVisual(paciente.estado);
    
    // Sesiones
    const sesiones = paciente.sesiones;
    document.querySelector('.sesiones-table tr:nth-child(1) td:nth-child(2)').textContent = sesiones.concluidas;
    document.querySelector('.sesiones-table tr:nth-child(2) td:nth-child(2)').textContent = sesiones.restantes;
    document.querySelector('.sesiones-table tr:nth-child(3) td:nth-child(2)').textContent = sesiones.faltasJustificadas;
    document.querySelector('.sesiones-table tr:nth-child(4) td:nth-child(2)').textContent = sesiones.faltasInjustificadas;
    document.querySelector('.sesiones-table tr:nth-child(5) td:nth-child(2)').textContent = sesiones.total;
    
    // Notas
    const notasContainer = document.getElementById('notasPaciente');
    notasContainer.innerHTML = '';
    paciente.notas.forEach(nota => {
      const p = document.createElement('p');
      p.textContent = nota;
      notasContainer.appendChild(p);
    });
    
    // Documentos
    checklistItems.forEach(item => {
      const docId = item.id;
      const documento = paciente.documentos.find(doc => doc.id === docId);
      if (documento) {
        const statusElement = item.nextElementSibling.nextElementSibling;
        statusElement.textContent = documento.estado === "completado" ? "✔ Completado" : "Pendiente";
        statusElement.className = documento.estado === "completado" ? "documento-status completado" : "documento-status";
      }
    });
  }
  
  // Función para actualizar el estado visual
  function actualizarEstadoVisual(estado) {
    const estadoSelect = document.getElementById('cambiarEstado');
    estadoSelect.className = `estado-select ${estado}`;
  }
  
  // Función para mostrar documento
  function mostrarDocumento(docId, docNombre) {
    // Ocultar lista de documentos
    document.querySelector('.documentos-list').style.display = 'none';
    
    // Mostrar vista de documento
    documentoView.style.display = 'block';
    document.getElementById('documentoTitulo').textContent = docNombre;
    
    // Simular contenido del documento (en una app real se cargaría el documento real)
    const contenido = `
      <h4>Contenido del documento ${docNombre}</h4>
      <p>Este es un ejemplo del contenido que se mostraría para el documento seleccionado.</p>
      <p>En una aplicación real, aquí se mostraría el PDF, Word o imagen subido.</p>
    `;
    document.getElementById('documentoContenido').innerHTML = contenido;
    
    // Desmarcar otros checkboxes
    checklistItems.forEach(item => {
      if (item.dataset.doc !== docId) {
        item.checked = false;
      }
    });
  }
  
  // Evento para nuevo documento
  btnNuevoDocumento.addEventListener('click', function() {
    fileUpload.click();
  });
  
  // Evento para subir archivo
  fileUpload.addEventListener('change', function(e) {
    if (e.target.files.length > 0) {
      const file = e.target.files[0];
      const fileName = file.name;
      const fileType = file.type;
      
      // Validar tipo de archivo
      const validTypes = ['application/pdf', 'application/msword', 
                         'application/vnd.openxmlformats-officedocument.wordprocessingml.document', 
                         'text/plain', 'image/jpeg', 'image/png'];
      
      if (!validTypes.includes(fileType)) {
        alert("Por favor, sube un archivo PDF, Word, texto o imagen");
        return;
      }
      
      // Aquí iría la lógica para subir el archivo al servidor
      console.log("Subiendo archivo:", fileName);
      
      // Simular subida exitosa
      setTimeout(() => {
        alert(`Documento "${fileName}" subido correctamente`);
        // Actualizar lista de documentos
        // En una app real, esto vendría del servidor
        const nuevoId = `doc${paciente.documentos.length + 1}`;
        paciente.documentos.push({
          id: nuevoId,
          nombre: fileName,
          estado: "pendiente"
        });
        
        // Actualizar la lista en el DOM
        const documentosList = document.querySelector('.documentos-list');
        const newItem = document.createElement('li');
        newItem.innerHTML = `
          <input type="checkbox" id="${nuevoId}" data-doc="${fileName.replace(/\.[^/.]+$/, "")}">
          <label for="${nuevoId}" class="documento-titulo">${fileName}</label>
          <span class="documento-status">Pendiente</span>
        `;
        documentosList.appendChild(newItem);
        
        // Agregar el evento al nuevo checkbox
        document.getElementById(nuevoId).addEventListener('change', function() {
          if (this.checked) {
            mostrarDocumento(this.dataset.doc, fileName);
          }
        });
      }, 1000);
    }
  });
  
  // Evento para cambiar estado
  cambiarEstado.addEventListener('change', function() {
    const nuevoEstado = this.value;
    
    if (confirm(`¿Cambiar estado del paciente a ${nuevoEstado}?`)) {
      // Aquí iría la lógica para actualizar el estado en el servidor
      paciente.estado = nuevoEstado;
      actualizarEstadoVisual(nuevoEstado);
      alert(`Estado cambiado a ${nuevoEstado}`);
    } else {
      // Revertir al estado anterior
      this.value = paciente.estado;
    }
  });
  
  // Evento para editar paciente
  btnEditarPaciente.addEventListener('click', function() {
    // Cargar datos en el formulario
    document.getElementById('edit-nombre').value = pacienteNombre;
    document.getElementById('edit-email').value = paciente.email;
    document.getElementById('edit-telefono').value = paciente.telefono;
    document.getElementById('edit-servicio').value = paciente.servicio;
    document.getElementById('edit-terapeuta').value = paciente.terapeuta;
    
    // Mostrar modal
    modalEditar.style.display = "block";
  });
  
  // Cerrar modal
  closeModal.forEach(btn => {
    btn.addEventListener('click', function() {
      modalEditar.style.display = "none";
    });
  });
  
  // Cerrar modal al hacer clic fuera
  window.addEventListener('click', function(e) {
    if (e.target === modalEditar) {
      modalEditar.style.display = "none";
    }
  });
  
  // Enviar formulario de edición
  formEditarPaciente.addEventListener('submit', function(e) {
    e.preventDefault();
    
    // Obtener datos del formulario
    const nuevoNombre = document.getElementById('edit-nombre').value;
    const nuevoEmail = document.getElementById('edit-email').value;
    const nuevoTelefono = document.getElementById('edit-telefono').value;
    const nuevoServicio = document.getElementById('edit-servicio').value;
    const nuevoTerapeuta = document.getElementById('edit-terapeuta').value;
    
    // Actualizar datos del paciente (en una app real se enviarían al servidor)
    paciente.email = nuevoEmail;
    paciente.telefono = nuevoTelefono;
    paciente.servicio = nuevoServicio;
    paciente.terapeuta = nuevoTerapeuta;
    
    // Si cambió el nombre, actualizar URL
    if (nuevoNombre !== pacienteNombre) {
      // En una app real, esto requeriría más lógica
      alert("El cambio de nombre requeriría actualizar la URL y posiblemente otros datos");
    }
    
    // Actualizar vista
    cargarDatosPaciente(paciente);
    
    // Cerrar modal
    modalEditar.style.display = "none";
    
    alert("Cambios guardados correctamente");
  });
  
  // Eventos para los documentos
  checklistItems.forEach(item => {
    item.addEventListener('change', function() {
      const docId = this.dataset.doc;
      const docNombre = this.nextElementSibling.textContent;
      
      if (this.checked) {
        // Mostrar vista previa del documento
        mostrarDocumento(docId, docNombre);
      }
    });
  });
  
  // Evento para minimizar documento
  minimizarDoc.addEventListener('click', function() {
    documentoView.style.display = 'none';
    document.querySelector('.documentos-list').style.display = 'block';
    
    // Desmarcar todos los checkboxes
    checklistItems.forEach(item => {
      item.checked = false;
    });
  });
  
  // Inicialmente ocultar la vista de documento
  documentoView.style.display = 'none';
});