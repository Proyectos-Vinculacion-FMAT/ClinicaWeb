const consentimientoTemplate = `
<div class="document-form">
    <h1>Documento interno SEAP</h1>
    <p>Actualización 2024</p>
    
    <h2>CONSENTIMIENTO</h2>
    
    <p>A mi petición, la Facultad de Psicología de la Universidad Autónoma de Yucatán ha facilitado sus instalaciones y personal para brindarme a mí y a mi familia en su caso, el Servicio Externo de Apoyo Psicológico.</p>
    
    <p>Asimismo, he sido informado (a) de que todos los procedimientos serán realizados por estudiantes en entrenamiento que están bajo la supervisión de profesionales competentes.</p>
    
    <p>La información que el departamento o su personal obtenga durante las sesiones de atención psicológica puede ser importante o significativa desde un punto de vista profesional y/o educativo y por ello estoy de acuerdo con que la información pueda ser utilizada como recurso para algún propósito educativo razonable.</p>
    
    <p>Los estudiantes en entrenamiento podrían en ocasiones: observar, grabar (video o audio) y/o participar directamente en las sesiones como parte de su experiencia educativa.</p>
    
    <p>Por todo lo anterior, doy mi consentimiento y el de mi familia en su caso, para que este proceso se lleve a cabo.</p>
    
    <p>Cualquier información que sea revelada en las sesiones de atención psicológica será mantenida confidencialmente entre los estudiantes y supervisores, excepto cuando se juzgue, con base en una evidencia particular o informe, que el cliente esté involucrado en un acto criminal o tenga probabilidades de dañarse a sí mismo, o a algún tercero.</p>
    
    <p>El cliente o la familia, tienen el derecho de abandonar el programa en cualquier momento sin perjuicio para ellos.</p>
    
    <div class="form-section">
        <label for="firma-consentimiento">Firma del Cliente:</label>
        <input type="text" id="firma-consentimiento" name="firma-consentimiento" required>
    </div>
    
    <div class="form-section">
        <label for="nombre-consentimiento">NOMBRE:</label>
        <input type="text" id="nombre-consentimiento" name="nombre-consentimiento" required>
    </div>
    
    <div class="form-section">
        <label for="fecha-consentimiento">FECHA:</label>
        <input type="date" id="fecha-consentimiento" name="fecha-consentimiento" required>
    </div>
</div>
`;

const consentimientoValidator = (formData) => {
    const errors = [];
    if (!formData.get('firma-consentimiento')) errors.push('La firma es requerida');
    if (!formData.get('nombre-consentimiento')) errors.push('El nombre es requerido');
    if (!formData.get('fecha-consentimiento')) errors.push('La fecha es requerida');
    return errors;
};

export { consentimientoTemplate, consentimientoValidator };