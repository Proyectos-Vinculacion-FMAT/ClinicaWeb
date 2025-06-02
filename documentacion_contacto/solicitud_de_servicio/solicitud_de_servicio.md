# Nombre del Proceso: 

**Solicitud De Servicio**

## Objetivo
Registrar nuevas solicitudes de potenciales pacientes para recibir los servicios que ofrece la clínica.

## Actores
- Paciente: Ingresa los datos necesarios del formulario para solicitar el servicio.
- Secretaría: Verifica la validez de los datos y el horario disponible entre el evaluador y la secretaría.

## Entradas:
- Existen horarios disponibles coincidentes entre la persona encargada en secretaria y el psicólogo evaluador.

## Flujo Principal:
1.	El paciente accede al módulo de agendamiento.
2.	El sistema muestra las fechas y horarios disponibles.
3.	El paciente selecciona fecha, hora y tipo de consulta.
4.	El administrador valida la disponibilidad y confirma la cita.
5.	El paciente recibe la confirmación de la cita.
6.	El sistema registra la cita y muestra un mensaje de confirmación.
## Excepciones:
- **No hay disponibilidad en la fecha/hora seleccionada.**
    - El sistema sugiere opciones alternativas.
    - El paciente elige una nueva opción o cancela el proceso.
- **Datos inválidos (ej. fecha pasada).** 
    - El sistema muestra un mensaje de error y solicita corrección.
## Resultados:
- La cita queda registrada en el sistema.
- Se envía una notificación de confirmación al paciente.
