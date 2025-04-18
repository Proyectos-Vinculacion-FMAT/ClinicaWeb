document.addEventListener("DOMContentLoaded", () => {
    // Elementos del DOM
    const searchForm = document.getElementById("searchForm");
    const appointmentInfo = document.getElementById("appointmentInfo");
    const reprogramSection = document.getElementById("reprogramSection");
    const reprogramStatus = document.getElementById("reprogramStatus");
    const requestReprogramBtn = document.getElementById("requestReprogramBtn");
    const cancelReprogramBtn = document.getElementById("cancelReprogramBtn");
    const reprogramForm = document.getElementById("reprogramForm");
  
    // Datos de ejemplo (simulando una base de datos)
    const sampleAppointments = [
      {
        name: "Juan Pérez López",
        tutor: "María García Méndez",
        email: "juan.perez@example.com",
        phone: "5551234567",
        date: "2023-12-15",
        time: "10:00",
        specialist: "Dra. Ana Rodríguez",
        location: "Consultorio 3, Piso 2",
        reprogramRequest: null
      },
      {
        name: "Pedro Martínez",
        tutor: null,
        email: "pedro.martinez@example.com",
        phone: "5557654321",
        date: "2023-12-20",
        time: "16:30",
        specialist: "Dr. Carlos Sánchez",
        location: "Consultorio 5, Piso 1",
        reprogramRequest: {
          status: "approved",
          reason: "emergency",
          details: "Necesito viajar por emergencia familiar",
          preferredDate: "2023-12-22",
          preferredTime: "11:00",
          newDate: "2023-12-22",
          newTime: "11:30"
        }
      }
    ];
  
    // Buscar cita
    searchForm.addEventListener("submit", (e) => {
      e.preventDefault();
      
      const name = document.getElementById("searchName").value.toLowerCase();
      const contact = document.getElementById("searchContact").value.toLowerCase();
      
      // Buscar en los datos de ejemplo
      const appointment = sampleAppointments.find(app => 
        (app.name.toLowerCase().includes(name) || 
         (app.tutor && app.tutor.toLowerCase().includes(name))) &&
        (app.email.toLowerCase().includes(contact) || 
         app.phone.includes(contact))
      );
      
      if (appointment) {
        // Mostrar información de la cita
        document.getElementById("appointmentDate").textContent = formatDate(appointment.date);
        document.getElementById("appointmentTime").textContent = appointment.time;
        document.getElementById("appointmentSpecialist").textContent = appointment.specialist;
        document.getElementById("appointmentLocation").textContent = appointment.location;
        
        appointmentInfo.classList.remove("hidden");
        
        // Mostrar estado de reprogramación si existe
        if (appointment.reprogramRequest) {
          showReprogramStatus(appointment.reprogramRequest);
        } else {
          reprogramStatus.classList.add("hidden");
        }
      } else {
        alert("No se encontró ninguna cita con los datos proporcionados");
      }
    });
  
    // Solicitar reprogramación
    requestReprogramBtn.addEventListener("click", () => {
      appointmentInfo.classList.add("hidden");
      reprogramSection.classList.remove("hidden");
    });
  
    // Cancelar reprogramación
    cancelReprogramBtn.addEventListener("click", () => {
      reprogramSection.classList.add("hidden");
      appointmentInfo.classList.remove("hidden");
    });
  
    // Enviar solicitud de reprogramación
    reprogramForm.addEventListener("submit", (e) => {
      e.preventDefault();
      
      const reason = document.getElementById("reprogramReason").value;
      const details = document.getElementById("reprogramDetails").value;
      const preferredDate = document.getElementById("preferredDate").value;
      const preferredTime = document.getElementById("preferredTime").value;
      
      // Aquí normalmente enviarías los datos al servidor
      // Simulamos una respuesta exitosa
      const requestData = {
        status: "pending",
        reason: document.getElementById("reprogramReason").options[document.getElementById("reprogramReason").selectedIndex].text,
        details: details,
        preferredDate: preferredDate,
        preferredTime: preferredTime
      };
      
      // Mostrar estado de la solicitud
      showReprogramStatus(requestData);
      
      // Limpiar formulario
      reprogramForm.reset();
      reprogramSection.classList.add("hidden");
    });
  
    // Función para mostrar el estado de reprogramación
    function showReprogramStatus(request) {
      document.getElementById("requestStatus").textContent = 
        request.status === "pending" ? "En revisión" : 
        request.status === "approved" ? "Aprobada" : "Rechazada";
      
      document.getElementById("requestStatus").className = 
        request.status === "pending" ? "status-pending" : 
        request.status === "approved" ? "status-approved" : "status-rejected";
      
      document.getElementById("requestedDate").textContent = 
        `${formatDate(request.preferredDate)} a las ${request.preferredTime}`;
      
      document.getElementById("requestedReason").textContent = request.reason;
      
      if (request.status === "approved") {
        document.getElementById("newAppointmentDate").textContent = formatDate(request.newDate);
        document.getElementById("newAppointmentTime").textContent = request.newTime;
        document.getElementById("resolutionDetails").classList.remove("hidden");
      } else {
        document.getElementById("resolutionDetails").classList.add("hidden");
      }
      
      reprogramStatus.classList.remove("hidden");
    }
  
    // Función para formatear fechas
    function formatDate(dateString) {
      const options = { weekday: 'long', year: 'numeric', month: 'long', day: 'numeric' };
      return new Date(dateString).toLocaleDateString('es-ES', options);
    }
  });