
# **Nombre del Proceso:**  
## Creación de cita

---

## **Objetivo**  
Registrar nuevas citas en el sistema asignando paciente, terapeuta, sala y horario disponible, validando que no existan conflictos con agendas existentes.

---

## **Actores**  
- **Secretaria:** Ingresa los datos de la nueva cita y la crea en el sistema.
- **Coordinadora:** Verifica la validez de los datos registrados y supervisa la correcta integración de la cita en el sistema.

---

## **Entradas**  

- Paciente registrado (nombre)
- Tipo de servicio (evaluación inicial o terapia)
- Terapeuta disponible
- Fecha y hora de inicio
- Sala para servicio
- Comprobante de pago (para terapias)

---

## **Pasos**  
1. **Acceso al Módulo de Agenda:**  
   La secretaria inicia sesión en el sistema y accede al módulo de gestión de agenda, en horarios disponibles desde la pagina principal.   
2. **Acceso al formulario:**  
   La secretaria hace clic en "Nuevo Evento" desde la vista de agenda.  
3. **Ingreso de Datos Personales:**  
   La secretaria completa el formulario con los datos requeridos de la cita, como paciente (ya creado), terapeuta asignado, fecha y hora de inicio, sala de la cota, comprobante de pago y cuota a pagar.  
4. **Guardado de cita:**  
   La Secretaria guarda la información de la cita en el formulario.
5. **Validación automatica:**  
   El sistema comprueba que la cita a crear no sea en fin de semana y no este sobrepuesta a otras citas.  
6. **Confirmación:**  
   Se guarda la cita y actualiza la vista de agenda con la nueva cita creada en la fecha y horario especificado.
   
---

## **Excepciones**  
- **Datos Incompletos o Erróneos:**  
  Si algún campo obligatorio no está lleno o contiene información inválida, el sistema no bloqueará el guardado y mostrará un mensaje de error indicando los elementos faltantes o erróneos.  
- **Sala no disponible:**
  Si la sala está ocupada en la hora que se busca guardar, el sistema bloqueará el guardado y mostrará un mensaje de error indicando que la sala está ocupada en dicho rango de horario.
- **Terapeuta no disponible:**
  Si el terapeuta está ocupado a la hora en la que se busca realizar la cita, el sistema bloqueará el guardado y mostrará un mensaje de error indicando que la sala esta ocupada en dicho rango de horario.
- **Falta de comprobante de pago:**
  Si se elige el evento cita de terapia y no se sube comprobante de pago, el sistema no permitirá continuar y mostrará un mensaje indicando la documentación faltante.
---

## **Resultados esperados**  

- Nueva cita registrada en la agenda con todos los datos requeridos.
- Actualización en tiempo real de la disponibilidad de recursos.
- Generación automática de folio único (una vez se asigna el paciente).

---

## **Notas Adicionales**  
- Las evaluaciones iniciales tienen prioridad en la asignación de horarios.
- El comprobante de pago debe ser en formato JPEG, PNG o PDF, de máximo 5 MB.

---

##

# **Nombre del Proceso:**  
## Reprogramación de cita

---

## **Objetivo**  
Modificar fecha, hora o recursos asignados a una cita existente, manteniendo la integridad de las agendas involucradas.

---

## **Actores**  
- **Secretaria:** Ejecuta el cambio desde la bandeja de reprogramaciones o directamente en la agenda.
- **Paciente:** Es el que solicita la reprogramación de la cita (pendiente de aprobación).
- **Coordinadora:** Verifica la correcta reprogramación de la cita y su integración en el sistema.

---

## **Entradas**  
- Cita existente por modificar
- Nueva fecha/hora propuesta
- Justificación del cambio (opcional)
- Disponibilidad actualizada de terapeutas/salas

---

## **Pasos**  

1. **Acceso al Módulo de Agenda:**  
   La Secretaria inicia sesión en el sistema y accede al módulo de gestión de agenda, en horarios disponibles desde la pagina principal. 
2. **Acceso a la cita a reprogramar:**  
   La secretaria accede a la cita a reprogramar de cualquiera de las 2 maneras:
     En la pestaña de reprogramaciones en la bandeja de entrada y dando click en gestionar.
     Seleccionando la cita desde la agenda y dando click en reprogramar.  
3. **Modificación de datos:**  
   La secretaria cambia los parámetros editables necesarios: hora, fecha y terapeuta asignado.  
4. **Guardado de cita:**  
   La secretaria guarda la cita con la información modificada en el formulario.
5. **Validación automatica:**  
   El sistema comprueba que la cita por reprogramar no sea en fin de semana y no este sobrepuesta a otras citas. 
6. **Confirmación:**  
   Se guarda la cita y actualiza la vista de agenda con la cita reprogramada en la fecha y horario especificado.
   
---

## **Excepciones**  
- **Datos Incompletos o Erróneos:**  
  Si algún campo obligatorio no está lleno o contiene información inválida, el sistema no bloqueará el guardado y mostrará un mensaje de error indicando los elementos faltantes o erroneos.  
- **Sala no disponible:**
  Si la sala esta ocupada en la hora que se busca guardar, el sistema bloqueará el guardado y mostrara un mensaje de error indicando que la sala esta ocupada en dicho rango de horario.
- **Terapeuta no disponible:**
  Si el terapeuta esta ocupado a la hora en la quw se busca realizar la cita, el sistema bloqueará el guardado y mostrara un mensaje de error indicando que la sala está ocupada en dicho rango de horario.
- **Cita no encontrada:**
  Si no se encuentra el evento original para reprogramar, el sistema no permitirá desplegar el formulario y mostrará un mensaje de error indicando que no se encontró el evento original para reprogramar.
---

## **Resultados Esperados**  
- Liberación automática del horario anterior.
- Cita actualizada en el sistema con nuevos parámetros.
- Visualización de la cita reprogramada en la agenda.

---

## **Notas Adicionales**  
- El sistema mantiene el folio original durante la reprogramación.

---

##

# **Nombre del Proceso:**  
## Gestión de solicitudes

---

## **Objetivo**  
Procesar solicitudes pendientes de nuevas citas recibidas a través de la bandeja de entrada del sistema.

---

## **Actores**  
- **Secretaria:** Revisa, modifica y rechaza las solicitudes de cita.
- **Coordinadora:** Supervisa que se haga una correcta gestión de solicitudes, de la misma manera las toma en cuenta para uso estadístico de parte de Vinculación.

---

## **Entradas**  
- Solicitudes de nuevas citas (con nombre del paciente, tipo de evento y fecha propuesta)
- Disponibilidad actual de la agenda

---

## **Pasos**  

1. **Acceso al Módulo de Agenda:**  
   La Secretaria inicia sesión en el sistema y accede al módulo de gestión de agenda, en horarios disponibles desde la pagina principal.  
2. **Acceso a la solicitud:**  
   La secretaria accede a la cita a solicitud en la pestaña de solicitudes en la bandeja de entrada y dando click en "Gestionar".
3. **Evaluación de solicitud:**  
   La secretaria evalúa la solicitud y analiza la disponibilidad en la agenda.
4. **Guardado de cita:**  
   La secretaria guarda la cita solicitada (con modificaciones pertinentes si es necesario).
5. **Validación automatica:**  
   El sistema comprueba que la cita por programar no sea en fin de semana y no este sobrepuesta a otras citas. 
6. **Confirmación:**  
   Se guarda la cita y actualiza la vista de agenda con la cita programada en la fecha y horario especificado.
   
---

## **Excepciones**  
- **Datos Incompletos o Erróneos:**  
  Si algún campo obligatorio no está lleno o contiene información inválida, el sistema no bloqueará el guardado y mostrará un mensaje de error indicando los elementos faltante o erroneo.  
- **Sala no disponible:**
  Si la sala esta ocupada en la hora que se busca guardar, el sistema bloqueará el guardado y mostrara un mensaje de error indicando que la sala esta ocupada en dicho rango de horario.
- **Terapeuta no disponible:**
  Si el terapeuta esta ocupado a la hora en la quw se busca realizar la cita, el sistema bloqueará el guardado y mostrara un mensaje de error indicando que la sala esta ocupada en dicho rango de horario.
---

## **Resultados Esperados**  
- Cita creada con los parámetros de la solicitud (en caso de no requerir modificaciones).
- Visualización de la cita reprogramada en la agenda.

---

## **Notas Adicionales**  
- Las solicitudes tienen caducidad (7 días sin atender se archivan automáticamente).
- Prioridad automática para evaluaciones iniciales sobre terapias.

---

##

# **Nombre del Proceso:**  
## Visualización de agenda

---

## **Objetivo**  
Consultar las citas programadas mediante diferentes vistas (diaria/semanal) y filtros para facilitar la gestión del flujo clínico.

---

## **Actores**  
- Secretaria: Navega por la agenda según necesidades operativas.
- **Sistema:** Despliega la visualización de las citas y asegura que no haya solapamientos entre estas (ya sea de sala o terapeuta).
- **Coordinadora:** Supervisa la distribución de citas y resuelve conflictos complejos en la agenda.
- 
---

## **Entradas** 

- Periodo de tiempo para la visualización en la agenda (día/semana)
- Fecha y hora específicas
- Citas agendadas (almacenadas en la base de datos)

---

## **Pasos**  

1. **Acceso al Módulo de Agenda:**  
   La Secretaria inicia sesión en el sistema y accede al módulo de gestión de agenda, en horarios disponibles desde la pagina principal.  
2. **Selección de vista:**  
   La secretaria elige entre vista diaria (1 columna vertical por día) o vista semanal (5 columnas verticales, para lunes-viernes).
3. **Navegación temporal:**  
   La secretaria usa calendario embebido para saltar a una fecha específica.
4. **Consulta de agenda:**  
   La secretaria evalua las citas por día según el color de la cabecera de la columna, y los recuadros dentro de cada hora de la agenda.
5. **Consulta de cita:**  
   La secretaria ingresa a una cita específica para ver su información relacionada como tipo de cita, paciente, folio, fecha, hora de inicio, duración, sala, terapeuta y comprobante. 

---

## **Excepciones**  
- **Sobrecarga de citas:**  
  Cabeceras en rojo activan alerta para redistribución de carga.

---

## **Resultados Esperados**  
- Visualización clara e intuitiva de la programación clínica.
- Capacidad para identificar rápidamente disponibilidades.
- Acceso inmediato a detalles operativos de cada cita.

---

## **Notas Adicionales**  
- Las citas están codificadas por color, siendo morado usado para evaluaciones iniciales y azul para cita de terapia.
- Las cabeceras de la agenda (correspondientes al día) están codificadas por color, segun su ocupación, siendo
     - Verde: <25%
     - Amarillo: 25% - 75% 
     - Rojo: <75%
- La vista semanal excluye fines de semana (no hay atención).
- Click en slot vacío abre directamente formulario para nueva cita.
- Compatible con impresión en formato optimizado (botón "Imprimir").
  
---
