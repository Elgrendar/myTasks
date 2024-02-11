<?php
include_once('config.php'); //incluimos los datos de configuración 

/**
 * Fichero con las funciones que se usan en el aplicativo
 * 
 * @author Rafael C. Campanero <info@rafacampanero.es>
 * 
 * @version 1.0.0
 */


/**
 * Función para cerrar la sesión y destruir las variables
 * 
 * @author Rafael C. Campanero <info@rafacampanero.es>
 * 
 * @since 1.0.0
 */
function logout()
{
    session_unset();
    session_destroy();
}
/**
 * Esta función verificará la inactividad del usuario para usar esta función debe estar iniciada la sesión.
 * 
 * @author Rafael C. Campanero <info@rafacampanero.es>
 * @since 1.0.0
 */
function verificarInactividad()
{
    // Establecer tiempo de vida de la sesión en segundos
    $inactividad = 600; //establecemos 10 minutos por defecto
    // Comprobar si $_SESSION["timeout"] está establecida
    if (isset($_SESSION["timeout"])) {
        // Calcular el tiempo de vida de la sesión (TTL = Time To Live)
        $sessionTTL = time() - $_SESSION["timeout"];
        if ($sessionTTL > $inactividad) {
            //Si ha superado el tiempo destruimos la sesion
            logout();
            $_SESSION['Avisos'][] = [
                'tipo' => 'warning',
                'descripcion' => 'Se ha superado el tiempo de inactividad, vuelve a iniciar sesión.'
            ];
            //Despues de cerrar sesión redirigimos al index.php
            header("Location: ./index.php");
        }
    }
    // El siguiente key se crea cuando se inicia sesión
    $_SESSION["timeout"] = time();
}

/**
 * Esta funcion valida los datos del formulario del login, registra el token del formulario en la bbdd.
 * Si todo es correcto registra las variables de sesión y te redirige a la página welcome.php
 * También guarda un aviso con el mensaje de bienvenida personalizado a la persona
 * 
 * @author Rafael C. Campanero <info@rafacampanero.es>
 * @since 1.0.0
 * @param string $user Este es el usuario a validar
 * @param string $password Esta es la contraseña introducida en el formulario
 * @return JSON devuelve en formato JSON el usuario si no existe el usuario sera una cadena vacia y una contraseña vacia
 * 
 */
function verificarLogin($user, $password)
{
    $pass = obtenerPass($user);
    if (password_verify($password, $pass)) {
        if (is_session_started() === FALSE) session_start();
        
    };
    return obtenerUsuario($user);
}

/**
 * Esta funcion verifica si el usuario tiene algún token en la bbdd y lo elimina e introduce
 * un nuevo token para la sessión.
 * 
 * @author Rafael C. Campanero <info@rafacampanero.es>
 * @since 1.0.0
 * @param string $token a actualizar
 * @param string $user propietario del token
 */
function actualizarToken($token, $user)
{
    $sql = "INSERT INTO `login`(`usuario`, `token`) VALUES ('$user','$token');";
    $con = mysqli_connect(HOST, USER, PASS);
    mysqli_select_db($con, DB);
    if (mysqli_query($con, $sql)) {
        $sql = "UPDATE login set `activo`= 0 WHERE `usuario`='$user' AND `token` !='$token';";
        mysqli_query($con, $sql);
    }
    mysqli_close($con);
}
/**
 * Este método recupera los datos del usuario de la bbdd y los agrega a las variables de sesion
 * 
 * @author Rafael C. Campanero <info@rafacampanero.es>
 * @since 1.0.0
 * @param string $user usuario para recoger los parametros y registrarlos en las variables de sesión
 */
function obtenerUsuario($user)
{
    $con = mysqli_connect(HOST, USER, PASS);
    mysqli_select_db($con, DB);
    $sql = "SELECT * FROM `usuarios` WHERE `usuario`='" . $user . "'  AND `activo`=1;";
    $usuario[] = array(
        "nombre" => "",
        "id_usuario" => 0
    );
    if ($result = mysqli_query($con, $sql)) {
        mysqli_data_seek($result, 0);
        if ($extraido = mysqli_fetch_array($result)) {
            $usuario[] = array(
                "nombre" => $extraido['nombre'],
                "id_usuario" => $extraido['id_usuario']
            );
        };
        mysqli_free_result($result);
        mysqli_close($con);
    };
    return json_encode($usuario);
}
/**
 * Este método recupera los datos del usuario de la bbdd y los devuelve en forma de array key=>value
 * 
 * @author Rafael C. Campanero <info@rafacampanero.es>
 * @since 1.0.0
 * @param int $user id_usuario del cual queremos recuperar los datos de la BBDD
 * @return array Con los datos del usuario.
 */
function  editarUsuario(int $user)
{
    $con = mysqli_connect(HOST, USER, PASS);
    mysqli_select_db($con, DB);
    $sql = "SELECT nombre, apellido1, apellido2, telefono, extension, email, usuario, activo FROM `usuarios` WHERE `id_usuario`='" . $user . "';";
    if ($result = mysqli_query($con, $sql)) {
        mysqli_data_seek($result, 0);
        if ($extraido = mysqli_fetch_array($result)) {
            $usuario = array(
                'nombre' => $extraido['nombre'],
                'apellido1' => $extraido['apellido1'],
                'apellido2' => $extraido['apellido2'],
                'telefono' => $extraido['telefono'],
                'extension' => $extraido['extension'],
                'email' => $extraido['email'],
                'usuario' => $extraido['usuario'],
                'activo' => $extraido['activo']
            );
            return ($usuario);
        } else {
            //No ha encontrado el usuario o no está activo
            header("Location: ../welcome.php");
        }
        mysqli_free_result($result);
        mysqli_close($con);
    }
}

/**
 * Este método recupera los datos del menú de la bbdd y los manda en forma de array key=>value
 * 
 * @author Rafael C. Campanero <info@rafacampanero.es>
 * @since 1.0.0
 * @param int $menu identificadordel menu del cual queremos recuperar los elementos
 */
function  editarMenu(int $menu)
{
    $con = mysqli_connect(HOST, USER, PASS);
    mysqli_select_db($con, DB);
    $sql = "SELECT id_menu, link, text, icon, menu FROM `menus` WHERE `id_menu`='" . $menu . "';";
    if ($result = mysqli_query($con, $sql)) {
        mysqli_data_seek($result, 0);
        if ($extraido = mysqli_fetch_array($result)) {
            $menus = array(
                'id_menu' => $extraido['id_menu'],
                'link' => $extraido['link'],
                'text' => $extraido['text'],
                'icon' => $extraido['icon'],
                'menu' => $extraido['menu']
            );
            return ($menus);
        } else {
            //No ha encontrado el usuario o no está activo
            header("Location: ../welcome.php");
        }
        mysqli_free_result($result);
        mysqli_close($con);
    }
}

/**
 * Este método recupera los datos de los servicios de la bbdd y los manda en forma de array key=>value
 * 
 * @author Rafael C. Campanero <info@rafacampanero.es>
 * @since 1.0.0
 * @param int $servicio 
 */
function  editarServidor(int $servicio)
{
    $con = mysqli_connect(HOST, USER, PASS);
    mysqli_select_db($con, DB);
    $sql = "SELECT * FROM `servicios` WHERE `id_servicio`='" . $servicio . "';";
    if ($result = mysqli_query($con, $sql)) {
        mysqli_data_seek($result, 0);
        if ($extraido = mysqli_fetch_array($result)) {
            $servicios[] = array(
                'id_servicio' => $extraido['id_servicio'],
                'port' => $extraido['port'],
                'servicio' => $extraido['servicio'],
                'url' => $extraido['url']
            );
            return ($servicios);
        }
        mysqli_free_result($result);
        mysqli_close($con);
    }
}

/**
 * Este método recupera el hash de la contraseña de la bbdd
 * 
 * @author Rafael C. Campanero <info@rafacampanero.es>
 * @since 1.0.0
 * @param string $user del cual queremos recuperar el hash
 * @return string el Hash de la contraseña del usuario solicitado
 */
function obtenerPass($user)
{
    $pass = '';
    $con = mysqli_connect(HOST, USER, PASS);
    mysqli_select_db($con, DB);
    $sql = "SELECT `password` FROM `usuarios` WHERE `usuario`='" . $user . "'  AND `activo`=1;";
    if ($result = mysqli_query($con, $sql)) {
        mysqli_data_seek($result, 0);
        if ($extraido = mysqli_fetch_array($result)) {
            $pass = $extraido['password'];
        } else {
            //No ha encontrado el usuario o no está activo
            header("Location: ../index.php");
        }
        mysqli_free_result($result);
        mysqli_close($con);
    }
    return $pass;
}

/**
 * Esta función verifica si el token de la sesión existe y si está asignado al usuario actual en la bbdd
 * en caso de que el usuario haya iniciado sesion en más de un sitio cerrará todas las sesiones menos la última.
 * Verifica en la tabla login si existe un registro con el token y el usuario actual si no es así cierra la sesion y te redirige
 * al index.php
 * 
 * @author Rafael C. Campanero <info@rafacampanero.es>
 * @since 1.0.0
 */
function verificarSesion()
{
    $con = mysqli_connect(HOST, USER, PASS);
    mysqli_select_db($con, DB);
    $sql = "SELECT `id_login` FROM `login` WHERE `token`='" . $_SESSION['token'] . "' AND `activo`= 1 AND `usuario`='" . $_SESSION['usuario'] . "';";
    $result = mysqli_query($con, $sql);
    if ($result->num_rows != 1) {
        logout();
        header("Location: ./index.php");
    }
    verificarInactividad();
    mysqli_free_result($result);
    mysqli_close($con);
}

/**
 * Esta función genera una cadena aleatoria de longitud definida en el parametro
 * 
 * @author Rafael C. Campanero <info@rafacampanero.es>
 * @since 1.0.0
 * @param $longitud Define la longitud de la cadena a generar
 * @return string con la cadena generada con la longitud solicitada
 */
function random_str_generator($longitud)
{
    $chars = "ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz";
    $var_size = strlen($chars);
    $random_str = "";
    for ($x = 0; $x < $longitud; $x++) {
        $random_str .= $chars[rand(0, $var_size - 1)];
    }
    return $random_str;
}


/**
 * Esta funcion devuelve las <tr></tr> de la tabla con todos los usuarios activos en la bbdd
 * 
 * @author Rafael C. Campanero <info@rafacampanero.es>
 * @since 1.0.0
 * @return string con el codigo html de las lineas de la tabla
 */
function consultarUsuarios()
{
    $codigo = "";
    $con = mysqli_connect(HOST, USER, PASS);
    mysqli_select_db($con, DB);
    $sql = "SELECT `id_usuario`, `nombre`, `apellido1`, `apellido2`,`email`, `usuario` FROM `usuarios` WHERE `eliminado`= 0;";
    if ($result = mysqli_query($con, $sql)) {
        while ($extraido = mysqli_fetch_array($result)) {
            $codigo .= "<tr id='" . $extraido['id_usuario'] . "'>
            <td>" . $extraido['id_usuario'] . "</td>
            <td><input type='checkbox' id='selec" . $extraido['id_usuario'] . "' name='selec" . $extraido['id_usuario'] . "'></td>
            <td>" . $extraido['nombre'] . "</td>
            <td>" . $extraido['apellido1'] . "</td>
            <td>" . $extraido['apellido2'] . "</td>
            <td>" . $extraido['email'] . "</td>
            <td>" . $extraido['usuario'] . "</td>
            <td>
                <a href='#'><i class='bi bi-envelope-fill' style='color:white;'></i></a>
                <a href='?contenido=usuario-editar&id_usuario=" . $extraido['id_usuario'] . "'><i class='bi bi-pencil-fill' style='color:cornflowerblue;'></i></a>
                <a href='?contenido=usuario-baja&id_usuario=" . $extraido['id_usuario'] . "'><i class='bi bi-person-dash-fill' style='color:red;'></i></a>
            </td>
        </tr>";
        }
    }
    mysqli_free_result($result);
    mysqli_close($con);
    return $codigo;
}

/**
 * Esta funcion devuelve las lineas de la tabla de menus
 */
function consultarMenus()
{
    $codigo = "";
    $con = mysqli_connect(HOST, USER, PASS);
    mysqli_select_db($con, DB);
    $sql = "SELECT `id_menu`, `link`, `text`, `icon`,`menu` FROM `menus` WHERE `menu`>=0;";
    if ($result = mysqli_query($con, $sql)) {
        while ($extraido = mysqli_fetch_array($result)) {
            $codigo .= "<tr id='" . $extraido['id_menu'] . "'>
            <th>" . $extraido['id_menu'] . "</td>
            <td><input type='checkbox' id='selec" . $extraido['id_menu'] . "' name='selec" . $extraido['id_menu'] . "'></td>
            <td>" . $extraido['link'] . "</td>
            <td>" . $extraido['text'] . "</td>
            <td>" . $extraido['icon'] . "</td>
            <td>" . $extraido['menu'] . "</td>
            <td>
                <a href='?contenido=menu-editar&id_menu=" . $extraido['id_menu'] . "'><i class='bi bi-pencil-fill' style='color:cornflowerblue;'></i></a>
                <a href='?contenido=menu-baja&id_menu=" . $extraido['id_menu'] . "'><i class='bi bi-person-dash-fill' style='color:red;'></i></a>
            </td>
        </tr>";
        }
    }
    mysqli_free_result($result);
    mysqli_close($con);
    return $codigo;
}

/**
 * Esta funcion devuelve las lineas de la tabla de usuarios
 */
function consultarServidores()
{
    $codigo = "";
    $con = mysqli_connect(HOST, USER, PASS);
    mysqli_select_db($con, DB);
    $sql = "SELECT * FROM `servicios` WHERE `eliminado`>=0;";
    if ($result = mysqli_query($con, $sql)) {
        while ($extraido = mysqli_fetch_array($result)) {
            $codigo .= "<tr id='" . $extraido['id_servicio'] . "'>
            <th>" . $extraido['id_servicio'] . "</td>
            <td><input type='checkbox' id='selec" . $extraido['id_servicio'] . "' name='selec" . $extraido['id_servicio'] . "'></td>
            <td>" . $extraido['port'] . "</td>
            <td>" . $extraido['servicio'] . "</td>
            <td>" . $extraido['url'] . "</td>
            <td>
                <a href='?contenido=servidores-editar&id_servicio=" . $extraido['id_servicio'] . "'><i class='bi bi-pencil-fill' style='color:cornflowerblue;'></i></a>
                <a href='?contenido=servidores-baja&id_servicio=" . $extraido['id_servicio'] . "'><i class='bi bi-person-dash-fill' style='color:red;'></i></a>
            </td>
        </tr>";
        }
    }
    mysqli_free_result($result);
    mysqli_close($con);
    return $codigo;
}

/**
 * @return bool
 */
function is_session_started()
{
    if (php_sapi_name() !== 'cli') {
        if (version_compare(phpversion(), '5.4.0', '>=')) {
            return session_status() === PHP_SESSION_ACTIVE ? TRUE : FALSE;
        } else {
            return session_id() === '' ? FALSE : TRUE;
        }
    }
    return FALSE;
}

/**
 * Esta funcion mostrará los avisos del sistema en la parte superior  del contenedor,
 * usando los estilos de bootstrap.
 * primary
 * secondary
 * success
 * danger
 * warning
 * info
 * light
 * dark 
 */
function mostrarAvisos()
{
    if (!empty($_SESSION['Avisos'])) {
        foreach ($_SESSION['Avisos'] as $aviso) {
            echo '<div class="alert alert-' . $aviso['tipo'] . ' alert-dismissible fade show" role="alert">' . $aviso['descripcion'] . '<button type="button" class="btn-close" data-bs-dismiss="alert" aria-label="Close"></button></div>';
        }
    }

    //print_r($_SESSION['Avisos']);
    unset($_SESSION['Avisos']);
}

/**
 * Obtenemos el último potencial asignado y devolvemos el siguiente número
 */
function ultimo_potencial()
{
    $con = new mysqli(HOST, USER, PASS);
    mysqli_select_db($con, DB);
    $sql = "SELECT `numero_potencial` FROM `potenciales` ORDER BY `fecha_solicitud` DESC LIMIT 1;";
    $result = mysqli_query($con, $sql);
    $extraido = mysqli_fetch_array($result);
    $potencialLibre = $extraido['numero_potencial'] + 1;

    return $potencialLibre;
}

/**
 * Genera los elementos<li> del menú solicitado
 * @param int menú a obetener los elementos
 * @return String con los elementos li del menú autorizado
 */
function get_menu($menu = 1)
{
    $cadena = '';
    $con = new mysqli(HOST, USER, PASS);
    mysqli_select_db($con, DB);
    $sql = "SELECT * FROM `menus` WHERE `menu`=$menu;";
    $permisoSql = "SELECT * FROM `menu_usuarios` WHERE `id_usuario` = " . $_SESSION['id_usuario'] . " AND `autorizado`= true;";
    $result = mysqli_query($con, $sql);
    $permisos = mysqli_query($con, $permisoSql);
    //return $permisoSql;
    while ($extraido = mysqli_fetch_array($result)) {
        while ($permiso = mysqli_fetch_array($permisos)) {
            if ($extraido['id_menu'] == $permiso['id_menu']) {

                $cadena .= '<li class="nav-item">
                <a href="' . $extraido['link'] . '" class="nav-link text-truncate">
                    <i class="fs-5 bi-' . $extraido['icon'] . '"></i><span class="ms-1 d-none d-sm-inline">' . $extraido['text'] . '</span>
                </a>
            </li>';
            }
        }
        mysqli_data_seek($permisos, 0);
    }
    return $cadena;
}

/**
 * Devuelve un array con los distintas opciones de los menús
 * @return [] 
 */
function get_menus()
{
    $opciones = [];
    $con = new mysqli(HOST, USER, PASS);
    mysqli_select_db($con, DB);
    $sql = "SELECT `id_menu`,`text` FROM `menus`WHERE `menu`>=0;";
    $result = mysqli_query($con, $sql);
    while ($extraido = mysqli_fetch_array($result)) {
        $opciones[] = [
            $extraido['id_menu'] => $extraido['text']
        ];
    }
    return $opciones;
}
/**
 * Devuelve un array con los distintas id de usuario
 * @return [] 
 */
function get_usuarios()
{
    $opciones = [];
    $con = new mysqli(HOST, USER, PASS);
    mysqli_select_db($con, DB);
    $sql = "SELECT `id_usuario`,`nombre` FROM `usuarios`;";
    $result = mysqli_query($con, $sql);
    while ($extraido = mysqli_fetch_array($result)) {
        $opciones[] = [
            $extraido['id_usuario'] => $extraido['nombre']
        ];
    }
    return $opciones;
}

/**
 * Devuelve el valor del check del menu para el usuario dado
 * @return String checked si está marcado "" en caso contrario
 */
function get_check($usuario, $opcion)
{
    $cadena = "";
    $con = new mysqli(HOST, USER, PASS);
    mysqli_select_db($con, DB);
    $sql = "SELECT `autorizado` FROM `menu_usuarios` WHERE `id_usuario`=$usuario AND `id_menu`=$opcion;";
    $result = mysqli_query($con, $sql);
    if ($result) {
        $extraido = mysqli_fetch_array($result);
        if ($extraido['autorizado'] == 1) {
            $cadena = "checked";
        }
    }
    return $cadena;
}

/**
 * Devuelve un array con los servidores y datos a comprobar
 * @return array 
 */
function get_servidores()
{

    $services = [];
    $con = new mysqli(HOST, USER, PASS);
    mysqli_select_db($con, DB);
    $sql = "SELECT * FROM `servicios` WHERE `eliminado`>=0;";
    $result = mysqli_query($con, $sql);
    while ($extraido = mysqli_fetch_array($result)) {
        $services[] = [
            'port' => $extraido['port'],
            'service' => $extraido['servicio'],
            'ip' => $extraido['url']
        ];
    }
    return $services;
}
