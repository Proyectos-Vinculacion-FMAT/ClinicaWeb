const derechosClienteTemplate = `
<div class="document-form">
    <h1>Documento Interno SEAP</h1>
    <p>Actualización 2024</p>
    
    <h2>DERECHOS DEL CLIENTE</h2>
    
    <p>El cliente del Servicio Externo de Apoyo Psicológico (SEAP) de la Facultad de Psicología tiene los siguientes derechos:</p>
    
    <ol>
        <li>De ser tratado con respeto y consideración en su dignidad, autonomía y privacidad personal.</li>
        <li>De ser informado de las condiciones del servicio que se le propone o del servicio que está recibiendo actualmente, de las terapias o tratamientos y de las alternativas que se le puedan ofrecer, todo ello en un lenguaje que sea claro y entendible.</li>
        <li>De permitir o rehusarse a cualquier tratamiento o terapia con el que no esté de acuerdo. Un padre o tutor puede consentir o negar cualquier servicio o terapia en nombre de un cliente menor de edad.</li>
        <li>De ser advertido y de rehusarse a ser observado por espejos de una sola visión, grabadoras, películas o fotografías.</li>
        <li>De que su caso se lleve con la más estricta confidencialidad, excepto cuando se juzgue, con base en una evidencia particular o informe, que el cliente que esté involucrado en un acto criminal o tenga probabilidades de dañarse a sí mismo, o a algún tercero.</li>
        <li>De ser informado con anticipación de las razones por las cuales se le suspende el servicio y de recibir una explicación del porqué se tomó esta determinación.</li>
        <li>De ser atendido independientemente de su religión, raza, estilo de vida, sexo, edad, discapacidad física, etc.</li>
        <li>De conocer el costo del servicio.</li>
    </ol>
    
    <div class="form-section">
        <label for="fecha-derechos">FECHA:</label>
        <input type="date" id="fecha-derechos" name="fecha-derechos" required>
    </div>
    
    <div class="signature-field">
        <label for="firma-derechos">Nombre y firma del Cliente:</label>
        <input type="text" id="firma-derechos" name="firma-derechos" required>
    </div>
</div>
`;

// Validador específico para Derechos del Cliente
const derechosClienteValidator = (formData) => {
    const errors = [];
    if (!formData.get('fecha-derechos')) errors.push('La fecha es requerida');
    if (!formData.get('firma-derechos')) errors.push('La firma es requerida');
    return errors;
};

export { derechosClienteTemplate, derechosClienteValidator };