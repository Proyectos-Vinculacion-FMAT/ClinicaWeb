document.addEventListener("DOMContentLoaded", () => {
  class DynamicCalendar {
    constructor() {
      this.currentDate = new Date();
      this.selectedDate = null;
      this.monthNames = [
        "Enero", "Febrero", "Marzo", "Abril", "Mayo", "Junio",
        "Julio", "Agosto", "Septiembre", "Octubre", "Noviembre", "Diciembre"
      ];
      this.dayNames = ["Domingo", "Lunes", "Martes", "Miércoles", "Jueves", "Viernes", "Sábado"];
      this.init();
    }

    init() {
      this.renderCalendar();
      this.addEventListeners();
    }

    addEventListeners() {
      document.querySelector('.prev').addEventListener('click', () => this.changeMonth(-1));
      document.querySelector('.next').addEventListener('click', () => this.changeMonth(1));
    }

    renderCalendar() {
      const calendarMonth = document.querySelector('.calendar-month');
      const calendarDates = document.getElementById('calendarDates');
      
      const year = this.currentDate.getFullYear();
      const month = this.currentDate.getMonth();
      
      calendarMonth.textContent = `${this.monthNames[month]} ${year}`;
      
      const firstDay = new Date(year, month, 1);
      const lastDay = new Date(year, month + 1, 0);
      const prevLastDay = new Date(year, month, 0).getDate();
      const today = new Date();
      today.setHours(0, 0, 0, 0);
      
      let datesHTML = '';
      
      // Días del mes anterior
      for(let i = firstDay.getDay(); i > 0; i--) {
        datesHTML += `<span class="inactive past-date">${prevLastDay - i + 1}</span>`;
      }
      
      // Días del mes actual
      for(let i = 1; i <= lastDay.getDate(); i++) {
        const currentDate = new Date(year, month, i);
        const isSelected = this.selectedDate?.toDateString() === currentDate.toDateString();
        const isPastDate = currentDate < today;
        
        if (isPastDate) {
          datesHTML += `<span class="inactive past-date">${i}</span>`;
        } else {
          datesHTML += `<span${isSelected ? ' class="selected"' : ''}>${i}</span>`;
        }
      }
      
      // Días del próximo mes
      const spansCount = datesHTML.match(/<span/g)?.length || 0;
      const nextDays = spansCount % 7 === 0 ? 0 : (7 - (spansCount % 7));
      for(let i = 1; i <= nextDays; i++) {
        datesHTML += `<span class="inactive">${i}</span>`;
      }
      
      calendarDates.innerHTML = datesHTML;
      
      calendarDates.querySelectorAll('span').forEach((date, index) => {
        date.addEventListener('click', () => {
          const clickedDate = new Date(year, month, index + 1 - firstDay.getDay());
          if(clickedDate.getMonth() === month && !date.classList.contains('past-date')) {
            this.selectDate(clickedDate);
          }
        });
      });
    }

    selectDate(date) {
      this.selectedDate = date;
      const selectedDateEl = document.querySelector(".selected-date");
      selectedDateEl.textContent = `${this.dayNames[date.getDay()]}, ${date.getDate()} ${this.monthNames[date.getMonth()]} ${date.getFullYear()}`;
      this.renderCalendar();
    }

    changeMonth(offset) {
      this.currentDate.setMonth(this.currentDate.getMonth() + offset);
      this.renderCalendar();
    }
  }

  // Inicializar calendario
  const calendar = new DynamicCalendar();

  // Elementos del formulario
  const form = document.querySelector("form");
  const inputs = form.querySelectorAll("input");
  const cancelButton = document.getElementById("cancelButton");
  const notification = document.getElementById("notification");
  const tutorSection = document.getElementById("tutorSection");
  const fechaNacimiento = document.getElementById("fechaNacimiento");

  // Validaciones
  const validations = {
    'Correo electrónico': value => /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(value),
    'Número telefónico': value => /^\d{10}$/.test(value),
    'Edad del tutor': value => value >= 18,
    'Fecha de nacimiento': value => {
      const fecha = new Date(value);
      const hoy = new Date();
      return fecha <= hoy;
    }
  };

  // Función para calcular la edad
  function calcularEdad(fechaNacimiento) {
    const hoy = new Date();
    const fechaNac = new Date(fechaNacimiento);
    let edad = hoy.getFullYear() - fechaNac.getFullYear();
    const mes = hoy.getMonth() - fechaNac.getMonth();
    
    if (mes < 0 || (mes === 0 && hoy.getDate() < fechaNac.getDate())) {
      edad--;
    }
    
    return edad;
  }

  // Mostrar/ocultar sección de tutor según la edad
  function actualizarSeccionTutor() {
    if (fechaNacimiento.value) {
      const edad = calcularEdad(fechaNacimiento.value);
      if (edad < 18) {
        tutorSection.classList.remove("hidden");
        // Hacer requeridos los campos del tutor
        document.getElementById("tutorNombre").required = true;
        document.getElementById("tutorPrimerApellido").required = true;
        document.getElementById("tutorEdad").required = true;
        document.getElementById("tutorParentesco").required = true;
      } else {
        tutorSection.classList.add("hidden");
        // Quitar el requerido de los campos del tutor
        document.getElementById("tutorNombre").required = false;
        document.getElementById("tutorPrimerApellido").required = false;
        document.getElementById("tutorEdad").required = false;
        document.getElementById("tutorParentesco").required = false;
      }
    }
  }

  // Evento para fecha de nacimiento
  fechaNacimiento.addEventListener("change", function() {
    if (this.value && validations['Fecha de nacimiento'](this.value)) {
      this.style.borderColor = "#ccc";
      actualizarSeccionTutor();
    } else if (this.value) {
      this.style.borderColor = "red";
      showNotification("La fecha de nacimiento no puede ser futura", false);
    }
  });

  // Restaurar datos guardados
  const savedFormData = localStorage.getItem("formData");
  if (savedFormData) {
    const data = JSON.parse(savedFormData);
    inputs.forEach(input => {
      if (data[input.id]) {
        input.value = data[input.id];
      }
    });
    // Verificar si hay que mostrar la sección del tutor
    if (fechaNacimiento.value) {
      actualizarSeccionTutor();
    }
  }

  // Función para mostrar la notificación
  const showNotification = (message, success = true) => {
    notification.textContent = message;
    notification.style.backgroundColor = success ? "#5e4b8b" : "#e74c3c";
    notification.classList.remove("hidden");
    notification.classList.add("show");

    setTimeout(() => {
      notification.classList.remove("show");
      notification.classList.add("hidden");
    }, 3000);
  };

  // Guardado automático de datos
  const savePartialData = () => {
    const formData = {};
    inputs.forEach(input => {
      if (input.value.trim()) {
        formData[input.id] = input.value.trim();
      }
    });
    localStorage.setItem("formData", JSON.stringify(formData));
  };

  // Evento de submit del formulario
  form.addEventListener("submit", (e) => {
    e.preventDefault();
    let isValid = true;
    const errors = [];
    const formData = {};

    inputs.forEach(input => {
      if (input.id.startsWith("tutor") && tutorSection.classList.contains("hidden")) {
        return; // Saltar campos de tutor si no son necesarios
      }

      const value = input.value.trim();
      const fieldName = input.parentElement.firstChild.textContent.trim(); 

      if (input.required && !value) {
        isValid = false;
        input.style.borderColor = "red";
        errors.push(`${fieldName} es requerido`);
      } else if (validations[fieldName] && !validations[fieldName](value)) {
        isValid = false;
        input.style.borderColor = "red";
        errors.push(`Formato inválido para ${fieldName}`);
      } else {
        input.style.borderColor = "#ccc";
      }
      if (value) formData[input.id] = value;
    });

    if (!calendar.selectedDate) {
      isValid = false;
      errors.push("Selecciona una fecha");
    }
  
    if (isValid) {
      showNotification("Cita agendada correctamente ✅");
      localStorage.removeItem("formData");
      form.reset();
      calendar.selectedDate = null;
      document.querySelector(".selected-date").textContent = "Selecciona la fecha";
      tutorSection.classList.add("hidden");
    } else {
      localStorage.setItem("formData", JSON.stringify(formData));
      showNotification(`Errores: ${errors.join(', ')}`, false);
    }
  });

  // Evento para el botón de cancelar del formulario
  cancelButton.addEventListener("click", (e) => {
    e.preventDefault();
    inputs.forEach(input => {
      input.value = "";
      input.style.borderColor = "#ccc";
    });
    localStorage.removeItem("formData");
    showNotification("Datos eliminados", false);
    tutorSection.classList.add("hidden");
  });

  // Validación en tiempo real
  inputs.forEach(input => {
    input.addEventListener('blur', () => {
      const value = input.value.trim();
      const fieldName = input.parentElement.firstChild.textContent.trim();
      
      if (validations[fieldName] && value && !validations[fieldName](value)) {
        input.style.borderColor = "red";
      } else {
        input.style.borderColor = "#ccc";
      }
      savePartialData();
    });
  });
});