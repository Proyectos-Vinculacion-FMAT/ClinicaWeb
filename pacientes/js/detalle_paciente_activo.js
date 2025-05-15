document.addEventListener("DOMContentLoaded", function () {
  // =============================================
  // ELEMENTOS DEL DOM
  // =============================================
  const volverBtn = document.getElementById("volver-lista");
  const cerrarBtn = document.getElementById("cerrar-expediente");
  const documentosItems = document.querySelectorAll(".document-item");

  // Elementos para edición de información
  const editarInfoBtn = document.getElementById("editar-info");
  const guardarInfoBtn = document.getElementById("guardar-info");
  const cancelarEdicionBtn = document.getElementById("cancelar-edicion");
  const infoForm = document.getElementById("info-form");
  const inputsInfo = infoForm.querySelectorAll("input, select");
  const formActions = infoForm.querySelector(".form-actions");
  const nombrePacienteHeader = document.getElementById("nombre-paciente");

  // =============================================
  // VARIABLES DE ESTADO
  // =============================================
  let datosOriginales = {};
  let paciente = {
    id: "123",
    nombre: "María",
    apellido: "López",
    celular: "55 1234 5678",
    email: "maria.lopez@example.com",
    servicio: "psicodiagnostico",
    terapeutaId: "1",
    fechaRegistro: "2024-03-15",
    proximaSesion: "2024-04-25T16:00",
    estado: "activo",
  };

  // =============================================
  // FUNCIONES DE MANEJO DE EVENTOS
  // =============================================

  /**
   * Maneja el evento de volver a la lista de pacientes
   */
  const handleVolver = () => {
    if (confirm("¿Estás seguro que deseas volver a la lista de pacientes?")) {
      window.location.href = "pacientes.html";
    }
  };

  /**
   * Maneja el evento de archivar el expediente (simulado)
   */
  const handleArchivar = () => {
    if (
      confirm(
        '¿Estás seguro que deseas archivar este expediente? El paciente pasará a estado "Archivado"'
      )
    ) {
      // Simulamos el archivado cambiando el estado
      paciente.estado = "archivado";

      // Mostramos notificación simulada
      mostrarNotificacion(
        "success",
        "Expediente archivado correctamente (simulado)"
      );

      // Redirigimos después de un breve retraso
      setTimeout(() => {
        window.location.href = "pacientes.html";
      }, 1500);
    }
  };

  /**
   * Maneja el clic en los documentos
   */
  const handleDocumentoClick = (e, item) => {
    e.preventDefault();
    const docName = item.textContent.trim();

    if (docName.includes("Entrevista inicial")) {
      window.location.href = "documentos/entrevista_inicial.html";
      return;
    }

    if (docName.includes("Control de sesión")) {
      window.location.href = "documentos/hoja_control.html";
      return;
    }

    // Para otros documentos mostramos un alert
    mostrarNotificacion("info", `Documento ${docName} seleccionado (simulado)`);
  };

  /**
   * Maneja la edición de la información del paciente
   */
  const handleEditarInfo = () => {
    // Guardar datos originales por si cancela
    datosOriginales = {};
    inputsInfo.forEach((input) => {
      datosOriginales[input.name] = input.value;
    });

    // Habilitar campos
    inputsInfo.forEach((input) => {
      input.disabled = false;
    });

    // Mostrar botones de acción
    formActions.style.display = "flex";

    // Ocultar botón de editar
    editarInfoBtn.style.display = "none";

    // Enfocar el primer campo
    inputsInfo[0].focus();
  };

  /**
   * Maneja el guardado de la información editada (simulado)
   */
  const handleGuardarInfo = () => {
    if (confirm("¿Guardar los cambios realizados?")) {
      // Validación básica
      if (!validarFormulario()) {
        mostrarNotificacion(
          "error",
          "Por favor complete todos los campos requeridos"
        );
        return;
      }

      // Actualizamos el objeto paciente con los nuevos valores
      inputsInfo.forEach((input) => {
        if (input.name === "celular") paciente.celular = input.value;
        if (input.name === "email") paciente.email = input.value;
        if (input.name === "servicio") paciente.servicio = input.value;
        if (input.name === "terapeuta") paciente.terapeutaId = input.value;
        if (input.name === "fecha_registro")
          paciente.fechaRegistro = input.value;
        if (input.name === "proxima_sesion")
          paciente.proximaSesion = input.value;
      });

      // Simulamos el guardado exitoso
      mostrarNotificacion(
        "success",
        "Cambios guardados correctamente (simulado)"
      );

      // Deshabilitar campos
      inputsInfo.forEach((input) => {
        input.disabled = true;
      });

      // Ocultar botones de acción
      formActions.style.display = "none";

      // Mostrar botón de editar
      editarInfoBtn.style.display = "block";

      // Actualizar nombre en el header si cambió
      actualizarNombreHeader();
    }
  };

  /**
   * Maneja la cancelación de la edición
   */
  const handleCancelarEdicion = () => {
    if (confirm("¿Descartar los cambios realizados?")) {
      // Restaurar valores originales
      for (const [name, value] of Object.entries(datosOriginales)) {
        const input = infoForm.querySelector(`[name="${name}"]`);
        if (input) input.value = value;
      }

      // Deshabilitar campos
      inputsInfo.forEach((input) => {
        input.disabled = true;
      });

      // Ocultar botones de acción
      formActions.style.display = "none";

      // Mostrar botón de editar
      editarInfoBtn.style.display = "block";
    }
  };

  // =============================================
  // FUNCIONES AUXILIARES
  // =============================================

  /**
   * Muestra una notificación estilizada (simulada con alert)
   */
  const mostrarNotificacion = (type, message) => {
    alert(`${type.toUpperCase()}: ${message}`);
  };

  /**
   * Valida el formulario de información básica
   */
  const validarFormulario = () => {
    let valido = true;

    inputsInfo.forEach((input) => {
      if (input.required && !input.value.trim()) {
        input.style.borderColor = "var(--color-peligro)";
        valido = false;
      } else {
        input.style.borderColor = "";
      }
    });

    return valido;
  };

  /**
   * Marca documentos completados con un indicador visual
   */
  const marcarDocumentosCompletados = () => {
    // Documentos marcados como completados (simulado)
    const docsCompletados = ["Entrevista inicial"];
    const docsPendientes = ["Encuesta socioeconómica", "Contrato de atención", 
        "Consentimiento", "Derechos del cliente", "Control de sesión",
        "Evaluación de servicio", "Reporte Final", ]; // Ejemplo

    documentosItems.forEach((item) => {
      const docName = item.textContent.replace(/^\d+\.\s*/, "").trim();

      if (docsCompletados.includes(docName)) {
        item.classList.add("documento-completado");
        item.innerHTML += ' <span class="badge-completo">✓ Completado</span>';
      } else if (docsPendientes.includes(docName)) {
        item.classList.add("documento-pendiente");
        item.innerHTML += ' <span class="badge-pendiente"> ---Pendiente---</span>';
      }
    });
  };

  /**
   * Actualiza el nombre en el encabezado
   */
  const actualizarNombreHeader = () => {
    // En una implementación real, esto vendría del formulario
    nombrePacienteHeader.textContent = `${paciente.nombre} ${paciente.apellido}`;
  };

  /**
   * Carga los datos del paciente en el formulario
   */
  const cargarDatosPaciente = () => {
    // Simulamos la carga de datos desde el objeto paciente
    document.querySelector('[name="celular"]').value = paciente.celular || "";
    document.querySelector('[name="email"]').value = paciente.email || "";
    document.querySelector('[name="servicio"]').value =
      paciente.servicio || "psicodiagnostico";
    document.querySelector('[name="terapeuta"]').value =
      paciente.terapeutaId || "1";
    document.querySelector('[name="fecha_registro"]').value =
      paciente.fechaRegistro || "";
    document.querySelector('[name="proxima_sesion"]').value =
      paciente.proximaSesion || "";

    // Actualizar nombre en el encabezado
    actualizarNombreHeader();
  };

  // =============================================
  // ASIGNACIÓN DE EVENTOS
  // =============================================
  volverBtn.addEventListener("click", handleVolver);
  cerrarBtn.addEventListener("click", handleArchivar);

  documentosItems.forEach((item) => {
    item.addEventListener("click", (e) => handleDocumentoClick(e, item));
  });

  // Eventos para edición de información
  editarInfoBtn.addEventListener("click", handleEditarInfo);
  guardarInfoBtn.addEventListener("click", handleGuardarInfo);
  cancelarEdicionBtn.addEventListener("click", handleCancelarEdicion);

  // Validación en tiempo real
  inputsInfo.forEach((input) => {
    input.addEventListener("input", () => {
      if (input.required && !input.value.trim()) {
        input.style.borderColor = "var(--color-peligro)";
      } else {
        input.style.borderColor = "";
      }
    });
  });

  // =============================================
  // INICIALIZACIONES
  // =============================================
  // Marcar documentos completados
  marcarDocumentosCompletados();

  // Cargar datos iniciales del paciente
  cargarDatosPaciente();
});
