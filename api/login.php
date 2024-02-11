<?php
include_once('funciones.php');
if ( is_session_started() === FALSE ) session_start();
verificarSesion();

$token = filter_input(INPUT_POST, 'token');
$accion = filter_input(INPUT_POST,'do');
$usuario = filter_input(INPUT_POST,'userid');
$pass = filter_input(INPUT_POST,'passwd');

verificarLogin($usuario, $pass, $accion, $token);
?>