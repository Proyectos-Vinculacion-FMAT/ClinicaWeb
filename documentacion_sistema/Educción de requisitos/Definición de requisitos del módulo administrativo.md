# Requisitos Funcionales

## Módulo **Agenda**

### CU-AG-01: Programación de Cita
**Actor principal:** Personal administrativo (secretaria o becaria)  
**Objetivo:** Registrar una cita válida en la agenda, asociando paciente, terapeuta y sala dentro del horario de atención.

#### Precondiciones
1. El usuario ha iniciado sesión con permisos de edición.  
2. El paciente, la sala y el terapeuta existen en el sistema.

#### Flujo principal
1. El usuario indica el tipo de sesión (Evaluación inicial integral o Cita de terapia).  
2. El sistema muestra la lista de terapeutas aptos para ese tipo.  
3. El usuario selecciona paciente, terapeuta, sala, fecha y hora de inicio.  
4. El sistema calcula la duración según el tipo de sesión (60 min por defecto) y genera un folio único para el paciente si no existía.  
5. El sistema valida:  
   - Que la fecha **no** sea sábado ni domingo.  
   - Que la hora se encuentre entre **09 : 00** y **17 : 30** en franjas de 30 min.  
   - Que la cita no exceda **seis meses** a futuro.  
   - Que paciente, terapeuta y sala estén libres durante todo el intervalo.  
   - Que el paciente no tenga más de una **Evaluación integral** el mismo día.  
6. Al superar todas las validaciones, la cita se almacena con estado **Programada** y el sistema confirma la operación.

#### Flujos alternativos
- **A1 – Conflicto de horario:** Existe solapamiento con otra reserva → el sistema rechaza el registro y solicita un nuevo horario.  
- **A2 – Fin de semana:** La fecha cae en sábado o domingo → el sistema indica que solo se permiten citas de lunes a viernes.  
- **A3 – Rango excedido:** La fecha supera seis meses → el sistema impide la programación.

#### Postcondición
La cita queda registrada y visible en la agenda para los roles autorizados.

---

### CU-AG-02: Reprogramación de Cita Existente
**Actor principal:** Personal administrativo  
**Objetivo:** Cambiar fecha y hora de una cita ya registrada, conservando su historial.

#### Precondiciones
1. La cita está en estado **Programada** o **No asistida**.  
2. El usuario posee permisos de edición.

#### Flujo principal
1. El actor localiza la cita a reprogramar.  
2. Propone nueva fecha y hora dentro de los límites operativos.  
3. El sistema valida las mismas reglas que en **CU-AG-01**.  
4. Al superar la validación, la cita se actualiza y se almacena el cambio en el historial.  
5. El sistema notifica automáticamente al paciente y al terapeuta implicados.

#### Flujos alternativos
- **B1 – Validación fallida:** Cualquier infracción (solapamiento, fin de semana, etc.) provoca mensaje de error y se aborta la operación.

#### Postcondición
La cita pasa a estado **Reprogramada** y conserva la referencia de su fecha original.

---

### CU-AG-03: Gestión de Solicitudes Entrantes
**Actor principal:** Personal administrativo  
**Objetivo:** Atender solicitudes externas de nueva cita o reprogramación y reflejarlas en la agenda.

#### Precondiciones
1. Existen solicitudes pendientes en la bandeja de entrada.  
2. El actor tiene permisos para gestionarlas.

#### Flujo principal
1. El actor abre la bandeja de entrada y selecciona una solicitud.  
2. El sistema precarga los datos (paciente, tipo de sesión, fecha propuesta).  
3. El actor confirma o ajusta la información necesaria.  
4. El sistema invoca internamente **CU-AG-01** o **CU-AG-02**, según corresponda.  
5. La solicitud se marca como **Resuelta** y se retira de la bandeja.

#### Flujo alternativo
- **C1 – Solicitud incoherente:** Referencia a cita inexistente o datos esenciales faltantes → el sistema la pone en **Rechazada** para seguimiento manual.

#### Postcondición
La agenda refleja la nueva cita o reprogramación y queda trazabilidad del proceso.

---

### CU-AG-04: Visualización de Agenda
**Actor principal:** Personal administrativo, Terapeutas, Coordinador  
**Objetivo:** Consultar la distribución de citas de un día o semana para planificar actividades.

#### Precondiciones
Usuario autenticado con permisos de lectura.

#### Flujo principal
1. El actor selecciona rango (**día** o **semana**) y fecha de referencia.  
2. El sistema presenta la vista de calendario con indicadores de ocupación:  
   - **Baja** (< 25 %)  
   - **Media** (25 – 75 %)  
   - **Alta** (> 75 %)  
3. El actor puede navegar a otras fechas o cambiar de rango sin perder contexto.

#### Postcondición
No se altera la base; solo se muestra información.

---

### CU-AG-05: Generación de Vista Imprimible
**Actor principal:** Personal administrativo  
**Objetivo:** Obtener versión imprimible de la agenda visible (control físico o pase de lista).

#### Precondiciones
El actor tiene la agenda en pantalla.

#### Flujo principal
1. Solicita la función **Imprimir**.  
2. El sistema genera un documento de solo lectura con la tabla de citas actuales.  
3. Se abre el diálogo de impresión del navegador.  
4. El actor confirma la impresión o guarda como PDF.

#### Postcondición
Se produce un documento listo para impresión; la agenda permanece intacta.

---

### CU-AG-06: Registro de Comprobante de Pago
**Actor principal:** Personal administrativo  
**Objetivo:** Adjuntar un comprobante digital de pago a una cita de terapia.

#### Precondiciones
1. La cita corresponde a una **Sesión de terapia**.  
2. El actor posee el archivo digital (PDF, JPG o PNG ≤ 5 MB).

#### Flujo principal
1. Selecciona la cita y elige **Adjuntar comprobante**.  
2. El sistema solicita archivo y verifica:  
   - Tipo permitido: `application/pdf`, `image/jpeg`, `image/png`.  
   - Tamaño ≤ 5 MB.  
3. Cumplidas las validaciones, el archivo se almacena con nombre seguro y se vincula.  
4. El sistema confirma la operación.

#### Flujo alternativo
- **D1 – Archivo inválido:** Formato o tamaño incorrecto → el sistema rechaza la carga y muestra motivo.

#### Postcondición
La cita queda vinculada al comprobante para futuras consultas.

---

#### Reglas de negocio transversales (CU-AG-01 y CU-AG-02)
1. **Horario de operación:** 09 : 00 – 17 : 30 en intervalos de 30 min.  
2. **Días hábiles:** Solo lunes a viernes.  
3. **Ventana futura:** Máx. 6 meses desde la fecha actual.  
4. **Unicidad de Evaluación Integral:** Solo una por paciente al día.  
5. **No solapamiento:** Paciente, terapeuta y sala no pueden estar ocupados simultáneamente en más de una cita.

---

## Módulo **Salas**

### CU-SA-01: Registro de Sala
**Actor principal:** Administrador  
**Objetivo:** Incorporar una nueva sala con servicios y horario operativo.

#### Precondiciones
1. Usuario con rol **Administrador** autenticado.  
2. Nombre propuesto no coincide con una sala existente.

#### Flujo principal
1. Seleccionar **Agregar Sala**.  
2. El sistema solicita nombre, servicios atendidos y horario de inicio/fin.  
3. Completar la información.  
4. Validaciones:  
   - Al menos **un servicio** seleccionado.  
   - Horario **09 : 00 – 18 : 00**.  
   - `horaFin` > `horaInicio`.  
5. Al superar validación, la sala se guarda y aparece en el listado.  
6. El sistema confirma la creación.

#### Flujo alternativo
- **A1 – Datos incompletos/ inválidos:** Se muestra motivo y no se registra.

#### Postcondición
La sala queda disponible para asignaciones en la Agenda.

---

### CU-SA-02: Modificación de Sala
**Actor principal:** Administrador  
**Objetivo:** Actualizar los datos de una sala existente.

#### Precondiciones
1. La sala está registrada.  
2. Usuario con permisos de edición.

#### Flujo principal
1. Seleccionar la sala a editar.  
2. El sistema muestra datos actuales.  
3. Modificar nombre, servicios o horario.  
4. Se aplican las mismas validaciones que en **CU-SA-01**.  
5. Al superar validación, la información se actualiza.  
6. Confirmación al usuario.

#### Flujo alternativo
- **B1 – Cancelación:** El actor cierra sin guardar → no hay cambios.

#### Postcondición
La sala se actualiza y su nueva configuración es efectiva para futuras reservas.

---

### CU-SA-03: Eliminación de Sala
**Actor principal:** Administrador  
**Objetivo:** Retirar una sala que ya no estará disponible.

#### Precondiciones
1. La sala existe.  
2. Usuario con permisos de eliminación.

#### Flujo principal
1. Solicitar eliminación.  
2. Confirmación explícita.  
3. Tras confirmar, la sala se elimina.  
4. El sistema actualiza listado y confirma.

#### Flujo alternativo
- **C1 – Operación cancelada:** Si se rechaza la confirmación, no hay cambios.

#### Postcondición
La sala ya no puede ser asignada ni aparece en listados.

---

### CU-SA-04: Consulta de Catálogo de Salas
**Actor principal:** Administrador, Personal administrativo, Coordinador  
**Objetivo:** Revisar lista completa de salas con servicios y horarios.

#### Precondiciones
Usuario autenticado con permiso de lectura.

#### Flujo principal
1. Acceder a la sección **Salas**.  
2. El sistema muestra tabla paginada/ordenada con índice, nombre, servicios y horario.  
3. El actor identifica disponibilidad de servicios por sala.

#### Postcondición
No se altera la base; solo se despliega información.

---

#### Reglas de negocio – Módulo Salas
1. **Horario permitido:** 09 : 00 – 18 : 00.  
2. **Coherencia de horario:** `horaFin` > `horaInicio`.  
3. **Servicios mínimos:** Al menos un servicio clínico asociado.  
4. **Nombre único:** Evita ambigüedad.  
5. **Integridad con Agenda:** No se puede eliminar o modificar horario si hay citas futuras.

---

## Módulo **Reportes**

### CU-RE-01: Generación de Reporte Administrativo
**Actor principal:** Personal administrativo o Coordinador  
**Objetivo:** Obtener métricas consolidadas sobre citas o ingresos en un periodo.

#### Precondiciones
1. Usuario con permisos de consulta.  
2. Al menos una cita dentro del rango solicitado.

#### Flujo principal
1. Seleccionar **fecha inicio**, **fecha fin** y **tipo de reporte**.  
2. Verificar `fechaFin` ≥ `fechaInicio`.  
3. Recopilar registros de la agenda.  
4. Según tipo:  
   - **Económico:** suma cuotas pagadas → total de ingresos.  
   - **Citas:** cuenta atendidas, canceladas, reprogramadas, no asistidas.  
5. Presentar resultados (tabla y/o gráfica) e informar cantidad de registros.

#### Flujos alternativos
- **A1 – Rango inverso:** `fechaFin` < `fechaInicio` → error y corrección.  
- **A2 – Sin datos:** “No se encontraron registros”.

#### Postcondición
Reporte disponible para visualización y exportación (**CU-RE-02**).

---

### CU-RE-02: Exportación de Reporte
**Actor principal:** Personal administrativo o Coordinador  
**Objetivo:** Descargar el reporte en PDF o Excel.

#### Precondiciones
Reporte generado en la sesión actual.

#### Flujo principal
1. Solicitar **Exportar**.  
2. Elegir formato (**PDF** o **XLSX**).  
3. El sistema crea el archivo y lo entrega al navegador.

#### Postcondición
Archivo descargado; la operación no altera datos fuente.

---

### CU-RE-03: Configuración de Parámetros Operativos
**Actor principal:** Administrador  
**Objetivo:** Definir políticas globales que afectan agenda y notificaciones.

#### Precondiciones
Usuario con rol Administrador.

#### Flujo principal
1. Acceder a **Configuración**.  
2. Ajustar parámetros:  
   - `notificaciones` → Habilitado / Deshabilitado  
   - `tiempoEspera` → minutos para marcar No asistida  
   - `maxReprogramaciones` → límite por paciente  
3. Validar rangos permitidos.  
4. Guardar configuración y confirmar.  
5. Nuevos valores se aplican inmediatamente.

#### Flujos alternativos
- **B1 – Valor fuera de rango:** Se muestra mensaje y se conserva valor anterior.  
- **B2 – Cancelación:** No se guardan cambios.

#### Postcondición
La configuración global se actualiza y persiste.

---

#### Reglas de negocio – Módulo Reportes
1. **Rango coherente:** `fechaFin` ≥ `fechaInicio`.  
2. **Periodo máximo:** 12 meses continuos.  
3. **Tipos permitidos:**  
   - **Económico** → cuotas pagadas, nº de citas pagadas, promedio ingreso/día.  
   - **Citas** → atendidas, canceladas, reprogramadas, no asistidas.  
4. **Parámetros operativos:**  
   - `tiempoEspera`: 0 – 120 min.  
   - `maxReprogramaciones`: 0 – 10.  
5. **Seguridad de exportación:** Solo roles **Administrador** o **Coordinador** bajo HTTPS.

---

## Módulo **Pacientes**

### CU-PA-01: Registro de Paciente
**Actor principal:** Personal administrativo (secretaria o becaria)  
**Objetivo:** Crear expediente inicial con folio único y estado **En espera**.

#### Precondiciones
1. Usuario con permisos de alta.  
2. Paciente no existente (validación por nombre + fecha de nacimiento o CURP).

#### Flujo principal
1. Acceder a **Nuevo paciente**.  
2. Ingresar datos básicos (nombre, contacto, servicio requerido).  
3. Generar folio único y asignar estado **En espera**.  
4. Guardar y mostrar en la lista de pacientes.

#### Flujo alternativo
- **A1 – Datos incompletos:** Campos faltantes → se indica y no se crea expediente.

#### Postcondición
Paciente listo para entrevista inicial y agenda preliminar.

---

### CU-PA-02: Inicializar Expediente
**Actor principal:** Personal administrativo  
**Objetivo:** Pasar paciente de **En espera** a **Activo**, habilitando programación de sesiones.

#### Precondiciones
1. Paciente en estado **En espera**.  
2. Entrevista inicial programada o por programar.

#### Flujo principal
1. Abrir detalle del paciente.  
2. Seleccionar **Inicializar expediente**.  
3. Confirmar y validar documento mínimo (Entrevista inicial).  
4. Cambiar estado a **Activo**.  
5. Notificar al actor y habilitar edición.

#### Postcondición
Paciente **Activo** y elegible para citas de terapia.

---

### CU-PA-03: Actualización de Datos de Paciente
**Actor principal:** Personal administrativo o Terapeuta supervisor  

#### Precondiciones
Expediente **Activo**.

#### Flujo principal
1. Seleccionar **Editar información**.  
2. El sistema desbloquea campos.  
3. Modificar datos (teléfono, correo, servicio, terapeuta asignado).  
4. Validar formatos y guardar.  
5. Formularios se bloquean de nuevo y se confirma actualización.

#### Flujo alternativo
- **B1 – Formato inválido:** Campos en rojo → no se guarda hasta corregir.

#### Postcondición
Cambios persistidos y reflejados en agenda y reportes.

---

### CU-PA-04: Registro de Sesión en Hoja de Control
**Actor principal:** Terapeuta  
**Objetivo:** Documentar resumen de sesión y asistencia.

#### Precondiciones
1. Expediente **Activo**.  
2. Usuario con rol Terapeuta asignado.

#### Flujo principal
1. Abrir **Hoja de control**.  
2. Seleccionar **Editar formato**.  
3. Añadir/actualizar campos (número, fecha, asistencia, descripción, observaciones).  
4. Guardar; el sistema actualiza contador de sesiones.

#### Flujo alternativo
- **C1 – Cancelación de sesión:** Al marcar “Canceló”, se exigen campos “¿Quién canceló?” y motivo.

#### Postcondición
Sesión registrada y estadísticas de asistencia actualizadas.

---

### CU-PA-05: Carga de Documento Anexo
**Actor principal:** Terapeuta o Personal administrativo  

#### Precondiciones
Expediente **Activo** o **Archivado**.

#### Flujo principal
1. Seleccionar documento y pestaña **Archivo adjunto**.  
2. Arrastrar o elegir archivo.  
3. Validar tipo (PDF/JPG/PNG) y tamaño (≤ 5 MB).  
4. Guardar; archivo disponible para vista previa/descarga.

#### Flujo alternativo
- **D1 – Archivo inválido:** Mensaje de error y no se almacena.

#### Postcondición
Documento asociado al expediente con estado **Completado**.

---

### CU-PA-06: Finalizar Expediente
**Actor principal:** Terapeuta supervisor o Coordinador  
**Objetivo:** Concluir tratamiento y mover expediente a **Archivado**.

#### Precondiciones
1. Todas las sesiones programadas registradas.  
2. Documentos requeridos completos.

#### Flujo principal
1. Clic en **Finalizar expediente**.  
2. Verificar criterios de cierre.  
3. Confirmación; estado pasa a **Archivado**.  
4. Expediente queda solo-lectura.

#### Flujo alternativo
- **E1 – Criterios no cumplidos:** Se listan pendientes y se cancela operación.

#### Postcondición
Expediente archivado; accesible solo para consulta histórica.

---

### CU-PA-07: Consulta y Filtrado de Pacientes
**Actor principal:** Todos los roles con acceso  

#### Flujo principal
1. Introducir criterios en filtros (nombre, servicio, estado).  
2. Sistema aplica filtros en tiempo real.  
3. Permite resetear o combinar filtros.

#### Postcondición
Solo se muestran pacientes que cumplen criterios; datos sin alterar.

---

#### Reglas de negocio – Módulo Pacientes
1. **Estados:** `En espera`, `Activo`, `Archivado`  
   - Transiciones válidas:  
     - `En espera` → `Activo`  
     - `Activo` → `Archivado`  
2. **Unicidad de folio:** Uno por paciente en todo el sistema.  
3. **Documentos obligatorios para activación:** ‘Entrevista inicial’ completada.  
4. **Cierre de expediente:**  
   - Todas las sesiones registradas/canceladas.  
   - Documentos obligatorios completos.  
5. **Validación de contacto:**  
   - Teléfono: 10 dígitos (México).  
   - Correo: Regex RFC 5322.  
6. **Carga de archivos:** PDF/JPEG/PNG ≤ 5 MB; nombre aleatorio (UUID/hash).  
7. **Seguridad de edición:** Solo Terapeuta asignado o Personal administrativo; Archivados inmutables.  
8. **Integridad con Agenda:**  
   - `En espera` → solo entrevista inicial.  
   - Al pasar a `Archivado`, citas futuras se cancelan.

---

## Módulo **Terapeutas**

### CU-TE-01: Alta de Terapeuta
**Actor principal:** Administrador / Coordinador  
**Objetivo:** Registrar terapeuta con datos de contacto, rol, especialidad y disponibilidad.

#### Precondiciones
1. Usuario con privilegios de administración.  
2. Correo del terapeuta no existe.

#### Flujo principal
1. Seleccionar **➕ Nuevo Terapeuta**.  
2. Introducir nombre, e-mail, teléfono (opcional), rol, servicio.  
3. Añadir horarios (día, hora inicio y fin).  
4. Confirmar; validar datos; generar ID único.  
5. Mostrar en listado general.

#### Flujos alternativos
- **A1 – Datos incompletos:** Campos faltantes → no se crea.  
- **A2 – Horario inválido:** `fin` ≤ `inicio` o fuera de 09 – 18 h → error.

#### Postcondición
Terapeuta disponible para asignación.

---

### CU-TE-02: Edición de Terapeuta
**Actor principal:** Administrador / Coordinador  

#### Precondiciones
Terapeuta registrado.

#### Flujo principal
1. Abrir detalle y **✏️ Editar**.  
2. Se habilitan campos (correo, teléfono, rol, especialidad, horarios).  
3. Modificar y guardar.  
4. Validar formatos; actualizar; regenerar calendario.

#### Flujo alternativo
- **B1 – Cancelación:** ✖ Cancelar → descartar cambios.

#### Postcondición
Datos vigentes y sincronizados con Agenda y Reportes.

---

### CU-TE-03: Baja / Inactivación de Terapeuta
**Actor principal:** Administrador / Coordinador  

#### Precondiciones
Sin sesiones activas futuras o ya reasignadas.

#### Flujo principal
1. Seleccionar **Inactivar terapeuta**.  
2. Verificar citas futuras y solicitar confirmación.  
3. Cambiar rol a **Inactivo** y deshabilitar selección.

#### Postcondición
Histórico preservado; no recibe nuevas citas.

---

### CU-TE-04: Consulta y Filtrado de Terapeutas
**Actor principal:** Personal administrativo, Coordinador  

#### Flujo principal
1. Introducir texto en **Buscar** nombre y/o filtros de servicio y rol.  
2. Sistema actualiza lista en tiempo real.

#### Postcondición
Localización rápida sin alterar datos.

---

### CU-TE-05: Registro de Disponibilidad Semanal
**Actor principal:** Terapeuta (autogestión) o Coordinador  

#### Precondiciones
Terapeuta activo.

#### Flujo principal
1. En detalle, **Editar** → **➕ Añadir horario**.  
2. Definir día, hora inicio y fin, descripción opcional.  
3. Validar que no haya solapamiento.  
4. Guardar; disponibilidad reflejada en calendario.

#### Flujo alternativo
- **C1 – Solapamiento:** Rechazo y sugerencia de horas libres.

#### Postcondición
Slot persistido y reservable.

---

### CU-TE-06: Consulta de Calendario Semanal
**Actor principal:** Todos los roles con permiso de lectura  

#### Flujo principal
1. Abrir detalle del terapeuta.  
2. Sistema genera calendario 30 min (**09 h – 18 h**, L-V).  
3. Bloques disponibles → verde; ocupados → rojo.

#### Postcondición
Vista rápida de agenda semanal.

---

### CU-TE-07: Exportación de Pacientes Asignados
(Interacción entre módulos Pacientes y Terapeutas)  
**Actor principal:** Terapeuta, Coordinador  

#### Precondición
Terapeuta con pacientes activos vinculados.

#### Flujo principal
1. Abrir pestaña **Pacientes asignados**.  
2. Listar expedientes donde `terapeutaId = id actual`.  
3. Filtrar por nombre o estado; navegar al expediente.

#### Postcondición
Trazabilidad garantizada entre terapeuta y casos.

---

#### Reglas de negocio – Módulo Terapeutas
1. **Roles permitidos:** `activo`, `pasante`, `externo`, `inactivo`  
   - `pasante` requiere tutor asignado.  
2. **Especialidad única:** Al menos un servicio primario por terapeuta.  
3. **Unicidad de e-mail:** Identificador de inicio de sesión.  
4. **Teléfono:** 10 dígitos (opcional).  
5. **Rango horario:**  
   - Días válidos: L-V  
   - Horario: 09 : 00 – 18 : 00  
   - `horaFin` > `horaInicio`  
   - Sin traslapes en un mismo terapeuta.  
6. **Límite jornada diaria:** Máx. 8 h de disponibilidad.  
7. **Sincronización con Agenda:**  
   - Horarios disponibles → slots reservables.  
   - Sesiones reservadas bloquean franjas.  
8. **Citas vs rol:** `pasante` solo bajo supervisión.  
9. **Integridad de baja:** Al inactivar/eliminar:  
   - Citas futuras canceladas o reasignadas.  
   - Historial clínico intacto.  
10. **Formato de horarios:** Guardados en UTC-5 (Mérida) y mostrados en zona local.

---

# Requisitos no funcionales

| ID      | Título                              | Descripción                                                                                                                                                                                                                                   | Justificación                                                                                                                     | Criterios de Aceptación                                                                                                                                                                                                                                                            | Prioridad |
|---------|-------------------------------------|-----------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------|-----------------------------------------------------------------------------------------------------------------------------------|------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------|-----------|
| **NFR-01** | Facilidad de aprendizaje            | La interfaz debe ser intuitiva para que el personal administrativo aprenda a usar el sistema en poco tiempo, sin requerir capacitación extensa.                                                                                               | Reducir el tiempo y costos en formación y facilitar la incorporación de nuevos usuarios.                                          | El 90 % de usuarios nuevos (simulados o reales) deben completar tareas básicas (p. ej., reprogramar citas, consultar reportes) en menos de **15 min** durante una sesión de prueba.                                                                                                 | Alta      |
| **NFR-02** | Consistencia visual                 | Todos los elementos visuales (colores, tipografías, iconos, estilos) deben mantener una línea estética uniforme en todas las pantallas del módulo.                                                                                             | Facilitar la navegación y fortalecer la identidad visual de la clínica.                                                           | El 100 % de las pantallas deben adherirse a la guía de estilo definida.                                                                                                                                                                                                             | Media     |
| **NFR-03** | Retroalimentación inmediata         | El sistema debe proporcionar respuestas inmediatas a las acciones del usuario (mensajes emergentes, cambios de estado, confirmaciones visuales).                                                                                               | Incrementar la confianza del usuario y evitar incertidumbre durante la interacción.                                              | El 95 % de las interacciones críticas deben generar una respuesta visible en **< 1 s**.                                                                                                                                                                                             | Alta      |
| **NFR-04** | Minimización de carga cognitiva     | La información y elementos interactivos deben presentarse de forma clara y organizada, evitando la sobrecarga visual y cognitiva en el usuario.                                                                                                | Facilitar la toma de decisiones y reducir errores por confusión.                                                                  | Los tests de usabilidad (p. ej., System Usability Scale) deben obtener una puntuación mínima de **80/100** en la fase de prototipado.                                                                                                                                              | Media     |
| **NFR-05** | Estética atractiva                  | El diseño debe ser visualmente agradable y profesional, acorde con la identidad de la clínica, generando confianza y motivando su uso.                                                                                                         | Mejorar la percepción y la satisfacción general del usuario con el sistema.                                                      | Al menos el **85 %** de los usuarios en pruebas de usabilidad califican la interfaz como visualmente atractiva (≥ 4 / 5 en escala Likert).                                                                                                                                          | Media     |
| **NFR-06** | Eficiencia de uso                   | El diseño debe permitir completar las tareas (reprogramación de citas, gestión de requerimientos, administración de usuarios, etc.) en pocos pasos.                                                                                            | Optimizar la productividad y reducir la carga operativa del personal administrativo.                                              | Al menos el **90 %** de las tareas clave pueden realizarse en **≤ 3 pasos**, verificado mediante pruebas de usabilidad.                                                                                                                                                             | Alta      |
| **NFR-07** | Robustez en el manejo de errores    | La interfaz debe manejar errores de manera segura, mostrando mensajes claros y ofreciendo opciones para corregirlos sin afectar la información.                                                                                                | Reducir la frustración y evitar la pérdida de datos críticos durante el uso del sistema.                                         | El **100 %** de los errores deben presentar un mensaje descriptivo y ofrecer una ruta de corrección, validado con pruebas de escenarios de error en las sesiones de test.                                                                                                           | Alta      |
| **NFR-08** | Accesibilidad básica                | La interfaz debe ser completamente operable con teclado y legible por lectores de pantalla (roles ARIA, focos visibles, contraste mínimo AA).                                                                                                  | Garantizar la inclusión de usuarios con discapacidades visuales o motrices en las pruebas de usabilidad.                          | 1) El **100 %** de los flujos críticos pueden completarse solo con la tecla **Tab**. <br>2) Todos los modales poseen `role="dialog"` y reciben foco al abrirse.                                                                                                                     | Alta      |
| **NFR-09** | Diseño responsivo                   | Todas las vistas (Agenda, Salas, Pacientes, Terapeutas, Reportes) deben adaptarse sin pérdida de funcionalidad a anchos de **360 px – 1920 px**, evitando *scroll* horizontal.                                                                  | Permitir que coordinadores y becarios consulten el sistema desde tablets o smartphones durante prácticas in situ.                 | 1) En Chrome DevTools a 360 px, 768 px y 1024 px se accede a todas las acciones principales con **≤ 1 scroll** vertical. <br>2) No se genera barra de desplazamiento horizontal en ningún módulo. <br>3) Los elementos interactivos mantienen al menos **44 × 44 px** de área táctil. | Media     |
| **NFR-10** | Persistencia local provisional      | Los formularios deben auto-guardar su contenido en **localStorage** cada **30 s** y restaurarlo si la página se recarga durante la misma sesión.                                                                                                 | Evitar pérdida de datos en entrevistas de usuario, ya que aún no existe *backend*.                                                | 1) Al recargar la página, el **95 %** de los campos previamente completados se repueblan en **< 1 s**. <br>2) El tamaño total almacenado no supera los **5 MB** para cumplir límites de navegadores.                                                                                 | Baja      |


```
