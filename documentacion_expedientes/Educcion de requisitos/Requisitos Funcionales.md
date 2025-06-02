
<!DOCTYPE html>
<html lang="es">
<head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
</head>
<body>
    <h1>Requerimientos Funcionales</h1>
    <table>
        <tr>
            <th>ID</th>
            <th>Nombre</th>
            <th>Descripción</th>
            <th>Criterios de Aceptación</th>
        </tr>
        <tr>
            <td>RF-001</td>
            <td>Consulta de expedientes clínicos</td>
            <td>El sistema deberá permitir que los terapeutas en formación consulten los expedientes clínicos de los pacientes asignados a su cargo.</td>
            <td>
                <ul>
                    <li>El terapeuta solo puede acceder a los expedientes de sus pacientes asignados.</li>
                    <li>Se debe registrar un log de acceso con la fecha y usuario que consultó el expediente.</li>
                    <li>La consulta debe permitir búsqueda por nombre del paciente y fecha de última sesión.</li>
                </ul>
            </td>
        </tr>
        <tr>
            <td>RF-002</td>
            <td>Control de acceso y permisos por roles</td>
            <td>El sistema debe controlar el acceso a los expedientes clínicos y definir permisos específicos según el rol del usuario.</td>
            <td>
                <ul>
                    <li>Terapeutas: Solo pueden acceder y modificar los expedientes de sus pacientes asignados. Se debe registrar cualquier intento de acceso no autorizado. </li>
                    <li>Secretaria: La secretaria podrá gestionar el estado de los expedientes y visualizar información general de pacientes (nombre, email, celular, fecha de registro, sesiones concluidas, sesiones restantes, faltas justificadas), pero no podrá acceder a información clínica o notas de sesión. </li>
                    <li>Administrador: Además de los permisos de visualización y gestión, podrá generar y exportar reportes basados en los datos cualitativos y cuantitativos. </li>
                </ul>
            </td>
        </tr>
        <tr>
            <td>RF-003</td>
            <td>Registro de auditoría</td>
            <td>El sistema debe mantener un registro de auditoría con detalles sobre quién visualizó o editó un expediente.</td>
            <td>
                <ul>
                    <li>Se debe registrar la fecha, hora y usuario que accedió o modificó un expediente. </li>
                    <li>Los registros de auditoría deben ser accesibles solo para administradores del sistema. </li>
                    <li>No se debe permitir la eliminación de registros de auditoría. </li>
                </ul>
            </td>
        </tr>
        <tr>
            <td>RF-004</td>
            <td>Creación y gestión de expedientes</td>
            <td>El sistema debe permitir la creación, edición y almacenamiento de expedientes clínicos.</td>
            <td>
                <ul>
                    <li>Debe incluir información del paciente, historial médico y notas de sesión. </li>
                    <li>Los expedientes deben ser creados por secretaría.</li>
                    <li>Los expedientes deben ser editables por terapeutas asignados. </li>
                    <li>Se debe permitir adjuntar documentos complementarios. </li>
                </ul>
            </td>
        </tr>
        <tr>
            <td>RF-005</td>
            <td>Carga de documentos</td>
            <td>El sistema debe aceptar la subida de archivos en diferentes formatos.</td>
            <td>
                <ul>
                    <li>Debe aceptar archivos PDF, JPG y PNG.</li>
                    <li>Límite de 20MB por archivo.</li>
                    <li>Muestra mensaje de error si excede el tamaño.</li>
                </ul>
            </td>
        </tr>
        <tr>
            <td>RF-006</td>
            <td>Almacenamiento de expedientes</td>
            <td>El sistema debe almacenar los expedientes durante un período mínimo de 5 años antes de su eliminación.</td>
            <td>
                <ul>
                    <li>Los expedientes deben permanecer accesibles durante 5 años.</li>
                    <li>Pasado este tiempo, deben archivarse o eliminarse según normativas de privacidad. </li>
                    <li>Próximo a su eliminación el sistema debe alertar al administrador. </li>
                </ul>
            </td>
        </tr>
        <tr>
            <td>RF-007</td>
            <td>Gestión de seguridad por TI</td>
            <td>El sistema debe permitir que el personal de TI gestione la seguridad del sistema.</td>
            <td>
                 <ul>
                    <li>Solo personal autorizado puede modificar configuraciones de seguridad. </li>
                    <li>Cualquier cambio en la configuración de seguridad debe ser registrado en el sistema de auditoría (Ver RF-004). </li>
                    <li>El sistema debe registrar cualquier intento de acceso no autorizado o modificación de configuraciones de seguridad. </li>
                    <li>Las configuraciones de seguridad solo podrán revertirse o restaurarse utilizando mecanismos de autenticación y autorización adicionales.  </li>
                    <li>El personal de TI podrá acceder a un historial de eventos de seguridad, con registros detallados sobre intentos de acceso, modificaciones y eventos críticos.  </li>
                </ul>            
            </td>
        </tr>
        <tr>
            <td>RF-008</td>
            <td>Protección de datos</td>
            <td>El sistema debe proteger la información contra modificaciones no autorizadas.</td>
            <td>
                 <ul>
                    <li>Se deben implementar permisos de acceso para cada usuario. </li>
                    <li>Se debe contar con un sistema de respaldo y recuperación de datos.</li>
                </ul>
            </td>
        </tr>
        <tr>
            <td>RF-009</td>
            <td>Registro de notas de sesión</td>
            <td>El sistema debe permitir que los terapeutas agreguen notas de sesión estructuradas.</td>
            <td>
                 <ul>
                    <li>Se deben permitir formatos predefinidos para notas de sesión. </li>
                    <li>Las notas deben ser editables solo por el terapeuta que las registró. </li>
                </ul>
            </td>
        </tr>
        <tr>
            <td>RF-010</td>
            <td>Reportes Terapéuticos</td>
            <td>El sistema debe integrar herramientas de procesamiento de texto para generar reportes.</td>
            <td>
                 <ul>
                    <li>Los terapeutas podrán editar y guardar reportes utilizando plantillas predefinidas. </li>
                    <li>Los reportes podrán exportarse en formatos como CSV, Excel o PDF. </li>
                    <li>Los administradores tendrán acceso a los reportes completos, incluyendo información cualitativa y cuantitativa. </li>
                </ul>
            </td>
        </tr>
        <tr>
            <td>RF-011</td>
            <td>Notificación de documentos pendientes</td>
            <td>El sistema debe notificar a los terapeutas sobre documentos pendientes.</td>
            <td>
                 <ul>
                    <li>El sistema debe enviar notificaciones automáticas diarias o semanales a terapeutas cuando haya documentos pendientes de entrega. </li>
                </ul>
            </td>
        </tr>
        <tr>
            <td>RF-012</td>
            <td>Archivado de casos cerrados</td>
            <td>El sistema debe gestionar la finalización de casos.</td>
            <td>
                 <ul>
                    <li>Solo los administradores pueden marcar un caso como cerrado. </li>
                 </ul>
            </td>
        </tr>
        <tr>
            <td>RF-013</td>
            <td>Gestión de Datos y Estadísticas de Pacientes</td>
            <td>El administrador podrá visualizar y analizar estadísticas de pacientes.</td>
            <td>
                 <ul>
                    <li>La base de datos debe almacenar información como edad, género, área de vivienda, nivel socioeconómico, y otros datos relevantes que ayuden en la evaluación de los pacientes. </li>
                    <li>Los datos deben ser accesibles solo para los administradores.  </li>
                    <li>Tendrá acceso a herramientas analíticas para identificar tendencias y generar informes visuales. </li>
                    <li>El sistema debe permitir la exportación de los datos cualitativos y las estadísticas generadas en formatos como CSV o Excel para su análisis externo.  </li>
                </ul>
            </td>
        </tr>
    </table>
</body>
</html>