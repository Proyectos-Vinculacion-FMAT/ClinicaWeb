# **Nombre del Proceso:**

## Notificaciones de Reprogramación y Recordatorios (Prototipo)

---

## **Objetivo**

*Detectar citas próximas o re-agendadas y emitir un recordatorio al paciente, dejando constancia en la bandeja de notificaciones del prototipo.*

---

## **Actores**

* **Secretaria** – Configura y revisa las notificaciones.
* **Sistema de Notificaciones (simulado)** – Revisa de forma automática la agenda y genera los recordatorios.
* **Paciente** – Recibe la alerta (no interviene en la interfaz).

---

## **Entradas**

* Agenda interna de citas (fecha, hora, estado, paciente).
* Parámetros de notificación almacenados en la configuración del prototipo:

  * Estado (Habilitado / Deshabilitado)
  * Antelación en horas para el recordatorio
  * Plantilla de mensaje

---

## **Pasos**

1. **Activación automática**
   Al abrir cualquier pantalla de Agenda, el sistema de notificaciones se activa en segundo plano.
2. **Revisión periódica**
   A intervalos regulares, el sistema contrasta la fecha-hora actual con la agenda y detecta las citas que requieren recordatorio.
3. **Generación del recordatorio**
   Para cada cita identificada:

   * Se muestra una alerta visual (“Recordatorio enviado a Juan Pérez – 24 h antes”).
   * Se añade un registro al historial de notificaciones.
   * La cita queda marcada para evitar duplicados.
4. **Consulta de la bandeja**
   La Secretaria puede abrir la sección “Notificaciones” para ver el historial cronológico.
5. **Reintento manual**
   Si la función estaba deshabilitada cuando correspondía enviar la alerta, el registro queda en “Pendiente” y la Secretaria puede reenviarlo cuando habilite el servicio.

---

## **Excepciones**

* **Función deshabilitada** – Las alertas se encolan con estado “Pendiente”.
* **Configuración incompleta** – El sistema muestra un aviso y detiene la emisión de recordatorios hasta que la Secretaria complete los parámetros.
* **Cita vencida** – Si la hora de la cita ya pasó, el sistema omite el recordatorio.

---

## **Resultados Esperados**

* El paciente visualiza la alerta en pantalla (simulada).
* El historial refleja cada recordatorio emitido, pendiente o reenviado.
* Las citas notificadas no reciben alertas duplicadas.

---

## **Notas Adicionales**

* Toda la lógica reside en el navegador; al cerrar la sesión se pierden los datos si el usuario borra la caché.
* En una versión con servidor, estos recordatorios se transformarían en correos o mensajes reales enviados desde un servicio externo.

---

# **Nombre del Proceso:**

## Configuración de Notificaciones Automáticas (Prototipo)

---

## **Objetivo**

*Permitir que la Secretaria establezca los parámetros que regulan los recordatorios simulados (estado, antelación, contenido) y guardarlos dentro del prototipo.*

---

## **Actores**

* **Secretaria** – Ajusta y guarda los parámetros.
* **Sistema de Configuración (simulado)** – Valida los valores y los conserva para el funcionamiento de las notificaciones.

---

## **Entradas**

* Estado de las notificaciones (Habilitado / Deshabilitado).
* Antelación en horas para el envío.
* Texto de la plantilla de mensaje (con marcadores {nombre}, {fecha}, {hora}).

---

## **Pasos**

1. **Acceso al formulario**
   La Secretaria abre *Reportes › Configuración*.
2. **Definición de parámetros**
   Ajusta Estado, Antelación y Plantilla según necesidad.
3. **Guardado**
   Pulsa **Guardar**; el sistema comprueba que la antelación sea un número positivo razonable y que la plantilla no esté vacía.
4. **Confirmación**
   Se muestra un aviso de “Configuración guardada” y los nuevos valores quedan activos de inmediato en la agenda.

---

## **Excepciones**

* **Valor fuera de rango** – Si la antelación es nula o negativa, el sistema bloquea el guardado y muestra un mensaje bajo el campo.
* **Plantilla vacía** – Si no se ingresa texto, se asigna una frase genérica para evitar mensajes sin contenido.

---

## **Resultados Esperados**

* Los recordatorios futuros se generan con la antelación y el texto definidos.
* Al deshabilitar la función, las alertas se suspenden hasta nuevo aviso.

---

## **Notas Adicionales**

* La configuración afecta únicamente al equipo y navegador donde se realiza; otras sesiones pueden conservar ajustes distintos.
* Cuando el proyecto evolucione a un entorno con servidor, estos parámetros se trasladarán a una base de datos compartida y los recordatorios se enviarán a través de un servicio de correo o mensajería real.

---
