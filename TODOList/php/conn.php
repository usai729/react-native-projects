<?php 
    header("Access-Control-Allow-Headers: http://localhost:19006");

    $conn = mysqli_connect("localhost", "root", "rootmysql@1#", "TODOlist");

    if (!$conn) {
        echo "false";
    }
?>