### **Restricciones de Requisitos Funcionales**
Estas restricciones están relacionadas con las funcionalidades específicas que el sistema debe cumplir, según los requisitos funcionales (RF) del documento "Requisitos Funcionales.md":

1. **Control de acceso basado en roles** (RF-002):
   - **Terapeutas**: Solo pueden acceder y modificar los expedientes de sus pacientes asignados.
   - **Personal de Secretaría**: Solo pueden visualizar información general de los expedientes (nombre, email, celular, fecha de registro, sesiones concluidas, sesiones restantes, faltas justificadas) sin acceso a información clínica o notas de sesión.
   - **Administradores**: Tienen acceso completo a los expedientes, incluyendo la capacidad de generar y exportar reportes con datos cualitativos y cuantitativos.
   - **Restricción**: Se debe registrar cualquier intento de acceso no autorizado.

2. **Registro de auditoría** (RF-003):
   - **Restricción**: Los registros de auditoría (fecha, hora y usuario que accede o modifica un expediente) son accesibles únicamente para administradores y no pueden ser eliminados.

3. **Creación y edición de expedientes** (RF-004):
   - **Restricción**: Los expedientes solo pueden ser creados por el personal de secretaría. Los terapeutas asignados pueden editarlos, pero no crearlo desde cero.
   - **Restricción**: Se permite adjuntar documentos complementarios al expediente.

4. **Carga de documentos** (RF-005):
   - **Restricción**: Solo se aceptan archivos en formatos PDF, JPG y PNG, con un límite de tamaño de 20 MB por archivo.
   - **Restricción**: El sistema debe mostrar un mensaje de error si el archivo excede el tamaño permitido.

5. **Almacenamiento de expedientes** (RF-006):
   - **Restricción**: Los expedientes deben almacenarse durante un mínimo de 5 años. Después de este período, deben archivarse o eliminarse según normativas de privacidad.
   - **Restricción**: El sistema debe alertar al administrador antes de la eliminación de un expediente.

6. **Gestión de seguridad por TI** (RF-007):
   - **Restricción**: Solo el personal de TI autorizado puede modificar configuraciones de seguridad.
   - **Restricción**: Cualquier cambio en la configuración de seguridad debe registrarse en el sistema de auditoría.
   - **Restricción**: Los cambios en configuraciones de seguridad solo pueden revertirse o restaurarse con mecanismos adicionales de autenticación y autorización.

7. **Protección de datos** (RF-008):
   - **Restricción**: El sistema debe implementar permisos de acceso específicos para cada usuario.
   - **Restricción**: Debe contar con un sistema de respaldo y recuperación de datos para proteger la información contra modificaciones no autorizadas.

8. **Registro de notas de sesión** (RF-009):
   - **Restricción**: Solo el terapeuta que registró las notas de sesión puede editarlas.
   - **Restricción**: Las notas deben seguir formatos predefinidos.

9. **Reportes terapéuticos** (RF-010):
   - **Restricción**: Solo los terapeutas pueden editar y guardar reportes utilizando plantillas predefinidas.
   - **Restricción**: Los administradores tienen acceso completo a los reportes, incluyendo datos cualitativos y cuantitativos.
   - **Restricción**: Los reportes deben poder exportarse en formatos CSV, Excel o PDF.

10. **Notificación de documentos pendientes** (RF-011):
    - **Restricción**: El sistema debe enviar notificaciones automáticas diarias o semanales a los terapeutas sobre documentos pendientes.

11. **Archivado de casos cerrados** (RF-012):
    - **Restricción**: Solo los administradores pueden marcar un caso como cerrado.

12. **Gestión de datos y estadísticas** (RF-013):
    - **Restricción**: Los datos estadísticos (edad, género, área de vivienda, nivel socioeconómico, etc.) son accesibles únicamente para administradores.
    - **Restricción**: Los datos deben poder exportarse en formatos CSV o Excel.

---

### **Restricciones de Requisitos No Funcionales**
Estas restricciones están relacionadas con el rendimiento, usabilidad, seguridad y diseño del sistema, según el documento "RNF_Criterios_de_aceptacion (1).pdf":

1. **Consulta y actualización rápida de expedientes** (RNF-001):
   - **Restricción**: La confirmación de cambios tras una edición debe tardar menos de 1 segundo.
   - **Restricción**: La navegación para acceder a un expediente debe requerir un máximo de 3 clics desde la pantalla principal.
   - **Restricción**: El 80% de los usuarios deben completar tareas de consulta y/o edición sin asistencia adicional.

2. **Facilidad de aprendizaje** (RNF-002):
   - **Restricción**: El tiempo de aprendizaje para nuevos usuarios debe ser menor a 2 días.
   - **Restricción**: El sistema debe incluir un tutorial interactivo en el primer acceso, un sistema de ayuda contextual y indicaciones visuales para errores o acciones incompletas.

3. **Organización clara de la información** (RNF-003):
   - **Restricción**: Los datos personales del paciente deben aparecer en la parte superior de la interfaz.
   - **Restricción**: El historial clínico debe ser accesible mediante pestañas o secciones colapsables.

4. **Minimización de errores del usuario** (RNF-004):
   - **Restricción**: Los formularios deben incluir validaciones en tiempo real para evitar datos incorrectos.
   - **Restricción**: Los mensajes de error deben ser claros y detallados.
   - **Restricción**: Las acciones críticas (como eliminación de datos o cambios importantes) deben requerir confirmación.

5. **Consistencia en la interfaz** (RNF-005):
   - **Restricción**: El sistema debe mantener estilos homogéneos en botones, formularios y tipografía.
   - **Restricción**: Las interacciones deben ser coherentes en todas las pantallas.

---

### **Restricciones Operativas**
Estas restricciones están derivadas del documento "Entrevista.pdf" y reflejan las limitaciones operativas y organizativas del entorno actual de la clínica:

1. **Confidencialidad y privacidad**:
   - **Restricción**: Ninguna información confidencial del paciente puede salir de la clínica, ya sea en formato físico o digital. Esto incluye notas, dibujos, protocolos de evaluación, etc.
   - **Restricción**: Está prohibido tomar fotos o digitalizar documentos sensibles (como dibujos de terapia infantil) sin autorización explícita de la coordinación.
   - **Restricción**: Solo el terapeuta asignado y su supervisor pueden acceder al expediente de un paciente. En casos específicos, la coordinadora o la becaria pueden acceder a información muy específica, pero no de manera generalizada.

2. **Manejo físico de expedientes**:
   - **Restricción**: Los expedientes físicos deben permanecer dentro de la clínica, almacenados en cajones específicos (separados para licenciatura y maestría).
   - **Restricción**: Los terapeutas solo pueden manipular los expedientes durante sus sesiones y deben devolverlos al cajón correspondiente después de cada uso.
   - **Restricción**: Los expedientes físicos deben contener, como base, solicitud, consentimiento informado, derechos del cliente, aviso de privacidad, historia clínica, evaluación del servicio (al final del caso) y hojas de control de sesiones.

3. **Digitalización limitada**:
   - **Restricción**: Actualmente, no se digitalizan documentos sensibles como dibujos de terapia infantil debido a la carga adicional de trabajo y preocupaciones de seguridad.
   - **Restricción**: Las notas de los terapeutas deben transferirse a formatos específicos en el expediente físico, y las notas personales (en libretas o hojas sueltas) no pueden conservarse fuera del expediente.

4. **Supervisión y validación**:
   - **Restricción**: Todas las decisiones terapéuticas deben pasar por la aprobación de un supervisor (generalmente un profesional con maestría o experiencia).
   - **Restricción**: Los reportes de psicodiagnóstico y orientación vocacional se construyen en conjunto con el supervisor, con revisiones constantes.

5. **Canalización de casos**:
   - **Restricción**: En caso de canalización externa, el expediente no se comparte con otras clínicas. Solo se entrega el reporte original al paciente, y cualquier intercambio de información entre terapeutas es verbal o limitado a casos específicos.
   - **Restricción**: Si un terapeuta abandona un caso, el expediente se transfiere a otro terapeuta internamente, acompañado de un contexto verbal o basado en los controles de sesiones.

6. **Tiempo para completar documentos**:
   - **Restricción**: La historia clínica debe estar lista antes de la tercera sesión con el paciente.
   - **Restricción**: Los terapeutas deben completar las notas de sesión y otros documentos en un tiempo razonable (aproximadamente 15-20 minutos por sesión, según la entrevistada).

7. **Normativas y ética**:
   - **Restricción**: El manejo de los expedientes debe cumplir con el código de ética de la APA y la norma mexicana de privacidad, aunque no hay un formato escrito específico, sino una formación profesional implícita.
   - **Restricción**: Los expedientes se destruyen después de 5 años, siguiendo normativas de privacidad.

8. **Limitaciones en el uso de dispositivos electrónicos**:
   - **Restricción**: No se permite el uso de dispositivos electrónicos (como computadoras o tablets) durante las sesiones, especialmente en el nivel de licenciatura, aunque los estudiantes de maestría pueden usar tablets para tomar notas en algunos casos.
   - **Restricción**: La digitalización de documentos (como controles de asistencia) se considera viable, pero no se implementa debido a la carga de trabajo adicional.

