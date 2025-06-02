# Definición de la Aplicación

## 1. Objetivo de la aplicación
Modernizar y automatizar la gestión de citas en la Clínica SEAP de Psicología UADY mediante:

- **Optimización de recursos:** Asignación inteligente de salas, terapeutas y horarios con validaciones en tiempo real.
- **Centralización de información:** Gestión unificada de datos de pacientes y profesionales con folios únicos automáticos.
- **Mejora del servicio:** Indicadores visuales de carga diaria (código de colores) y generación de reportes imprimibles.


## 2. Roles de usuario implementados
1. **Secretaría/Administrador** (prototipo completo):
   - Registro de citas mediante formulario dinámico (`Nuevo Evento`)
   - Reprogramación desde detalles de evento (`Reprogramar`)
   - Gestión de solicitudes mediante bandeja de entrada dual
   - Validación de pagos para terapias (PDF/IMG <5MB)

2. **Coordinador** (parcialmente implementado):
   - Asignación de terapeutas según tipo de evento
   - Visualización de carga laboral por color (verde/amarillo/rojo)

3. **Terapeuta** (parcialmente implementado):
   - Visualización de agenda con detalles de sesión
   - Registro básico de avances en modal de detalles


## 3. Funcionalidades clave implementadas en el prototipado 
### Agenda Inteligente
- **Visualización dinámica:** 
  - Modos día/semana con transición responsive
  - Eventos codificados por color (morado: evaluaciones, azul: terapias)
- **Gestión de eventos:**
  - Creación con validación en tiempo real (solapamientos, horarios)
  - Autogeneración de folios (ej: `F-AM3B7` para Ana Martínez)
  - Reprogramación desde detalles de evento


## 4. Motivación y relevancia del producto
El **SistemaDeGestionDeCitasClinicas** es esencial para la Clínica de Psicología del SEAP debido a que:

- **Aumenta la eficiencia operativa:** Al automatizar procesos manuales, el personal administrativo y los terapeutas pueden enfocarse en actividades de mayor valor agregado, reduciendo tiempos de espera y errores humanos.  
- **Mejora la calidad del servicio:** El control detallado de las sesiones y la posibilidad de medir indicadores (satisfacción, inasistencias, tiempos de espera) fomentan la mejora continua y la atención centrada en el paciente.  
- **Facilita la toma de decisiones:** La generación de reportes y análisis de datos en tiempo real aporta evidencia para optimizar recursos, diseñar nuevas estrategias de atención y proponer proyectos de vinculación o investigación.  
- **Refuerza la formación académica:** La participación de estudiantes y prestadores en la plataforma, con supervisión adecuada, enriquece su aprendizaje y garantiza un servicio supervisado de calidad.  
- **Promueve la sostenibilidad del servicio:** Al gestionar eficazmente los recursos y las cuotas de recuperación, se contribuye a la sustentabilidad económica y se demuestra el impacto positivo de la clínica en la comunidad.

## Application Definition

## 1. Objective of the application.
To modernize and automate appointment management at the SEAP Clinic of Psychology UADY by:

- **Optimization of resources:** Intelligent assignment of rooms, therapists and schedules with real-time validations.
- Information centralization:** Unified management of patient and professional data with automatic unique folios.
- Service improvement:** Visual indicators of daily load (color-coded) and printable report generation.


## 2. User roles implemented.
1. **Secretary/Administrator** (full prototype):
   - Appointment registration via dynamic form (`New Event`).
   - Rescheduling from event details (`Reschedule`)
   - Request management via dual inbox
   - Payment validation for therapies (PDF/IMG <5MB)

2. **Coordinator** (partially implemented):
   - Assignment of therapists according to event type.
   - Workload display by color (green/yellow/red)

3. **Therapist** (partially implemented):
   - Agenda display with session details
   - Basic progress log in detail modal


## 3. Key functionalities implemented in the prototyping. 
### Smart Agenda
- Dynamic visualization 
  - Day/week modes with responsive transition
  - Color-coded events (purple: evaluations, blue: therapies)
- Event management
  - Creation with real time validation (overlaps, schedules)
  - Auto-generation of folios (e.g. `F-AM3B7` for Ana Martinez)

## 4. Product Motivation and Relevance
The **ClinicalAppointmentManagementSystem** is essential to the SEAP Psychology Clinic because:

- **Increases operational efficiency:** By automating manual processes, administrative staff and therapists can focus on higher value-added activities, reducing wait times and human error.  
- Improves service quality:** Detailed control of sessions and the possibility of measuring indicators (satisfaction, no-shows, waiting times) encourage continuous improvement and patient-centered care.  
- Facilitates decision making:** The generation of reports and data analysis in real time provides evidence to optimize resources, design new care strategies and propose linkage or research projects.  
- Strengthens academic training:** The participatio

Translated with DeepL.com (free version)
