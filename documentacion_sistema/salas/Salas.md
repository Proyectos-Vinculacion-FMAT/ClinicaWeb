# **Nombre del Proceso**

## Administración de Salas / Consultorios (Prototipo – sin backend)

---

## **Objetivo**

Permitir a la **Coordinadora** crear, editar, bloquear / liberar y eliminar consultorios dentro de la interfaz del prototipo, de modo que el equipo valide flujos de agenda y distribución de servicios **sin** infraestructura de servidor.

> **Persistencia simulada**
> Los datos se conservan únicamente en la memoria local del navegador. Si el usuario borra la caché o recarga la página con limpieza total, la información desaparece.

---

## **Actores**

| Actor                    | Permisos visibles en la interfaz                    |
| ------------------------ | --------------------------------------------------- |
| **Coordinadora**         | Alta, edición, bloqueo / liberación y eliminación   |
| **Administrador**        | Igual que la Coordinadora                           |
| **Secretaria / Becaria** | Solo lectura (los botones de acción no se muestran) |

---

## **Entradas**

* **Nombre** del consultorio (debe ser único)
* **Servicios** que atiende (al menos uno)
* **Horario de operación**

  * Hora de inicio y hora de fin entre **09:00 h** y **18:00 h**
  * La hora de fin debe ser posterior a la de inicio

---

## **Pasos**

| Fase                              | Descripción resumida                                                                                                                                                    |
| --------------------------------- | ----------------------------------------------------------------------------------------------------------------------------------------------------------------------- |
| **1. Consultar lista**            | La Coordinadora abre la sección **Salas** y revisa el listado existente.                                                                                                |
| **2. Crear**                      | Pulsa **“Agregar Sala”**, completa el formulario y confirma. La nueva sala aparece al instante en la tabla.                                                             |
| **3. Editar**                     | Pulsa **“Editar”** en la fila deseada, modifica los campos y confirma. La fila se actualiza de inmediato.                                                               |
| **4. Bloquear / Liberar horario** | Desde la pantalla de edición, selecciona **“Bloquear horario”**, define rango y motivo. El tramo queda resaltado en la Agenda; puede liberarlo siguiendo la misma ruta. |
| **5. Eliminar**                   | Pulsa **“Eliminar”**, confirma en el diálogo emergente y la sala desaparece del listado.                                                                                |

---

## **Excepciones**

| Código    | Escenario                             | Solución en la interfaz                                                                         |
| --------- | ------------------------------------- | ----------------------------------------------------------------------------------------------- |
| **EX-01** | Nombre duplicado                      | Se muestra un mensaje indicando que el nombre ya está en uso.                                   |
| **EX-02** | Nombre con caracteres no válidos      | Se solicita ingresar solo letras y números.                                                     |
| **EX-03** | Servicios sin seleccionar             | Se pide marcar al menos un servicio antes de continuar.                                         |
| **EX-04** | Horario fuera de rango o fin ≤ inicio | Se informa que el intervalo debe ser entre 09 h y 18 h y que la hora de fin debe ser posterior. |

---

## **Resultados Esperados**

| Acción       | Efecto inmediato                                                            |
| ------------ | --------------------------------------------------------------------------- |
| **Crear**    | Aparece una nueva fila en la tabla con la sala recién registrada.           |
| **Editar**   | Los cambios se reflejan al instante en la misma fila.                       |
| **Eliminar** | La fila desaparece del listado.                                             |
| **Bloquear** | Los tramos bloqueados se muestran resaltados en rojo en la Agenda simulada. |

---

## **Notas Adicionales**

1. **Modo monousuario** – Cada navegador funciona como instancia independiente; no existe sincronización entre equipos.
2. **Bitácora de cambios** – El prototipo registra internamente la hora y la acción, accesible solo durante la sesión actual.
3. **Integridad referencial limitada** – El prototipo no impide eliminar una sala que tenga citas asignadas; se asume responsabilidad manual de revisión.
4. **Restablecer estado** – Para volver al punto de inicio basta con limpiar los datos del navegador o abrir la aplicación en una ventana de incógnito.

---
