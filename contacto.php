<?php
/**
 * Simple formulario de contacto con PHP
 *
 * @author parzibyte
 * @see https://parzibyte.me/blog
 */
 
 

if (empty($_POST["name"])) {
    exit("Falta el nombre");
}

if (empty($_POST["email"])) {
    exit("Falta el correo");
}

if (empty($_POST["phone"])) {
    exit("Falta el telefono");
}

if (empty($_POST["producto"])) {
    exit("Falta producto");
}

if (empty($_POST["message"])) {
    exit("Falta mensaje");
}

$name = $_POST["name"];
$email = $_POST["email"];
$phone = $_POST["phone"];
$producto = $_POST["producto"];
$message = $_POST["message"];

$email = filter_var($email, FILTER_VALIDATE_EMAIL);
if (!$email) {
    echo "Correo inválido. Intenta con otro correo.";
    exit;
}

$asunto = "Nuevo mensaje de sitio web";

$datos = "De: $name\nEmail: $email\nTeléfono: $phone\nProducto: $producto\nMensaje: $message";
$mensaje = "Has recibido un mensaje desde el formulario de contacto de tu sitio web. Aquí están los detalles:\n$datos";
$destinatario = "info@cablesmonperne.mx"; # aquí la persona que recibirá los mensajes

$encabezados = "Sender:info@cablesmonperne.mx\r\n"; # El remitente, debe ser un correo de tu dominio de servidor
$encabezados .= "From: $name <" . $email . ">\r\n";
$encabezados .= "Reply-To: $name <$email>\r\n";
$resultado = mail($destinatario, $asunto, $mensaje, $encabezados);
if ($resultado) {
   /* echo "<h1>Mensaje enviado, ¡Gracias por contactarme!</h1>";*/
    /*echo "<h1>Tu mensaje se ha enviado correctamente.</h1p><h2>Importante</h2><h3>Revisa tu bandeja de SPAM, en ocasiones mis respuestas quedan ahí. </h3>";*/
 header("Location: enviomail.html");
 

} else {
    echo "Tu mensaje no se ha enviado. Intenta de nuevo.";
}

 header("Location: enviomail.html");