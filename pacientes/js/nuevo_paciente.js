// Importar todos los templates y validadores
import { derechosClienteTemplate, derechosClienteValidator } from './templates/derechos-cliente-template.js';
import { consentimientoTemplate, consentimientoValidator } from './templates/consentimiento-template.js';
import { contratoTemplate, contratoValidator } from './templates/contrato-template.js';
import { encuestaNseTemplate, encuestaNseValidator } from './templates/encuesta-nse-template.js';
import { formatoEntrevistaTemplate, formatoEntrevistaValidator } from './templates/formato-entrevista-template.js';

// Objeto con todos los templates
const documentTemplates = {
    'derechos': derechosClienteTemplate,
    'consentimiento': consentimientoTemplate,
    'contrato': contratoTemplate,
    'encuesta-nse': encuestaNseTemplate,
    'formato-entrevista': formatoEntrevistaTemplate
};

// Objeto con todos los validadores
const formValidators = {
    'derechos': derechosClienteValidator,
    'consentimiento': consentimientoValidator,
    'contrato': contratoValidator,
    'encuesta-nse': encuestaNseValidator,
    'formato-entrevista': formatoEntrevistaValidator
};

document.addEventListener("DOMContentLoaded", function () {
    // Elementos del DOM
    const documentList = document.querySelectorAll(".document-list li");
    const documentViewer = document.getElementById("document-viewer");
    const cancelBtn = document.getElementById("cancel-btn");
    const saveBtn = document.getElementById("save-btn");
    const printBtn = document.getElementById("print-btn");
    const attachBtn = document.getElementById("attach-btn");
    const finishBtn = document.getElementById("finish-btn");
    const attachModal = document.getElementById("attach-modal");
    const closeModal = document.querySelector(".close");
    const uploadBtn = document.getElementById("upload-btn");
    const fileInput = document.getElementById("file-input");
    const currentDocName = document.getElementById("current-document-name");
    const statusItems = document.querySelectorAll("#document-status li");

    // Estado de la aplicación
    const appState = {
        currentDocument: null,
        formData: {},
        signedDocuments: {
            "formato-entrevista": false,
            "contrato": false,
            "consentimiento": false,
            "derechos": false
        },
        completedDocuments: {
            "formato-entrevista": false,
            "encuesta-nse": false,
            "contrato": false,
            "consentimiento": false,
            "derechos": false
        }
    };

    // Cargar contenido del documento seleccionado
    documentList.forEach((item) => {
        item.addEventListener("click", function () {
            // Remover clase active de todos los items
            documentList.forEach((i) => i.classList.remove("active"));

            // Añadir clase active al item seleccionado
            this.classList.add("active");

            // Obtener el tipo de documento
            appState.currentDocument = this.getAttribute("data-document");

            // Cargar el contenido correspondiente
            loadDocument(appState.currentDocument);

            // Actualizar botón de adjuntar
            attachBtn.disabled = !(appState.currentDocument in appState.signedDocuments);

            // Mostrar nombre del documento en el modal de adjuntar
            currentDocName.textContent = this.textContent;
        });
    });

    // Función para cargar un documento
    function loadDocument(docId) {
        if (documentTemplates[docId]) {
            documentViewer.innerHTML = documentTemplates[docId];

            // Si ya hay datos guardados para este documento, rellenar el formulario
            if (appState.formData[docId]) {
                populateForm(docId, appState.formData[docId]);
            }

            // Agregar event listeners para validación en tiempo real
            addFormValidation(docId);
        } else {
            documentViewer.innerHTML = "<p>Documento no disponible.</p>";
        }
    }

    // Función para rellenar un formulario con datos guardados
    function populateForm(docId, data) {
        const form = documentViewer.querySelector("form");
        if (!form) return;

        for (const [key, value] of Object.entries(data)) {
            const input = form.querySelector(`[name="${key}"]`);
            if (input) {
                if (input.type === "checkbox" || input.type === "radio") {
                    input.checked = value;
                } else {
                    input.value = value;
                }
            }
        }
    }

    // Función para agregar validación en tiempo real
    function addFormValidation(docId) {
        const form = documentViewer.querySelector("form");
        if (!form) return;

        form.addEventListener("input", function (e) {
            const input = e.target;
            if (input.required && !input.value) {
                input.classList.add("invalid");
            } else {
                input.classList.remove("invalid");
            }
        });
    }

    // Manejar botón Cancelar
    cancelBtn.addEventListener("click", function () {
        // Cerrar el modal de adjuntar archivo si está abierto
        if (attachModal.style.display === "block") {
            attachModal.style.display = "none";
        }

        // Mostrar diálogo de confirmación
        const confirmCancel = confirm(
            "¿Está seguro que desea cancelar la creación de este paciente?\nTodos los datos no guardados se perderán."
        );

        if (confirmCancel) {
            // Redirigir a la página de pacientes
            window.location.href = "pacientes.html";
        }
    });

    // Manejar botón Guardar
    saveBtn.addEventListener("click", function () {
        if (!appState.currentDocument) {
            alert("Por favor, seleccione un documento primero.");
            return;
        }

        const form = documentViewer.querySelector("form");
        if (!form) {
            alert("Este documento no tiene formulario para guardar.");
            return;
        }

        const formData = new FormData(form);
        const errors = formValidators[appState.currentDocument]?.(formData) || [];

        if (errors.length > 0) {
            alert("Errores en el formulario:\n- " + errors.join("\n- "));
            return;
        }

        // Guardar datos del formulario
        const formDataObj = {};
        formData.forEach((value, key) => (formDataObj[key] = value));
        appState.formData[appState.currentDocument] = formDataObj;
        appState.completedDocuments[appState.currentDocument] = true;

        // Actualizar estado en el panel
        updateDocumentStatus(appState.currentDocument, true);

        alert("Documento guardado correctamente.");
    });

    // Función para actualizar el estado de un documento
    function updateDocumentStatus(docId, completed) {
        const statusItem = document.querySelector(
            `#document-status li[data-status="${docId}"] .status-badge`
        );
        if (statusItem) {
            statusItem.textContent = completed ? "Completado" : "Pendiente";
            statusItem.classList.remove("pending", "completed");
            statusItem.classList.add(completed ? "completed" : "pending");
        }
    }

    // Manejar botón Imprimir
    printBtn.addEventListener("click", function () {
        if (!appState.currentDocument) {
            alert("Por favor, seleccione un documento primero.");
            return;
        }

        // Crear un div oculto para la impresión
        const printContent = document.createElement("div");
        printContent.id = "print-container";
        printContent.style.position = "fixed";
        printContent.style.left = "-9999px";
        printContent.style.top = "0";
        printContent.innerHTML = `
            <style>
                @media print {
                    body * {
                        visibility: hidden;
                    }
                    #print-content, #print-content * {
                        visibility: visible;
                    }
                    #print-content {
                        position: absolute;
                        left: 0;
                        top: 0;
                        width: 100%;
                        margin: 0;
                        padding: 20px;
                        font-size: 14px;
                    }
                    .no-print {
                        display: none !important;
                    }
                    .form-section {
                        margin-bottom: 10px;
                    }
                    input[type="text"], 
                    input[type="date"],
                    input[type="email"],
                    input[type="tel"],
                    textarea {
                        border: none;
                        border-bottom: 1px solid #000;
                        background: transparent;
                        width: 100%;
                        padding: 0;
                        margin: 0;
                    }
                    .radio-group, .checkbox-group {
                        margin: 5px 0;
                    }
                    .signature-field {
                        margin-top: 50px;
                    }
                }
            </style>
            <div id="print-content">
                ${documentViewer.innerHTML}
            </div>
        `;

        document.body.appendChild(printContent);

        // Esperar un momento para que el contenido se cargue antes de imprimir
        setTimeout(() => {
            window.print();

            // Eliminar el contenido de impresión después de imprimir
            setTimeout(() => {
                document.body.removeChild(printContent);
            }, 1000);
        }, 100);
    });

    // Manejar botón Adjuntar
    attachBtn.addEventListener("click", function () {
        if (!appState.currentDocument) {
            alert("Por favor, seleccione un documento primero.");
            return;
        }
        attachModal.style.display = "block";
    });

    // Manejar botón Finalizar
    finishBtn.addEventListener("click", function () {
        // Verificar que todos los documentos estén completos
        const allCompleted = Object.values(appState.completedDocuments).every(
            (completed) => completed
        );

        if (!allCompleted) {
            const incomplete = Object.entries(appState.completedDocuments)
                .filter(([_, completed]) => !completed)
                .map(([docId]) => {
                    const docName = document.querySelector(
                        `.document-list li[data-document="${docId}"]`
                    ).textContent;
                    return docName;
                });

            alert(
                `Por favor, complete los siguientes documentos antes de finalizar:\n- ${incomplete.join(
                    "\n- "
                )}`
            );
            return;
        }

        // Verificar que los documentos que requieren firma estén adjuntados
        const allSigned = Object.entries(appState.signedDocuments).every(
            ([docId, signed]) => !signed || appState.signedDocuments[docId]
        );

        if (!allSigned) {
            alert(
                "Por favor, adjunte todos los documentos que requieren firma antes de finalizar."
            );
            return;
        }

        if (
            confirm(
                "¿Está seguro que desea finalizar el proceso de creación de este paciente?"
            )
        ) {
            alert("Paciente creado exitosamente.");
            // Aquí iría la lógica para enviar todos los datos al servidor
            window.location.href = "pacientes.html";
        }
    });

    // Cerrar modal
    closeModal.addEventListener("click", function () {
        attachModal.style.display = "none";
    });

    // Cerrar modal al hacer clic fuera
    window.addEventListener("click", function (event) {
        if (event.target === attachModal) {
            attachModal.style.display = "none";
        }
    });

    // Manejar subida de archivo
    uploadBtn.addEventListener("click", function () {
        const file = fileInput.files[0];
        if (!file) {
            alert("Por favor, seleccione un archivo primero.");
            return;
        }

        // Simular subida exitosa
        appState.signedDocuments[appState.currentDocument] = true;

        // Actualizar estado
        const statusItem = document.querySelector(
            `#document-status li[data-status="${appState.currentDocument}"] .status-badge`
        );
        if (statusItem) {
            statusItem.textContent = "Firmado";
            statusItem.classList.remove("pending", "completed");
            statusItem.classList.add("completed");
        }

        alert(`Archivo "${file.name}" adjuntado correctamente.`);
        attachModal.style.display = "none";
        fileInput.value = "";
    });

    // Inicializar el primer documento si existe
    if (documentList.length > 0) {
        documentList[0].click();
    }
});