<?php
    header("Access-Control-Allow-Headers: http://localhost:19006");
    include "conn.php";

    $json = file_get_contents("php://input");
    $obj = json_decode($json, true);

    $id = $obj['id'];
    $title = $obj['title'];
    $desc = $obj['desc'];

    $sql = "UPDATE todos SET todoTITLE='$title', todoDesc='$desc' WHERE pID='$id'";
    $query = mysqli_query($conn, $sql);

    if ($query) {
        echo "yes";
    }
    else {
        echo mysqli_error($conn);
    }
?>