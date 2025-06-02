# Descripciones Procedurales del Sistema

## 1.Llenado de ficha de reporte de sesión 
*Responsable:* Terapeuta  

### Happy Path
   1. El terapeuta accede a su lista de pacientes.
   2. Selecciona al paciente de su lista de pacientes.
   3. Navega al expediente del paciente.
   4. Selecciona la opción “Reporte de sesión” en el apartado de Documentos.
   5. Se presenta un formulario con campos como:
      - Nombre del paciente y Terapeuta asignado
      - Número y fecha de sesión  
      - Asistencia o inacistencia(con o sin justificación)  
      - Descripción de la sesión  
      - Observaciones del terapeuta
   6. Llena todos los campos requeridos.
   7. El sistema valida los datos.
   8. Guarda el reporte asociado al expediente.
   9. Muestra confirmación del registro exitoso.

### Excepciones
   - *Campos vacíos:* El sistema impide guardar si hay campos vacios.
   - *Formato inválido:* Se muestra un mensaje de error.  
   - *Error de red:* Se notifica el fallo y se sugiere reintentar.



## 2. Imprimir documentos del expediente
*Responsable:* Administrador  

### Happy Path
   1. El administrador accede al módulo de pacientes.
   2. Selecciona al paciente deseado.
   3. Visualiza el contenido del expediente del paciente seleccionado.
   4. Selecciona el documento a imprimir del apartado de documentos
   5. Selecciona la opción de imprimir.
   6. Confirma e imprime.
   7. El documento es enviado a la impresora.

### Excepciones
   - *Sin documentos:* Se indica que no hay documentos para imprimir.  
   - *Error de impresión: Se despliega mensaje de error.  

---

## 3. Gestión del estado del expediente
*Responsable:* Administrador  

### Happy Path
   1. El administrador accede al módulo de pacientes.
   2. Selecciona al paciente deseado.
   3. Visualiza el estado actual.
   4. Selecciona una acción del apartado de acciones:  
      - Inicializar Expediente  
      - Finalizar Expediente  
   5. El sistema guarda el cambio.
   6. Confirma visualmente la actualización.

### Excepciones
   - *Cambio no permitido:* Se impide reactivar un expediente finalizado. 

---

## 4. Visualización del checklist del expediente
*Responsable:* Administrador  

### Happy Path
   1. El usuario inicia sesión con sus credenciales válidas.
   2. Selecciona al paciente de su lista depacientes
   3. Navega al expediente del paciente.
   4. Se muestra una colección de documentos en el apartado de documentos.
   5. Cada ítem indica:  
      - (✓) Completado  
      - ( ) Pendiente
   6. El sistema actualiza el checklist según se vayan cumpliendo.

### Excepciones
   - *Falta de documentos: Se marcan en rojo.  
   - *Expediente cerrado:* El checklist no es editable.

---

## 5. Carga de archivos al expediente
*Responsable: Terapeuta

### Happy Path
   1. El terapeuta accede a su lista de pacientes.
   2. Selecciona al paciente deseado.
   3. Visualiza el contenido del expediente del paciente seleccionado.
   4. Selecciona el documento a cargar del apartado de documentos
   5. Selecciona “Archivo adjundo” dentro de la pestaña del ducumento.
   6. Selecciona “Seleccionar archivo”
   7. Abre el explorador de archivos.
   8. Elige un archivo válido (.pdf, .jpg, .png).
   9. Se carga y asocia al expediente.
   10. Se registra en bitácora.
   11. Muestra notificación de éxito.

### Excepciones
   - *Tipo de archivo no valido Se cancela la carga en caso de ser un documento en formato no valido
   - *Archivo muy grande: Se rechaza el archivo.  
