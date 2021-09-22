<?php 
    header("Access-Control-Allow-Headers: http://localhost:19006");
    include "conn.php";

    $json = file_get_contents("php://input");
    $obj = json_decode($json, true);

    $userkey = $obj['key'];

    $sql_verify = "SELECT * FROM users WHERE userKey=$userkey";
    $query_verify = mysqli_query($conn, $sql_verify);

    if (mysqli_num_rows($query_verify) > 0) {
        echo "Choose a diffrent key. This key is invalid";
    }
    else {
        $sql = "INSERT INTO users(userKey) VALUES('$userkey')";

        if (mysqli_query($conn, $sql)) {
            session_start();
            $_SESSION['user'] = $userkey;

            echo "done";
        }
        else {
            echo "ERROR!";
        }
    }
?>