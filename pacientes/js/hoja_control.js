document.addEventListener('DOMContentLoaded', function() {
    // Elementos del DOM
    const options = document.querySelectorAll('.option');
    const contentSections = document.querySelectorAll('.content-section');
    const formActions = document.getElementById('form-actions');
    const adjuntoActions = document.getElementById('adjunto-actions');
    const dropZone = document.getElementById('drop-zone');
    const fileInput = document.getElementById('file-input');
    const fileInfo = document.getElementById('file-info');
    const volverBtn = document.getElementById('volver-documentos');
    const volverAdjuntoBtn = document.getElementById('volver-documentos-adjunto');
    const editarBtn = document.getElementById('editar-formato');
    const agregarSesionBtn = document.getElementById('agregar-sesion');
    const guardarBtn = document.getElementById('guardar-cambios');
    const deshacerBtn = document.getElementById('deshacer-cambios');
    const imprimirBtn = document.getElementById('imprimir-formulario');
    const form = document.getElementById('control-form');
    const sesionesContainer = document.getElementById('sesiones-container');

    // Variables de estado
    let modoEdicion = false;
    let sesionCounter = 1;

    // Función para bloquear el formulario
    function bloquearFormulario() {
        const inputs = form.querySelectorAll('input, textarea, select');
        inputs.forEach(input => {
            input.setAttribute('disabled', 'disabled');
        });
        
        // Ocultar campos de cancelación inicialmente
        document.querySelectorAll('[id^="quien-cancelo-"]').forEach(el => {
            el.style.display = 'none';
        });
        
        // Deshabilitar botones de acción
        guardarBtn.disabled = true;
        deshacerBtn.disabled = true;
        agregarSesionBtn.style.display = 'none';
        modoEdicion = false;
    }

    // Función para desbloquear el formulario
    function desbloquearFormulario() {
        const inputs = form.querySelectorAll('input, textarea, select');
        inputs.forEach(input => {
            input.removeAttribute('disabled');
        });
        
        // Habilitar botones de acción
        guardarBtn.disabled = false;
        deshacerBtn.disabled = false;
        agregarSesionBtn.style.display = 'block';
        modoEdicion = true;
    }

    // Función para agregar una nueva sesión
    function agregarSesion() {
        sesionCounter++;
        const newSesionId = sesionCounter;
        
        const sesionHTML = `
        <div class="sesion-item" data-sesion-id="${newSesionId}">
            <fieldset>
                <legend>Sesión ${newSesionId}</legend>
                <div class="form-row">
                    <div class="form-group">
                        <label>No. de Sesión:</label>
                        <input type="number" name="sesion_numero[]" value="${newSesionId}">
                    </div>
                    <div class="form-group">
                        <label>Fecha:</label>
                        <input type="date" name="sesion_fecha[]">
                    </div>
                </div>
                
                <div class="form-group">
                    <label>Asistió el paciente:</label>
                    <div class="radio-group">
                        <label><input type="radio" name="sesion_asistio_${newSesionId}" value="si"> Sí</label>
                        <label><input type="radio" name="sesion_asistio_${newSesionId}" value="no"> No</label>
                        <label><input type="radio" name="sesion_asistio_${newSesionId}" value="cancelo"> Canceló</label>
                    </div>
                </div>
                
                <div class="form-group" id="quien-cancelo-${newSesionId}" style="display:none;">
                    <label>¿Quién canceló?</label>
                    <input type="text" name="sesion_quien_cancelo[]">
                </div>
                
                <div class="form-group">
                    <label>Motivo de Cancelación:</label>
                    <input type="text" name="sesion_motivo_cancelacion[]">
                </div>
                
                <div class="form-group">
                    <label>Descripción de la Sesión:</label>
                    <textarea name="sesion_descripcion[]" rows="4"></textarea>
                </div>
                
                <div class="form-group">
                    <label>Observación del Terapeuta:</label>
                    <textarea name="sesion_observacion[]" rows="4"></textarea>
                </div>
            </fieldset>
        </div>
        `;
        
        sesionesContainer.insertAdjacentHTML('beforeend', sesionHTML);
        
        // Configurar evento para mostrar/ocultar campo "quien canceló"
        document.querySelectorAll(`input[name="sesion_asistio_${newSesionId}"]`).forEach(radio => {
            radio.addEventListener('change', function() {
                const quienCanceloDiv = document.getElementById(`quien-cancelo-${newSesionId}`);
                quienCanceloDiv.style.display = this.value === 'cancelo' ? 'block' : 'none';
            });
        });
    }

    // Configurar eventos para radio buttons de asistencia
    function configurarEventosAsistencia() {
        document.querySelectorAll('input[name^="sesion_asistio_"]').forEach(radio => {
            const sesionId = radio.name.split('_')[2];
            radio.addEventListener('change', function() {
                const quienCanceloDiv = document.getElementById(`quien-cancelo-${sesionId}`);
                quienCanceloDiv.style.display = this.value === 'cancelo' ? 'block' : 'none';
            });
        });
    }

    // Cargar datos del paciente (simulado)
    function cargarDatosPaciente() {
        // Simular carga de datos
        document.querySelector('input[name="nombre_paciente"]').value = 'María López';
        document.querySelector('input[name="edad"]').value = '32';
        document.querySelector('input[name="sexo"]').value = 'Femenino';
        document.querySelector('input[name="terapeuta"]').value = 'Dr. Juan Pérez';
        
        // Datos de la primera sesión (simulados)
        document.querySelector('input[name="sesion_numero[]"]').value = '1';
        document.querySelector('input[name="sesion_fecha[]"]').valueAsDate = new Date();
    }

    // Bloquear el formulario al cargar la página
    bloquearFormulario();
    cargarDatosPaciente();
    configurarEventosAsistencia();

    // Cambiar entre formulario y adjunto
    options.forEach(option => {
        option.addEventListener('click', function() {
            // Remover clase active de todas las opciones
            options.forEach(opt => opt.classList.remove('active'));
            // Añadir clase active a la opción seleccionada
            this.classList.add('active');
            
            // Ocultar todas las secciones de contenido
            contentSections.forEach(section => section.classList.remove('active'));
            // Mostrar la sección correspondiente
            const target = this.getAttribute('data-target');
            document.getElementById(target).classList.add('active');
            
            // Mostrar las acciones correspondientes
            if (target === 'formulario') {
                formActions.style.display = 'flex';
                adjuntoActions.style.display = 'none';
            } else {
                formActions.style.display = 'none';
                adjuntoActions.style.display = 'flex';
            }
        });
    });

    // Volver a lista de documentos
    volverBtn.addEventListener('click', function() {
        window.location.href = '../detalle_paciente_activo.html';
    });

    volverAdjuntoBtn.addEventListener('click', function() {
        window.location.href = '../detalle_paciente_activo.html';
    });

    // Editar formulario
    editarBtn.addEventListener('click', function() {
        desbloquearFormulario();
        alert('Ahora puedes editar el formulario y agregar nuevas sesiones');
    });

    // Agregar nueva sesión
    agregarSesionBtn.addEventListener('click', function() {
        if (modoEdicion) {
            agregarSesion();
        }
    });

    // Guardar cambios
    guardarBtn.addEventListener('click', function() {
        if (confirm('¿Estás seguro que deseas guardar todos los cambios?')) {
            // Aquí iría la lógica para guardar en base de datos
            alert('Cambios guardados correctamente');
            bloquearFormulario();
        }
    });

    // Deshacer cambios
    deshacerBtn.addEventListener('click', function() {
        if (confirm('¿Estás seguro que deseas deshacer todos los cambios?')) {
            // Eliminar sesiones adicionales
            const sesiones = document.querySelectorAll('.sesion-item');
            if (sesiones.length > 1) {
                for (let i = 1; i < sesiones.length; i++) {
                    sesiones[i].remove();
                }
            }
            
            // Resetear el formulario
            form.reset();
            
            // Volver a cargar datos
            cargarDatosPaciente();
            
            // Volver a bloquear el formulario
            bloquearFormulario();
        }
    });

    // Imprimir formulario
    imprimirBtn.addEventListener('click', function() {
        window.print();
    });

    // Drag and drop para archivos
    ['dragenter', 'dragover', 'dragleave', 'drop'].forEach(eventName => {
        dropZone.addEventListener(eventName, preventDefaults, false);
    });

    function preventDefaults(e) {
        e.preventDefault();
        e.stopPropagation();
    }

    ['dragenter', 'dragover'].forEach(eventName => {
        dropZone.addEventListener(eventName, highlight, false);
    });

    ['dragleave', 'drop'].forEach(eventName => {
        dropZone.addEventListener(eventName, unhighlight, false);
    });

    function highlight() {
        dropZone.classList.add('highlight');
    }

    function unhighlight() {
        dropZone.classList.remove('highlight');
    }

    dropZone.addEventListener('drop', handleDrop, false);
    fileInput.addEventListener('change', handleFiles, false);

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
            <p><strong>Tipo:</strong> ${file.type || 'Desconocido'}</p>
            <p><strong>Tamaño:</strong> ${(file.size / 1024).toFixed(2)} KB</p>
            <p><strong>Última modificación:</strong> ${new Date(file.lastModified).toLocaleDateString()}</p>
        `;
        
        // Aquí iría la lógica para subir el archivo al servidor
        // uploadFile(file);
    }
});