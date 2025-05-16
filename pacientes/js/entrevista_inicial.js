document.addEventListener("DOMContentLoaded", function () {
  // Elementos del DOM
  const options = document.querySelectorAll(".option");
  const contentSections = document.querySelectorAll(".content-section");
  const formActions = document.getElementById("form-actions");
  const adjuntoActions = document.getElementById("adjunto-actions");
  const dropZone = document.getElementById("drop-zone");
  const fileInput = document.getElementById("file-input");
  const fileInfo = document.getElementById("file-info");
  const volverBtn = document.getElementById("volver-documentos");
  const volverAdjuntoBtn = document.getElementById("volver-documentos-adjunto");
  const editarBtn = document.getElementById("editar-formato");
  const guardarBtn = document.getElementById("guardar-cambios");
  const deshacerBtn = document.getElementById("deshacer-cambios");
  const imprimirBtn = document.getElementById("imprimir-formulario");
  const form = document.getElementById("entrevista-form");
  
  // Elementos del modal
  const modal = document.getElementById('file-modal');
  const fileViewer = document.getElementById('file-viewer');
  const closeModal = document.querySelector('.close-modal');
  const downloadPdfBtn = document.getElementById('download-pdf');

  // Estado para controlar si hay archivo cargado
  let hasUploadedFile = false;
  const fakeFileName = "1.2 Encuesta de Nivel Socioeconómico.pdf";
  const samplePdfUrl = 'https://drive.google.com/file/d/13GVOSS5QLQ2Ma-L5cwVIjB-5SG61tnR0/view?usp=sharing';

  // Función para bloquear el formulario
  function bloquearFormulario() {
    const inputs = form.querySelectorAll("input, textarea, select");
    inputs.forEach((input) => {
      input.setAttribute("disabled", "disabled");
    });
    guardarBtn.disabled = true;
    deshacerBtn.disabled = true;
  }

  // Función para desbloquear el formulario
  function desbloquearFormulario() {
    const inputs = form.querySelectorAll("input, textarea, select");
    inputs.forEach((input) => {
      input.removeAttribute("disabled");
    });
    guardarBtn.disabled = false;
    deshacerBtn.disabled = false;
  }

  // Bloquear el formulario al cargar la página
  bloquearFormulario();

  // Configuración del modal
  closeModal.addEventListener('click', () => modal.style.display = 'none');
  window.addEventListener('click', (e) => e.target === modal && (modal.style.display = 'none'));
  
  downloadPdfBtn.addEventListener('click', downloadFakeFile);

  // Cambiar entre formulario y adjunto
  options.forEach((option) => {
    option.addEventListener("click", function () {
      options.forEach((opt) => opt.classList.remove("active"));
      this.classList.add("active");

      contentSections.forEach((section) => section.classList.remove("active"));
      const target = this.getAttribute("data-target");
      document.getElementById(target).classList.add("active");

      if (target === "formulario") {
        formActions.style.display = "flex";
        adjuntoActions.style.display = "none";
      } else {
        formActions.style.display = "none";
        adjuntoActions.style.display = "flex";
      }
    });
  });

  // Volver a lista de documentos
  volverBtn.addEventListener("click", function () {
    window.location.href = "../detalle_paciente_activo.html";
  });

  volverAdjuntoBtn.addEventListener("click", function () {
    window.location.href = "../detalle_paciente_activo.html";
  });

  // Editar formulario
  editarBtn.addEventListener("click", function () {
    desbloquearFormulario();
    alert("Ahora puedes editar el formulario");
  });

  // Guardar cambios
  guardarBtn.addEventListener('click', function() {
    alert('Cambios guardados correctamente');
    bloquearFormulario();
  });

  // Deshacer cambios
  deshacerBtn.addEventListener('click', function() {
    if (confirm('¿Estás seguro que deseas deshacer todos los cambios?')) {
        form.reset();
        bloquearFormulario();
    }
  });

  // Imprimir formulario
  imprimirBtn.addEventListener("click", function () {
    window.print();
  });

  // Drag and drop para archivos
  ["dragenter", "dragover", "dragleave", "drop"].forEach((eventName) => {
    dropZone.addEventListener(eventName, preventDefaults, false);
  });

  function preventDefaults(e) {
    e.preventDefault();
    e.stopPropagation();
  }

  ["dragenter", "dragover"].forEach((eventName) => {
    dropZone.addEventListener(eventName, highlight, false);
  });

  ["dragleave", "drop"].forEach((eventName) => {
    dropZone.addEventListener(eventName, unhighlight, false);
  });

  function highlight() {
    dropZone.classList.add("highlight");
  }

  function unhighlight() {
    dropZone.classList.remove("highlight");
  }

  dropZone.addEventListener("drop", handleDrop, false);
  fileInput.addEventListener("change", handleFiles, false);

  function handleDrop(e) {
    const dt = e.dataTransfer;
    const files = dt.files;
    handleFiles({ target: { files } });
  }

  function handleFiles(e) {
    const files = e.target.files;
    if (files.length) {
      const file = files[0];
      displayFileInfo(file);
      hasUploadedFile = true;
      updateDropZoneUI();
    }
  }

  function displayFileInfo(file) {
    fileInfo.innerHTML = `
      <p><strong>Nombre:</strong> ${file.name}</p>
      <p><strong>Tipo:</strong> ${file.type || "Desconocido"}</p>
      <p><strong>Tamaño:</strong> ${(file.size / 1024).toFixed(2)} KB</p>
      <p><strong>Última modificación:</strong> ${new Date(file.lastModified).toLocaleDateString()}</p>
    `;
  }

  // Función para simular archivo cargado
  function simulateUploadedFile() {
    const fakeFile = {
      name: fakeFileName,
      type: "application/pdf",
      size: 245678,
      lastModified: Date.now()
    };
    
    displayFileInfo(fakeFile);
    hasUploadedFile = true;
    updateDropZoneUI();
  }

  // Función para actualizar la UI del drop zone
  function updateDropZoneUI() {
    if (hasUploadedFile) {
      dropZone.innerHTML = `
        <div class="file-preview">
          <span class="file-icon">📄</span>
          <span class="file-name">${fakeFileName}</span>
        </div>
        <div class="file-actions">
          <label for="file-input" class="browse-btn">Cambiar archivo</label>
          <button id="remove-file" class="browse-btn danger">Eliminar</button>
        </div>
      `;
      
      // Configurar eventos
      document.querySelector('.file-preview').addEventListener('click', viewFakeFile);
      document.getElementById('remove-file').addEventListener('click', removeUploadedFile);
      fileInput.addEventListener("change", handleFiles, false);
    } else {
      dropZone.innerHTML = `
        <span>Arrastra y suelta tu archivo aquí</span>
        <span>o</span>
        <input type="file" id="file-input" accept=".pdf,.jpg,.png">
        <label for="file-input" class="browse-btn">Seleccionar archivo</label>
      `;
      fileInput.addEventListener("change", handleFiles, false);
    }
  }

  // Función para ver el PDF simulado
  function viewFakeFile(e) {
    e.preventDefault();
    const viewerUrl = `https://docs.google.com/viewer?url=${encodeURIComponent(samplePdfUrl)}&embedded=true`;
    fileViewer.src = viewerUrl;
    modal.style.display = 'block';
  }

  // Función para descargar el PDF simulado
  function downloadFakeFile() {
    const a = document.createElement('a');
    a.href = samplePdfUrl;
    a.download = fakeFileName;
    document.body.appendChild(a);
    a.click();
    document.body.removeChild(a);
  }

  // Función para eliminar el archivo cargado
  function removeUploadedFile() {
    if (confirm('¿Estás seguro que deseas eliminar el archivo cargado?')) {
      fileInfo.innerHTML = '';
      hasUploadedFile = false;
      updateDropZoneUI();
    }
  }

  // Simular archivo cargado al inicio
  setTimeout(simulateUploadedFile, 1000);
});