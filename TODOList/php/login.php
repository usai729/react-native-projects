<?php 
    header("Access-Control-Allow-Headers: http://localhost:19006");
    include "conn.php";

    $json = file_get_contents("php://input");
    $obj = json_decode($json, true);

    $key = $obj['key'];

    $sql = "SELECT * FROM users WHERE userKey=$key";
    $query = mysqli_query($conn, $sql);

    if (mysqli_num_rows($query) > 0) {
        session_start();
        $_SESSION['user'] = $key;

        echo "ok";
    }
?>