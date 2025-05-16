/* ========================================================================
   agenda.js – Agenda optimizada: manejo de fechas sin desfase UTC,
   ejemplos dinámicos solo en semana actual (L-V), sesiones mín. 1h,
   todo en español, tipos con colores
   ======================================================================== */

document.addEventListener('DOMContentLoaded', () => {
  // --- DOM ---
  const filtroPeriodo = document.getElementById('filterPeriod');
  const filtroFecha   = document.getElementById('filterDate');
  const btnAplicar    = document.getElementById('applyFilter');
  const calendario    = document.getElementById('calendarContainer');

  // Modal cita
  const modalCita     = document.getElementById('appointmentModal');
  const infoModal     = document.getElementById('modalInfo');
  const btnCerrarModal= document.getElementById('closeModal');

  // Modal nuevo evento
  const modalNuevo    = document.getElementById('newEventModal');
  const btnCerrarNuevo= document.getElementById('closeNewEventModal');
  const formNuevo     = document.getElementById('newEventForm');

  // Datos de citas reales
  const citasReales = [
    { id:1, paciente:'Juan Pérez López', terapia:'TCC',      fecha:'2025-04-21', inicio:'10:00', fin:'11:00', terapeuta:'Dra. Ana Rodríguez', sala:'Sala 101', descripcion:'Terapia cognitivo conductual' },
    { id:2, paciente:'Mariana López',    terapia:'Mindfulness', fecha:'2025-04-22', inicio:'09:00', fin:'10:00', terapeuta:'Lic. Gabriela Morales', sala:'Sala 102', descripcion:'Relajación y conciencia plena' },
    { id:3, titulo:'Junta clínica',               fecha:'2025-04-23', inicio:'12:00', fin:'13:30',                            sala:'Sala 103', descripcion:'Revisión de casos semanales' }
  ];

  // --- Utilidades de fecha ---
  const pad = n => String(n).padStart(2,'0');
  // Parsear 'YYYY-MM-DD' como fecha local sin desfase UTC
  const parseISODate = str => {
    const [y,m,d] = str.split('-').map(Number);
    return new Date(y, m - 1, d);
  };
  const añadeDías = (d,i) => { const r=new Date(d); r.setDate(r.getDate()+i); return r; };
  const aTextoISO = d => `${d.getFullYear()}-${pad(d.getMonth()+1)}-${pad(d.getDate())}`;
  const obtenerLunes = d => { const día=d.getDay(); return añadeDías(d, día===0?1:1-día); };
  const etiquetaDía = d => d.toLocaleDateString('es-ES',{ weekday:'short', day:'numeric', month:'short' });

  // --- Generación de ejemplos ---
  function ejemplosParaFecha(d) {
    const iso = aTextoISO(d);
    return [
      { id:`ex-${iso}-1`, paciente:'Ana Ejemplo', terapia:'Primer contacto', fecha:iso, inicio:'10:00', fin:'11:00', terapeuta:'Dra. Ana Rodríguez', sala:'Sala 101', descripcion:'Entrevista inicial' },
      { id:`ex-${iso}-2`, paciente:'Luis Ejemplo', terapia:'Terapia',          fecha:iso, inicio:'15:00', fin:'16:00', terapeuta:'Lic. Gabriela Morales', sala:'Sala 102', descripcion:'Sesión de seguimiento' }
    ];
  }
  function ejemplosParaSemana(inicio) {
    let arr = [];
    for (let i = 0; i < 5; i++) arr = arr.concat(ejemplosParaFecha(añadeDías(inicio, i)));
    return arr;
  }

  // --- Renderizado del calendario ---
  function renderCabecera(inicio, cols) {
    calendario.appendChild(Object.assign(document.createElement('div'),{ className:'day-header' }));
    for (let i = 0; i < cols; i++) {
      const celda = document.createElement('div');
      celda.className = 'day-header';
      celda.textContent = etiquetaDía(añadeDías(inicio, i));
      calendario.appendChild(celda);
    }
  }

  function renderFilas(inicio, cols) {
    for (let h = 9; h < 18; h++) {
      const th = document.createElement('div');
      th.className = 'time-cell';
      th.textContent = `${pad(h)}:00`;
      calendario.appendChild(th);
      for (let c = 0; c < cols; c++) {
        const cel = document.createElement('div');
        cel.className = 'empty-cell cell-container';
        const f = añadeDías(inicio, c);
        cel.dataset.fecha = aTextoISO(f);
        cel.dataset.hora  = `${pad(h)}:00`;
        cel.addEventListener('click', () => abrirNuevoEvento(cel.dataset.fecha, cel.dataset.hora));
        calendario.appendChild(cel);
      }
    }
  }

  function claseTipo(ter) {
    return 'tipo-' + ter.toLowerCase().replace(/\s+/g,'-');
  }

  function colocaCitas(citas, inicio, cols) {
    const fin = añadeDías(inicio, cols - 1);
    citas.forEach(c => {
      const fechaCita = parseISODate(c.fecha);
      if (fechaCita < inicio || fechaCita > fin) return;
      const sel = `.cell-container[data-fecha=\"${c.fecha}\"][data-hora=\"${c.inicio}\"]`;
      const cel = calendario.querySelector(sel);
      if (!cel) return;
      const div = document.createElement('div');
      div.classList.add('appointment');
      if (c.terapia) div.classList.add(claseTipo(c.terapia));
      div.textContent = c.paciente ? `${c.terapia} - ${c.paciente}` : c.titulo;
      div.title = `${c.inicio}–${c.fin}${c.terapeuta ? ` • ${c.terapeuta}` : ''}`;
      div.dataset.info = JSON.stringify(c);
      div.addEventListener('click', e => { e.stopPropagation(); muestraCita(c); });
      cel.appendChild(div);
    });
  }

  // --- Render principal según filtro ---
  function renderCalendario() {
    calendario.innerHTML = '';
    let ref = filtroFecha.value ? parseISODate(filtroFecha.value) : new Date();
    if ([0, 6].includes(ref.getDay())) {
      ref = obtenerLunes(ref);
      filtroFecha.value = aTextoISO(ref);
    }
    const modo = filtroPeriodo.value;

    if (modo === 'day') {
      calendario.style.gridTemplateColumns = '60px 1fr';
      renderCabecera(ref, 1);
      renderFilas(ref, 1);
      colocaCitas(citasReales.concat(ejemplosParaFecha(ref)), ref, 1);
    } else {
      const lunes = obtenerLunes(ref);
      calendario.style.gridTemplateColumns = '60px repeat(5, 1fr)';
      renderCabecera(lunes, 5);
      renderFilas(lunes, 5);
      colocaCitas(citasReales.concat(ejemplosParaSemana(lunes)), lunes, 5);
    }
  }

  // --- Modal cita ---
  function muestraCita(c) {
    infoModal.innerHTML =
      (c.paciente ? `<p><strong>Paciente:</strong> ${c.paciente}</p>` : `<p><strong>Evento:</strong> ${c.titulo}</p>`) +
      `<p><strong>Fecha:</strong> ${c.fecha}</p>` +
      `<p><strong>Hora:</strong> ${c.inicio} – ${c.fin}</p>` +
      (c.sala        ? `<p><strong>Sala:</strong> ${c.sala}</p>` : '') +
      (c.terapeuta   ? `<p><strong>Terapeuta:</strong> ${c.terapeuta}</p>` : '') +
      (c.descripcion ? `<p><strong>Descripción:</strong> ${c.descripcion}</p>` : '') +
      `<div class="form-actions"><button class="delete-btn" data-id="${c.id}">Eliminar</button></div>`;
    modalCita.style.display = 'block';
    modalCita.querySelector('.delete-btn').onclick = () => borraCita(c.id);
  }

  // --- Nuevo evento ---
  function abrirNuevoEvento(fecha, hora) {
    const d = parseISODate(fecha);
    if ([0, 6].includes(d.getDay())) { alert('No se permiten citas en fin de semana'); return; }
    formNuevo.reset();
    document.getElementById('eventDate').value      = fecha;
    document.getElementById('eventStartTime').value = hora;
    modalNuevo.style.display = 'block';
  }

  // --- Borrar cita real  ---
  function borraCita(id) {
    const idx = citasReales.findIndex(c => c.id === id);
    if (idx > -1) citasReales.splice(idx, 1);
    modalCita.style.display = 'none';
    renderCalendario();
  }

  // --- Listeners e init ---
  filtroPeriodo.addEventListener('change', renderCalendario);
  filtroFecha.addEventListener('change', renderCalendario);
  btnAplicar.addEventListener('click', renderCalendario);
  btnCerrarModal.addEventListener('click', () => modalCita.style.display = 'none');
  btnCerrarNuevo.addEventListener('click', () => modalNuevo.style.display = 'none');

  filtroFecha.value = aTextoISO(new Date());
  renderCalendario();
});
