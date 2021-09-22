<?php 
    header("Access-Control-Allow-Headers: http://localhost:19006");
    include "conn.php";

    session_start();
    $array = array();

    if (isset($_SESSION['user'])) {
        array_push($array, ["state" => "set", "user" => $_SESSION['user']]);
        echo json_encode($array);
    }
    else {
        array_push($array, ["state" => "unset", "user" => "none"]);
        echo json_encode($array);
    }
?>