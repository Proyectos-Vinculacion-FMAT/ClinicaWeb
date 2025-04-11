document.addEventListener('DOMContentLoaded', function() {
  // Simulación de datos para el calendario de citas
  const citas = [
    { fecha: "2025-04-15", paciente: "María Aguilar", terapeuta: "Victor Sánchez", consultorio: "Sala 1", estado: "Programada" },
    { fecha: "2025-04-16", paciente: "Juan Pérez", terapeuta: "Laura Gómez", consultorio: "Sala 2", estado: "Reprogramada" },
    { fecha: "2025-04-17", paciente: "Ana García", terapeuta: "Carlos Ruiz", consultorio: "Sala 3", estado: "Cancelada" },
    { fecha: "2025-04-18", paciente: "Luis Martínez", terapeuta: "Marta Ortega", consultorio: "Sala 1", estado: "Programada" }
  ];
  
  // Renderiza el listado de citas (calendario de citas)
  const calendarTableBody = document.querySelector('#calendarTable tbody');
  function renderCitasCalendario() {
    calendarTableBody.innerHTML = '';
    citas.forEach(cita => {
      const row = document.createElement('tr');
      row.innerHTML = `
        <td>${cita.fecha}</td>
        <td>${cita.paciente}</td>
        <td>${cita.terapeuta}</td>
        <td>${cita.consultorio}</td>
        <td>${cita.estado}</td>
      `;
      calendarTableBody.appendChild(row);
    });
  }
  renderCitasCalendario();
  
  // Simulación de datos para el cumplimiento del expediente
  const expedientes = [
    { paciente: "María Aguilar", completado: "80%", estado: "En progreso" },
    { paciente: "Juan Pérez", completado: "100%", estado: "Completo" },
    { paciente: "Ana García", completado: "60%", estado: "Pendiente" },
    { paciente: "Luis Martínez", completado: "90%", estado: "Casi Completo" }
  ];
  
  // Renderiza el cumplimiento del expediente
  const expedienteTableBody = document.querySelector('#expedienteTable tbody');
  function renderExpedientes() {
    expedienteTableBody.innerHTML = '';
    expedientes.forEach((expediente, index) => {
      const row = document.createElement('tr');
      row.innerHTML = `
        <td>${index + 1}</td>
        <td>${expediente.paciente}</td>
        <td>${expediente.completado}</td>
        <td>${expediente.estado}</td>
      `;
      expedienteTableBody.appendChild(row);
    });
  }
  renderExpedientes();
});

