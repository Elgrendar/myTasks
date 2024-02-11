<?php
include_once('funciones.php');
if ( is_session_started() === FALSE ) session_start();
verificarSesion();


//Clase para la conexion a la bbdd

class Conexion{


    /**
     * Devuelve la conexion con la Bbdd o muestra el error
     * Coge los datos del fichero config.php
     */
    function __construct(){
        $con =new mysqli(HOST, USER, PASS);
        // Comprobar conexión
        if($con->connect_error){
            die("La conexión ha fallado, error número " . $con->connect_errno . ": " . $con->connect_error);
            return $con;
        }
    }

    /**
     * Establece la Base de Datos en la conexion mysql
     * @param Conexion
     */
    function seleccionarDb($db){
        mysqli_select_db($this->con, $db);
    }

    /**
     * 
     */
    function insertarDatos( $sql){
        return mysqli_query($this->con, $sql);
    }

    /**
     * 
     */
    function cerrarConexion(){
        mysqli_close($this->con);
    }
}