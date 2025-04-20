const contratoTemplate = `
<div class="document-form">
    <h1>CONTRATO DE ATENCIÓN PSICOLÓGICA</h1>
    
    ${Array.from({length: 14}, (_, i) => `
    <div class="contract-clause">
        <p>${i+1}. [Texto de la cláusula ${i+1} según el documento original]</p>
        <label><input type="checkbox" name="acepta-clausula${i+1}" required> Acepto</label>
    </div>
    `).join('')}
    
    <div class="signature-section">
        <div class="form-section">
            <label for="nombre-contrato">YO</label>
            <input type="text" id="nombre-contrato" name="nombre-contrato" required>
        </div>
        
        <div class="form-section">
            <label for="domicilio-contrato">CON DOMICILIO EN</label>
            <input type="text" id="domicilio-contrato" name="domicilio-contrato" required>
        </div>
        
        <div class="form-section">
            <label for="identificacion-contrato">ME IDENTIFICO CON</label>
            <input type="text" id="identificacion-contrato" name="identificacion-contrato" required>
        </div>
        
        <p>MANIFIESTO ESTAR DE ACUERDO CON LAS ANTERIORES CONDICIONES DE TRABAJO TERAPÉUTICO PROPUESTOS POR LA FACULTAD DE PSICOLOGÍA DE LA UNIVERSIDAD AUTÓNOMA DE YUCATÁN.</p>
        
        <p>MANIFIESTO QUE HE ENTENDIDO Y ACEPTADO LAS CONDICIONES QUE ANTECEDEN</p>
        
        <div class="form-section">
            <label for="fecha-contrato">FECHA:</label>
            <input type="date" id="fecha-contrato" name="fecha-contrato" required>
        </div>
        
        <div class="signature-field">
            <label for="firma-contrato">Nombre y firma del paciente:</label>
            <input type="text" id="firma-contrato" name="firma-contrato" required>
        </div>
    </div>
</div>
`;

const contratoValidator = (formData) => {
    const errors = [];
    // Verificar que todas las cláusulas estén aceptadas
    for (let i = 1; i <= 14; i++) {
        if (!formData.get(`acepta-clausula${i}`)) {
            errors.push(`Debe aceptar la cláusula ${i}`);
            break;
        }
    }
    if (!formData.get('nombre-contrato')) errors.push('El nombre es requerido');
    if (!formData.get('domicilio-contrato')) errors.push('El domicilio es requerido');
    if (!formData.get('identificacion-contrato')) errors.push('El documento de identificación es requerido');
    if (!formData.get('fecha-contrato')) errors.push('La fecha es requerida');
    if (!formData.get('firma-contrato')) errors.push('La firma es requerida');
    return errors;
};

export { contratoTemplate, contratoValidator };