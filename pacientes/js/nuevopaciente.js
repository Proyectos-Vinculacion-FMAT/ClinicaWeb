document.addEventListener("DOMContentLoaded", () => {
    // Función para mostrar notificaciones
    const showNotification = (elemId, message, isSuccess = true) => {
      const notif = document.getElementById(elemId);
      notif.textContent = message;
      notif.style.backgroundColor = isSuccess ? "#5e4b8b" : "#e74c3c";
      notif.classList.remove("hidden");
      notif.classList.add("show");
      setTimeout(() => {
        notif.classList.remove("show");
        notif.classList.add("hidden");
      }, 3000);
    };
  
    // Validación básica para el formulario de solicitud
    const formSolicitud = document.getElementById("form-solicitud");
    if (formSolicitud) {
      formSolicitud.addEventListener("submit", (e) => {
        e.preventDefault();
        // Se podría ampliar con validaciones específicas por sección
        if (formSolicitud.checkValidity()) {
          showNotification("notif-solicitud", "Solicitud enviada correctamente ✅");
          formSolicitud.reset();
          // Aquí se podrían borrar datos del localStorage si se usara
        } else {
          showNotification("notif-solicitud", "Por favor complete los campos obligatorios", false);
        }
      });
    }
  
    // Validación básica para el formulario de encuesta
    const formNSE = document.getElementById("form-nse");
    if (formNSE) {
      formNSE.addEventListener("submit", (e) => {
        e.preventDefault();
        if (formNSE.checkValidity()) {
          showNotification("notif-nse", "Encuesta enviada correctamente ✅");
          formNSE.reset();
        } else {
          showNotification("notif-nse", "Por favor complete los campos obligatorios", false);
        }
      });
    }
  });
  