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
      // Suponiendo que el icono de edición se quiera usar para mostrar/ocultar el calendario
      const editIcon = document.querySelector('.edit-icon');
      if (editIcon) {
        editIcon.addEventListener('click', () => this.toggleCalendar());
      }
      // Agregar listener al botón de confirmar del calendario para disparar el submit del formulario
      const calendarConfirm = document.querySelector('.calendar-buttons .confirm');
      if (calendarConfirm) {
        calendarConfirm.addEventListener('click', () => {
          document.querySelector('form').dispatchEvent(new Event('submit', { cancelable: true, bubbles: true }));
        });
      }
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
      
      let datesHTML = '';
      
      // Días del mes anterior
      for(let i = firstDay.getDay(); i > 0; i--) {
        datesHTML += `<span class="inactive">${prevLastDay - i + 1}</span>`;
      }
      
      // Días del mes actual
      for(let i = 1; i <= lastDay.getDate(); i++) {
        const currentDate = new Date(year, month, i);
        const isSelected = this.selectedDate?.toDateString() === currentDate.toDateString();
        datesHTML += `<span${isSelected ? ' class="selected"' : ''}>${i}</span>`;
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
          if(clickedDate.getMonth() === month) this.selectDate(clickedDate);
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

    toggleCalendar() {
      document.querySelector('.calendar-grid').classList.toggle('active');
    }
  }

  // Inicializar calendario
  const calendar = new DynamicCalendar();

  // Elementos del formulario
  const form = document.querySelector("form");
  const inputs = form.querySelectorAll("input");
  const cancelButton = form.querySelector("button[type='button']");
  const notification = document.getElementById("notification");

  // Validaciones
  const validations = {
    'Correo electrónico': value => /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(value),
    'Número telefónico': value => /^\d{10}$/.test(value)
  };

  // Restaurar datos guardados
  const savedFormData = localStorage.getItem("formData");
  if (savedFormData) {
    const data = JSON.parse(savedFormData);
    inputs.forEach(input => {
      if (data[input.id]) {
        input.value = data[input.id];
      }
    });
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
      const value = input.value.trim();
      // Se extrae el nombre del campo usando el primer nodo de texto del label
      const fieldName = input.parentElement.firstChild.textContent.trim(); 

      if (!value) {
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
  });

  // Validación en tiempo real con corrección en la extracción del nombre del campo
  inputs.forEach(input => {
    input.addEventListener('blur', () => {
      const value = input.value.trim();
      // Usamos el primer nodo de texto del label en lugar de previousSibling
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
