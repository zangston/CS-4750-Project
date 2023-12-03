<?php
include '../connect-db.php';
global $db;
function sign_up($user, $pswd, $fullName){
    global $db;
    $date = date("Y-m-d");
    
    $shuffledPW = password_hash($pswd, PASSWORD_DEFAULT);
    $streams = 0;
    $bgcolor = "FFFFFFF";
    $fontcolor = "000000";
    $query = "INSERT INTO user VALUES (:username, :name, :password, :date_joined, :streams, :background_color, :font_color)";

    $statement = $db->prepare($query); 
    $statement->bindValue(':username', $user);
    $statement->bindValue(':name', $fullName);
    $statement->bindValue(':password', $shuffledPW);
    $statement->bindValue(':date_joined', $date);
    $statement->bindValue(':streams', $streams);
    $statement->bindValue(':background_color', $bgcolor);
    $statement->bindValue(':font_color', $fontcolor);
    $statement->execute();
    $statement->closeCursor();
    $_SESSION["currUser"] = $user;
}

$jsonData = file_get_contents('php://input');

// Decode the JSON data
$data = json_decode($jsonData, true);

$realuser = $data['key1'];
$realpswd = $data['key2'];
$realfullName = $data['key3'];

sign_up($realuser,$realpswd,$realfullName);

