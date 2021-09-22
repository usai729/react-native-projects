<?php 
    header("Access-Control-Allow-Headers: http://localhost:19006");
    include "conn.php";

    $json = file_get_contents("php://input");
    $obj = json_decode($json, true);

    $id =  $obj['itemID'];

    $sql = "DELETE FROM todos WHERE pID=$id";

    if (mysqli_query($conn, $sql)) {
        echo "done";
    }
?>