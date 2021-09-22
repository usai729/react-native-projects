<?php 
    header("Access-Control-Allow-Headers: http://localhost:19006");
    include "conn.php";

    session_start();
    $user = $_SESSION['user'];

    $sql_user = "SELECT userID FROM users WHERE userKey=$user";
    $query = mysqli_query($conn, $sql_user);

    while($rows = mysqli_fetch_assoc($query)) {
        $userId = $rows['userID'];
    }

    $json = file_get_contents('php://input');
    $obj = json_decode($json, true);

    $is_important = $obj['isImp'];
    $title = mysqli_real_escape_string($conn, $obj['title']);
    $desc = mysqli_real_escape_string($conn, $obj['desc']);
    $date = date("d:m:y");

    $sql = "INSERT INTO todos(relUser, todoTITLE, todoDesc, addedTime, important) VALUES('$userId', '$title', '$desc', '$date', '$is_important')";

    if (mysqli_query($conn, $sql)) {
        echo "added";
    }
    else {
        echo mysqli_error($conn);
    }
?>