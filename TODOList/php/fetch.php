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

    $sql = "SELECT * FROM todos WHERE relUser=$userId ORDER BY pID DESC";
    $resultRws = mysqli_query($conn, $sql);

    $array = array();

    if ($resultRws) {
        while ($rows = mysqli_fetch_assoc($resultRws)) {
            array_push($array, 
                ["important" => $rows['important'],   
                "date" => $rows['addedTime'],
                "desc" => $rows['todoDesc'],
                "title" => $rows['todoTITLE'],
                "id" => $rows['pID'],
                ]
            );
        }
        echo json_encode($array);
    }
?>