# Criterios de Validación para los Requerimientos Funcionales.

**Propósito**: El propósito del documento es dar algunos criterios recomendables para la validación de los requerimientos funcionales especificados previamente en una parte del sistema de gestión de citas de la facultad de psicología.

## RF1 - Agendamiento de citas

### Descripción del Criterio
 El sistema debe permitir a los pacientes seleccionar fecha, hora y tipo de consulta a través de una interfaz de usuario.

### Condiciones de Aceptación
1.	El paciente puede visualizar un calendario con la disponibilidad de horarios.
2.	Se valida que la fecha y hora seleccionadas estén disponibles.
3.	Se almacena la cita en la base de datos.
4.	Se muestra la cita en el historial del paciente.
5.	Se genera una confirmación de la cita (correo electrónico o notificación en la plataforma).

### Método de Validación
 * Prueba funcional agendando una cita desde la interfaz de usuario.
 * Validación de registros en la base de datos para verificar que la cita fue almacenada correctamente.

## RF2 – Notificaciones automáticas

### Descripción del Criterio
El sistema debe enviar notificaciones automáticas sobre cambios en sus citas.

### Condiciones de Aceptación
1.	Se recibe una notificación cuando agenda una cita.
2.	Se envía un recordatorio automático 24 horas antes de la cita.
3.	Si la cita es modificada o cancelada, el paciente recibe una notificación con los detalles.
4.	Las notificaciones pueden enviarse por correo electrónico o mensaje en la plataforma.
5.	Se debe registrar un historial de notificaciones enviadas.

### Método de Validación
 * Prueba funcional agendando, modificando y cancelando citas para verificar la recepción de notificaciones.
 * Revisión del historial de notificaciones en la base de datos.

## RF3 – Registro de datos

### Descripción del Criterio
El sistema debe registrar y administrar la información personal de los pacientes de manera segura.

### Condiciones de Aceptación
1.	Se permite registrar nuevos pacientes con nombre, contacto y datos personales.
2.	La información del paciente debe almacenarse en una base de datos encriptada.
3.	Solo los usuarios autorizados pueden acceder a la información del paciente.
4.	Los datos personales deben ser editables únicamente por personal autorizado.

### Método de Validación
 * Pruebas funcionales creando y editando registros de pacientes.
 * Prueba de acceso restringido (usuarios no autorizados no deben ver ni modificar datos).
 * Revisión de la encriptación de datos en la base de datos.
