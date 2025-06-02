<!DOCTYPE html>
<html lang="es">
<head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <title>Síntesis de Entrevistas - Clínica de Psicología SEAP</title>
    <style>
        * {
            margin: 0;
            padding: 0;
            box-sizing: border-box;
        }
        
        body {
            font-family: 'Segoe UI', Tahoma, Geneva, Verdana, sans-serif;
            line-height: 1.6;
            color: #333;
            background: linear-gradient(135deg, #667eea 0%, #764ba2 100%);
            min-height: 100vh;
            padding: 20px;
        }
        
        .container {
            max-width: 1200px;
            margin: 0 auto;
            background: rgba(255, 255, 255, 0.95);
            border-radius: 20px;
            box-shadow: 0 20px 40px rgba(0, 0, 0, 0.1);
            backdrop-filter: blur(10px);
            overflow: hidden;
        }
        
        .header {
            background: linear-gradient(135deg, #1e3c72 0%, #2a5298 100%);
            color: white;
            padding: 40px;
            text-align: center;
            position: relative;
            overflow: hidden;
        }
        
        .header::before {
            content: '';
            position: absolute;
            top: -50%;
            left: -50%;
            width: 200%;
            height: 200%;
            background: url('data:image/svg+xml,<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 100 100"><defs><pattern id="grain" width="100" height="100" patternUnits="userSpaceOnUse"><circle cx="25" cy="25" r="1" fill="rgba(255,255,255,0.1)"/><circle cx="75" cy="75" r="1" fill="rgba(255,255,255,0.1)"/><circle cx="50" cy="10" r="0.5" fill="rgba(255,255,255,0.05)"/><circle cx="10" cy="60" r="0.5" fill="rgba(255,255,255,0.05)"/></pattern></defs><rect width="100" height="100" fill="url(%23grain)"/></svg>');
            animation: float 20s ease-in-out infinite;
        }
        
        @keyframes float {
            0%, 100% { transform: translateY(0px) rotate(0deg); }
            50% { transform: translateY(-20px) rotate(180deg); }
        }
        
        .header h1 {
            font-size: 2.5em;
            margin-bottom: 10px;
            position: relative;
            z-index: 1;
            text-shadow: 2px 2px 4px rgba(0, 0, 0, 0.3);
        }
        
        .header p {
            font-size: 1.1em;
            opacity: 0.9;
            position: relative;
            z-index: 1;
        }
        
        .content {
            padding: 40px;
        }
        
        .intro {
            background: linear-gradient(135deg, #f093fb 0%, #f5576c 100%);
            color: white;
            padding: 30px;
            border-radius: 15px;
            margin-bottom: 40px;
            box-shadow: 0 10px 25px rgba(240, 147, 251, 0.3);
            transform: perspective(1000px) rotateX(2deg);
            transition: transform 0.3s ease;
        }
        
        .intro:hover {
            transform: perspective(1000px) rotateX(0deg);
        }
        
        .intro p {
            font-size: 1.1em;
            text-shadow: 1px 1px 2px rgba(0, 0, 0, 0.2);
        }
        
        .section {
            margin-bottom: 50px;
            background: white;
            border-radius: 15px;
            padding: 35px;
            box-shadow: 0 15px 35px rgba(0, 0, 0, 0.1);
            border: 1px solid rgba(255, 255, 255, 0.2);
            transition: transform 0.3s ease, box-shadow 0.3s ease;
        }
        
        .section:hover {
            transform: translateY(-5px);
            box-shadow: 0 20px 45px rgba(0, 0, 0, 0.15);
        }
        
        .section h2 {
            color: #2c3e50;
            font-size: 2em;
            margin-bottom: 25px;
            padding-bottom: 15px;
            border-bottom: 3px solid;
            position: relative;
        }
        
        .section:nth-child(2) h2 {
            border-bottom-color: #e74c3c;
            color: #c0392b;
        }
        
        .section:nth-child(3) h2 {
            border-bottom-color: #3498db;
            color: #2980b9;
        }
        
        .section:nth-child(4) h2 {
            border-bottom-color: #27ae60;
            color: #229954;
        }
        
        .section h2::after {
            content: '';
            position: absolute;
            bottom: -3px;
            left: 0;
            width: 60px;
            height: 3px;
            background: linear-gradient(90deg, #f39c12, #e67e22);
            border-radius: 2px;
        }
        
        .subsection {
            margin-bottom: 25px;
            padding: 20px;
            background: linear-gradient(135deg, #f8f9fa 0%, #e9ecef 100%);
            border-radius: 10px;
            border-left: 5px solid #007bff;
            transition: all 0.3s ease;
        }
        
        .subsection:hover {
            background: linear-gradient(135deg, #e3f2fd 0%, #bbdefb 100%);
            border-left-color: #2196f3;
            transform: translateX(5px);
        }
        
        .subsection h3 {
            color: #495057;
            font-size: 1.3em;
            margin-bottom: 15px;
            display: flex;
            align-items: center;
        }
        
        .subsection h3::before {
            content: '●';
            color: #007bff;
            font-size: 1.5em;
            margin-right: 10px;
            animation: pulse 2s infinite;
        }
        
        @keyframes pulse {
            0%, 100% { opacity: 1; }
            50% { opacity: 0.6; }
        }
        
        .subsection p {
            color: #6c757d;
            font-size: 1em;
            text-align: justify;
        }
        
        ul {
            list-style: none;
            padding: 0;
        }
        
        li {
            margin-bottom: 15px;
            padding: 15px 20px;
            background: white;
            border-radius: 8px;
            box-shadow: 0 5px 15px rgba(0, 0, 0, 0.08);
            border-left: 4px solid #17a2b8;
            transition: all 0.3s ease;
            position: relative;
            overflow: hidden;
        }
        
        li::before {
            content: '';
            position: absolute;
            top: 0;
            left: 0;
            width: 100%;
            height: 100%;
            background: linear-gradient(135deg, rgba(23, 162, 184, 0.1) 0%, transparent 50%);
            transform: translateX(-100%);
            transition: transform 0.3s ease;
        }
        
        li:hover::before {
            transform: translateX(0);
        }
        
        li:hover {
            transform: translateX(10px);
            box-shadow: 0 8px 25px rgba(0, 0, 0, 0.15);
            border-left-color: #007bff;
        }
        
        .step-list li {
            border-left-color: #28a745;
            counter-increment: step-counter;
            position: relative;
            padding-left: 60px;
        }
        
        .step-list {
            counter-reset: step-counter;
        }
        
        .step-list li::after {
            content: counter(step-counter);
            position: absolute;
            left: 20px;
            top: 50%;
            transform: translateY(-50%);
            background: #28a745;
            color: white;
            width: 30px;
            height: 30px;
            border-radius: 50%;
            display: flex;
            align-items: center;
            justify-content: center;
            font-weight: bold;
            font-size: 0.9em;
        }
        
        .footer {
            background: linear-gradient(135deg, #2c3e50 0%, #34495e 100%);
            color: white;
            text-align: center;
            padding: 30px;
            margin-top: 40px;
        }
        
        .footer p {
            opacity: 0.8;
            font-size: 0.9em;
        }
        
        @media (max-width: 768px) {
            .container {
                margin: 10px;
                border-radius: 15px;
            }
            
            .header {
                padding: 30px 20px;
            }
            
            .header h1 {
                font-size: 2em;
            }
            
            .content {
                padding: 20px;
            }
            
            .section {
                padding: 25px 20px;
            }
            
            .section h2 {
                font-size: 1.6em;
            }
        }
        
        .highlight {
            background: linear-gradient(120deg, #ffeaa7 0%, #fdcb6e 100%);
            padding: 3px 8px;
            border-radius: 4px;
            font-weight: 600;
            color: #2d3436;
            box-shadow: 0 2px 4px rgba(253, 203, 110, 0.3);
        }
    </style>
</head>
<body>
    <div class="container">
        <div class="header">
            <h1>Síntesis de Entrevistas</h1>
            <p>Clínica de Psicología SEAP - UADY</p>
        </div>
        
        <div class="content">
            <div class="intro">
                <p>Este documento presenta una síntesis detallada de la información recabada durante entrevistas realizadas a <span class="highlight">terapeutas, becarios, coordinadores y personal administrativo</span> de la Clínica de Psicología SEAP de la UADY, en el marco del proyecto de digitalización de expedientes clínicos. Se exponen los hallazgos más relevantes clasificados en tres categorías: necesidades y problemas identificados, patrones de comportamiento del personal involucrado, y el flujo actual de manejo de expedientes físicos.</p>
            </div>
            
            <div class="section">
                <h2>1. Necesidades y Problemas Identificados</h2>
                
                <ul>
                    <li><strong>Seguridad limitada:</strong> Los expedientes físicos están sujetos a pérdidas, maltrato o acceso no autorizado, y aunque existe una ética profesional que regula su manejo, no hay protocolos digitales ni registro automatizado de acceso.</li>
                    
                    <li><strong>Carga administrativa elevada:</strong> El llenado, impresión, firma y escaneo de reportes requiere múltiples pasos manuales, lo que consume tiempo y recursos. La digitalización fallida ha sido común entre terapeutas debido a duplicidad de esfuerzos.</li>
                    
                    <li><strong>Infraestructura deficiente:</strong> La conexión a internet es inestable y limitada por número de dispositivos, lo cual complica el uso de herramientas digitales en tiempo real. Las computadoras del área administrativa están obsoletas y lentas.</li>
                    
                    <li><strong>Dificultades logísticas:</strong> El sistema de almacenamiento físico es desorganizado, sin un sistema efectivo de indexación. Las carpetas están amontonadas y se identifican por colores, nombre del terapeuta y número de folio, pero no siguen un sistema digitalizado.</li>
                    
                    <li><strong>Limitantes técnicas:</strong> No se cuenta con escáneres ni impresoras accesibles para los terapeutas, lo cual impide actualizar fácilmente los expedientes. Además, no hay digitalización de materiales sensibles como dibujos o pruebas proyectivas.</li>
                    
                    <li><strong>Restricciones éticas y legales:</strong> Por políticas de confidencialidad, no se permite conservar ni respaldar archivos digitalizados fuera del entorno clínico. Cualquier digitalización debe ser aprobada por la coordinación.</li>
                </ul>
            </div>
            
            <div class="section">
                <h2>2. Patrones de Comportamiento</h2>
                
                <ul>
                    <li>Uso común de <span class="highlight">hojas en blanco o libretas</span> para notas personales durante sesiones, las cuales luego se transcriben al expediente oficial. Estas notas deben ser destruidas una vez integradas.</li>
                    
                    <li><strong>Supervisión constante:</strong> Los terapeutas en formación deben validar reportes con sus supervisores antes de imprimir. Existen formatos preestablecidos y reuniones semanales para seguimiento.</li>
                    
                    <li><strong>Acceso regulado:</strong> Solo el terapeuta asignado, su supervisor y la coordinación pueden consultar un expediente. No se permite llevarse expedientes fuera del área clínica.</li>
                    
                    <li><strong>Flujo dependiente del papel:</strong> Todo documento agregado al expediente debe imprimirse, firmarse dos veces (en tinta azul y negra) y archivarse manualmente. Se imprimen dos copias: una para el paciente, otra para la clínica.</li>
                    
                    <li><strong>Alto compromiso ético:</strong> El código de ética rige el comportamiento de todos los actores. Las infracciones (por ejemplo, pérdida de documentos) pueden llevar a sanciones.</li>
                    
                    <li><strong>Evaluación colaborativa:</strong> Los reportes no se elaboran de forma individual, sino en conjunto con los supervisores, quienes validan contenidos antes de su inclusión en el expediente.</li>
                </ul>
            </div>
            
            <div class="section">
                <h2>3. Flujo Actual de Manejo de Expedientes</h2>
                
                <ul class="step-list">
                    <li><strong>Recepción y creación:</strong> El proceso inicia con la recepción de una solicitud. Esta es asignada por la coordinación a un terapeuta, luego entregada por la becaria, quien distribuye los casos.</li>
                    
                    <li><strong>Cita y confirmación:</strong> Se acuerda un horario entre paciente y terapeuta. Las secretarias llaman para confirmar fecha, hora y cuota.</li>
                    
                    <li><strong>Armado del expediente:</strong> Se integra una carpeta con solicitud, consentimiento informado, derechos del cliente, aviso de privacidad, hoja de control de sesiones, historia clínica y formatos adicionales según el tipo de terapia.</li>
                    
                    <li><strong>Tipos de expediente:</strong> Varían entre <span class="highlight">psicodiagnóstico</span> (más extenso, con pruebas y protocolos), <span class="highlight">psicoterapia</span> (más flexible) y <span class="highlight">orientación vocacional</span> (con reporte final).</li>
                    
                    <li><strong>Acceso diario:</strong> Los terapeutas acceden al expediente justo antes de la sesión y lo devuelven al terminar. Toda documentación se guarda en la carpeta correspondiente, en un mueble según tipo y nivel académico.</li>
                    
                    <li><strong>Cierre del expediente:</strong> Al finalizar el tratamiento, se agrega una evaluación del servicio, se revisa que toda la documentación esté completa y se entrega a secretaría para validación.</li>
                    
                    <li><strong>Archivo y destrucción:</strong> Los expedientes se almacenan por <span class="highlight">5 años</span> y luego son destruidos. En casos excepcionales, el paciente puede solicitar una copia del reporte (no del expediente completo).</li>
                </ul>
            </div>
        </div>
        
        <div class="footer">
            <p>Documento generado para el proyecto de digitalización de expedientes clínicos - Clínica de Psicología SEAP, UADY</p>
        </div>
    </div>
</body>
</html>
