

# **Nombre del Proceso:**  
## Consulta de pacientes

---

## **Objetivo**  
Buscar, filtrar y administrar el registro de pacientes activos, en espera o archivados, permitiendo acceder rápidamente a su información clave para la asignación de citas y seguimiento clínico.

---

## **Actores**  
- Secretaria: Realiza búsquedas y filtra pacientes según necesidades administrativas.
- Terapeutas: Consultan historial de pacientes asignados (en integración con historia clínica).

---

## **Entradas**  
- Nombre del paciente (para búsqueda directa)
- Tipo de servicio (evaluación/terapia)
- Estado (activo/en espera/archivado)
- Pacientes registrados almacenados en base de datos

---

## **Pasos**  
1. **Acceso al Módulo de Pacientes:**  
   La secretaria inicia sesión en el sistema y accede al módulo de gestión de pacientes, desde horarios disponibles en la página principal.
2. **Filtrado de pacientes:**  
   La secretaria ajusta filtros para buscar un paciente en específico, ya sea por nombre (parcial o completo) o por tipo de servicio y estado del paciente, los resultados se despliegan conforme se ajustan los filtros.
3. **Visualización de datos:**  
   El sistema despliega una lista con los pacientes coincidentes con los filtros, los resultados muestran el nombre, tipo y estado del servicio.
4. **Acceso a datos del paciemte**  
   La secretaria ingresa a uno de los resultados desplegados para acceder a datos de dicho paciente como, información básica, asistencias, acciones y documentos.

---

## **Excepciones**  
- **Sin resultados:**  
  Sistema notifica al usuario la ausencia de resultados de la búsqueda.

---

## **Resultados Esperados**  
- Listado filtrado de pacientes según criterios aplicados.
- Acceso rápido a información clave para gestión de citas.
- Identificación clara de estado (activo/en espera/archivado).

---

## **Notas Adicionales**  
- El filtro por "tipo de servicio" ayuda en asignación de terapeutas especializados.
- Cada paciente tiene folio único generado automáticamente al crearse el mismo.

---
