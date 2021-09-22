<?php 
    header("Access-Control-Allow-Headers: http://localhost:19006");

    $conn = mysqli_connect("localhost", "root", "*********", "TODOlist");

    if (!$conn) {
        echo "false";
    }
?>
