# **Nombre del Proceso**

## Generación y Exportación de Reportes (Prototipo – sin backend)

---

## **Objetivo**

Proporcionar a la **Coordinadora** y al **Administrador** un mecanismo visual para consultar estadísticas de la clínica (citas atendidas, canceladas, ingresos estimados, entre otros) y descargar reportes en formatos estándar, todo ello dentro de la interfaz del prototipo y sin depender de servicios externos.

---

## **Actores**

| Actor             | Permisos en la interfaz                                                     |
| ----------------- | --------------------------------------------------------------------------- |
| **Coordinadora**  | Seleccionar rangos de fechas, aplicar filtros, generar y exportar reportes. |
| **Administrador** | Los mismos permisos que la Coordinadora.                                    |
| **Secretaria**    | Solo consulta (lee los resultados pero no descarga).                        |

---

## **Entradas**

* **Rango de fechas** (fecha inicio → fecha fin).
* **Tipo de reporte** (p. ej. *Citas* o *Económico*).
* **Filtros adicionales** (especialidad, establecimiento, etc.).
* **Formato de exportación** (PDF o Excel) — opcional.

---

## **Pasos**

1. **Abrir módulo**
   La Coordinadora navega a **Reportes** desde la barra superior y permanece en la pestaña “Reportes”.

2. **Configurar consulta**

   * Selecciona **fecha de inicio** y **fecha de fin**.
   * Elige **Tipo de reporte** y, de ser necesario, aplica filtros (servicio, sede, terapeuta…).

3. **Generar**
   Pulsa **«Generar reporte»**.

   * La interfaz muestra un indicador de progreso breve.
   * Al finalizar, se despliegan gráficas y tablas con los datos agregados.

4. **Revisar resultados en pantalla**
   La Coordinadora puede cambiar filtros o el rango y volver a generar hasta obtener la vista deseada.

5. **Exportar (opcional)**

   * Pulsa **«Exportar»** y selecciona **PDF** o **Excel**.
   * El prototipo construye el archivo y lanza la descarga inmediata al equipo de la usuaria.

---

## **Excepciones**

| Escenario                                                  | Gestión en la interfaz                                                           |
| ---------------------------------------------------------- | -------------------------------------------------------------------------------- |
| **Rango invertido** (fecha inicio > fecha fin)             | Se muestra un aviso y se bloquea la generación hasta corregir las fechas.        |
| **Sin datos** dentro del rango                             | Se notifica “No se encontraron registros” y se mantiene la vista sin resultados. |
| **Filtro inconsistente** (p. ej. especialidad inexistente) | Se limpia el filtro y se sugiere seleccionar un valor válido.                    |

---

## **Resultados Esperados**

| Acción             | Resultado visible                                                                  |
| ------------------ | ---------------------------------------------------------------------------------- |
| **Generar**        | Se muestran gráficas y totales debajo del formulario, listos para revisión rápida. |
| **Exportar PDF**   | Se descarga un archivo con los mismos datos y un membrete de la clínica.           |
| **Exportar Excel** | Se descarga una hoja calculable con los valores tabulados.                         |

---

## **Notas Adicionales**

1. **Datos de prueba** – El prototipo trabaja con información simulada cargada en la propia sesión; por ello los montos y totales se reinician al “refrescar” la página.
2. **Multiconsulta** – No hay historial interno; si se desea conservar varias versiones, la usuaria debe descargar cada archivo o realizar capturas de pantalla.
3. **Escalabilidad futura** – En la versión con backend estos botones se conectarían a un servicio que genere los reportes en el servidor, permitiendo consolidar datos reales y firmar los archivos.

---
