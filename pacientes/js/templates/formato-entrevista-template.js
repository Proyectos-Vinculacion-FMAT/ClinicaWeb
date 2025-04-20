const formatoEntrevistaTemplate = `
<div class="document-form">
    <h1>Formato de entrevista inicial</h1>
    <h2>Servicio Externo en Psicología Clínica</h2>
    
    <div class="form-section">
        <label for="fecha-entrevista">Fecha de llenado:</label>
        <input type="date" id="fecha-entrevista" name="fecha-entrevista" required>
    </div>
    
    <div class="form-section">
        <label for="folio-entrevista">Folio:</label>
        <input type="text" id="folio-entrevista" name="folio-entrevista">
    </div>
    
    <h3>PARA LLENADO DE ADMINISTRACIÓN Y COORDINACIÓN</h3>
    <div class="checkbox-group">
        <label><input type="checkbox" name="base-datos"> BASE DE DATOS ( )</label>
        <label><input type="checkbox" name="camp"> CAMP ( )</label>
        <label><input type="checkbox" name="fac"> FAC ( )</label>
        <label><input type="checkbox" name="lic"> LIC ( )</label>
    </div>
    
    <!-- Más secciones del formato de entrevista... -->
    
    <div class="form-section">
        <p><em>Manifiesto que los datos que he proporcionado son verdaderos.</em></p>
        <p><em>"Estoy consciente de que existe una amplia lista de espera..."</em></p>
        
        <div class="signature-field">
            <label for="firma-entrevista">Firma del Solicitante:</label>
            <input type="text" id="firma-entrevista" name="firma-entrevista" required>
        </div>
    </div>
    
    <div class="form-section">
        <label for="entrevistador">Entrevistador:</label>
        <input type="text" id="entrevistador" name="entrevistador">
    </div>
</div>
`;

const formatoEntrevistaValidator = (formData) => {
    const errors = [];
    if (!formData.get('fecha-entrevista')) errors.push('La fecha es requerida');
    if (!formData.get('firma-entrevista')) errors.push('La firma del solicitante es requerida');
    return errors;
};

export { formatoEntrevistaTemplate, formatoEntrevistaValidator };