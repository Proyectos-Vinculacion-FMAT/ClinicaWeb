# **Nombre del Proceso**

## Gestión de Terapeutas (Prototipo – sin backend)

---

## **Objetivo**

Permitir a la **Coordinadora** o **Administrador** dar de alta, editar datos básicos y horarios, filtrar, y (cuando proceda) desactivar registros de terapeutas en la interfaz del prototipo, garantizando que el equipo pruebe la asignación de citas y la carga de trabajo **sin** depender de un servidor real.

> **Persistencia simulada**
> Los registros se almacenan únicamente en la memoria local del navegador. Se pierden al limpiar caché o recargar con “Hard Reload”.

---

## **Actores**

| Actor                    | Permisos visibles en la interfaz                                           |
| ------------------------ | -------------------------------------------------------------------------- |
| **Coordinadora**         | Alta, edición de datos y horarios, cambio de rol, baja visual              |
| **Administrador**        | Los mismos que la Coordinadora                                             |
| **Secretaria / Becaria** | Solo lectura (no ve los botones de acción)                                 |
| **Terapeuta** (futuro)   | Solo consulta de su propio perfil (fuera del alcance actual del prototipo) |

---

## **Entradas**

* **Nombre completo** del terapeuta
* **Correo** institucional o personal
* **Teléfono** de contacto
* **Rol** (Activo / Pasante / Externo)
* **Tipo de servicio** que brinda (Psicodiagnóstico, Terapia individual, etc.)
* **Horarios disponibles** (día de la semana + hora inicio → hora fin + nota opcional)

---

## **Pasos**

| Fase                          | Descripción resumida                                                                                                                                      |
| ----------------------------- | --------------------------------------------------------------------------------------------------------------------------------------------------------- |
| **1. Listar / Filtrar**       | La Coordinadora abre **Terapeutas**. Puede filtrar por nombre, tipo de servicio o rol.                                                                    |
| **2. Crear**                  | Pulsa **“Nuevo Terapeuta”** → aparece formulario vacío.<br>Ingresa datos, añade uno o varios horarios y confirma. El nuevo terapeuta aparece en la lista. |
| **3. Editar**                 | Pulsa **“Editar”** en la fila deseada → formulario con datos precargados.<br>Modifica información o agrega / quita horarios y confirma.                   |
| **4. Desactivar**             | Cambia el rol a **Externo** o equivalente para marcarlo como no disponible; en el listado su etiqueta de rol cambia de color.                             |
| **5. (Opcional) Baja visual** | Puede ocultar temporalmente al terapeuta cambiando su visibilidad en la lista (no se elimina de forma definitiva en el prototipo).                        |

---

## **Excepciones**

| Código     | Escenario                                         | Mensaje / Gestión en la interfaz                |
| ---------- | ------------------------------------------------- | ----------------------------------------------- |
| **EX-T01** | Correo duplicado                                  | “Ya existe un terapeuta con ese correo.”        |
| **EX-T02** | Correo o teléfono con formato inválido            | Se solicita corregir el dato antes de guardar.  |
| **EX-T03** | Horario solapado dentro del mismo terapeuta       | Se indica que las franjas no deben traslaparse. |
| **EX-T04** | Intento de guardar sin al menos un horario válido | Se pide definir al menos una franja disponible. |

---

## **Resultados Esperados**

| Acción          | Efecto inmediato en la interfaz                                                                                       |
| --------------- | --------------------------------------------------------------------------------------------------------------------- |
| **Crear**       | Aparece una nueva ficha de terapeuta en la lista, visible en filtros.                                                 |
| **Editar**      | Los cambios de contacto, rol o horario se reflejan al instante.                                                       |
| **Desactivar**  | El terapeuta muestra su nuevo rol (color gris) y deja de aparecer como opción al asignar citas en la Agenda simulada. |
| **Baja visual** | El registro se oculta de la lista principal; puede volver a mostrarse al restablecer filtros.                         |

---

## **Notas Adicionales**

1. **Horarios y Agenda** – La Agenda del prototipo lee los horarios declarados para evitar empalmes cuando se realizan pruebas de citación manual.
2. **Monousuario** – Cada navegador funciona de forma independiente; no existe réplica entre distintos equipos.
3. **Edición segura** – El prototipo no valida conflictos con citas ya asignadas; se asume que el evaluador lo comprueba manualmente.
4. **Regenerar estado** – Para empezar “desde cero” basta con limpiar los datos de sitio o abrir la app en modo incógnito.

---
