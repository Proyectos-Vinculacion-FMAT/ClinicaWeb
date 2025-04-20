const encuestaNseTemplate = `
<div class="document-form">
    <h1>Encuesta de Nivel Socioeconómico</h1>
    <h2>Servicios Psicológicos, Facultad de Psicología, UADY.</h2>
    
    <p>Buen día, te invitamos a llenar el siguiente formulario con lo que se te solicita.</p>
    
    <p><em>* Obligatoria</em></p>
    
    <div class="form-section">
        <h3>1. Confirmación de aviso de privacidad:</h3>
        <p>[Texto completo del aviso de privacidad]</p>
        <div class="radio-group">
            <label><input type="radio" name="privacy1" value="si" required> Si acepto.</label>
            <label><input type="radio" name="privacy1" value="no"> No acepto.</label>
        </div>
    </div>
    
    <div class="form-section">
        <h3>2. Confirmación de aviso de privacidad:</h3>
        <p>[Texto completo del aviso de privacidad]</p>
        <div class="radio-group">
            <label><input type="radio" name="privacy2" value="si" required> Si acepto.</label>
            <label><input type="radio" name="privacy2" value="no"> No acepto.</label>
        </div>
    </div>
    
    <div class="form-section">
        <label for="folio">3. Por favor, escriba el FOLIO asignado durante su llenado de solicitud:</label>
        <input type="text" id="folio" name="folio" required>
    </div>
    
    <div class="form-section">
        <label for="nombre-completo">4. ¿Cuál es tu nombre completo?</label>
        <input type="text" id="nombre-completo" name="nombre-completo" required>
    </div>
    
    <div class="form-section">
        <label for="correo">5. ¿Cuál es tu correo electrónico?</label>
        <input type="email" id="correo" name="correo" required>
    </div>
    
    <div class="form-section">
        <label for="celular">6. ¿Cuál es tu número de celular?</label>
        <input type="tel" id="celular" name="celular" required>
    </div>
    
    <!-- Más preguntas de la encuesta... -->
</div>
`;

const encuestaNseValidator = (formData) => {
    const errors = [];
    if (!formData.get('privacy1')) errors.push('Debe aceptar el primer aviso de privacidad');
    if (!formData.get('privacy2')) errors.push('Debe aceptar el segundo aviso de privacidad');
    if (!formData.get('folio')) errors.push('El folio es requerido');
    if (!formData.get('nombre-completo')) errors.push('El nombre completo es requerido');
    
    const email = formData.get('correo');
    if (!email) {
        errors.push('El correo electrónico es requerido');
    } else if (!/^\S+@\S+\.\S+$/.test(email)) {
        errors.push('El correo electrónico no es válido');
    }
    
    if (!formData.get('celular')) errors.push('El número de celular es requerido');
    return errors;
};

export { encuestaNseTemplate, encuestaNseValidator };