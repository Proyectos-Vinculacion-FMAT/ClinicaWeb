# Nombre del Proceso:
**Notificaiones automáticas**

## Objetivo
Porporcionar alertas automáticas sobre confirmaciones, recordatorios, cambios o cancelaciones.

## Actores

- Sistema.

## Entradas

-	Existe una cita registrada o modificada.
-	El paciente/administrador tiene datos de contacto válidos.

## Flujo principal

1.	El sistema detecta un evento (ej. confirmación, cambio, cancelación).
2.	El sistema genera un mensaje con los detalles del evento.
3.	El sistema envía la notificación por correo electrónico o SMS.
4.	El sistema registra el envío en el historial.

## Excepciones

- **Fallo en el envío:**
    
    - El sistema reintenta el envío después de 5 minutos.
    - Si persiste el error, registra una alerta para el administrador.

## Resultados

- El usuario recibe la notificación correspondiente.