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

  // Función para bloquear el formulario
  function bloquearFormulario() {
    const inputs = form.querySelectorAll("input, textarea, select");
    inputs.forEach((input) => {
      input.setAttribute("disabled", "disabled");
    });
    // Deshabilitar botones de guardar y deshacer inicialmente
    guardarBtn.disabled = true;
    deshacerBtn.disabled = true;
  }

  // Función para desbloquear el formulario
  function desbloquearFormulario() {
    const inputs = form.querySelectorAll("input, textarea, select");
    inputs.forEach((input) => {
      input.removeAttribute("disabled");
    });
    // Habilitar botones de guardar y deshacer
    guardarBtn.disabled = false;
    deshacerBtn.disabled = false;
  }

  // Bloquear el formulario al cargar la página
  bloquearFormulario();

  // Cambiar entre formulario y adjunto
  options.forEach((option) => {
    option.addEventListener("click", function () {
      // Remover clase active de todas las opciones
      options.forEach((opt) => opt.classList.remove("active"));
      // Añadir clase active a la opción seleccionada
      this.classList.add("active");

      // Ocultar todas las secciones de contenido
      contentSections.forEach((section) => section.classList.remove("active"));
      // Mostrar la sección correspondiente
      const target = this.getAttribute("data-target");
      document.getElementById(target).classList.add("active");

      // Mostrar las acciones correspondientes
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
    // Aquí iría la lógica para guardar en base de datos
    alert('Cambios guardados correctamente');
    // Volver a bloquear el formulario después de guardar
    bloquearFormulario();
});

  // Deshacer cambios
  deshacerBtn.addEventListener('click', function() {
    if (confirm('¿Estás seguro que deseas deshacer todos los cambios?')) {
        form.reset();
        // Volver a bloquear el formulario después de deshacer
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
    }
  }

  function displayFileInfo(file) {
    fileInfo.innerHTML = `
        <p><strong>Nombre:</strong> ${file.name}</p>
        <p><strong>Tipo:</strong> ${file.type || "Desconocido"}</p>
        <p><strong>Tamaño:</strong> ${(file.size / 1024).toFixed(2)} KB</p>
        <p><strong>Última modificación:</strong> ${new Date(
          file.lastModified
        ).toLocaleDateString()}</p>
      `;

    // Aquí iría la lógica para subir el archivo al servidor
    // uploadFile(file);
  }
});
