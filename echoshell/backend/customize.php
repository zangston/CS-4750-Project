<?php
include '../connect-db.php';
global $db;

function customize($username, $fontColor) {
    global $db;

    $query = "INSERT INTO library_liked_songs VALUES (:username, (SELECT song_id FROM song WHERE song_title = :songTitle))";

    $statement = $db->prepare($query);
    $statement->bindValue(':username', $username);
    $statement->bindValue(':songTitle', $songTitle);
    $statement->execute();
    $statement->closeCursor();
    $_SESSION["currUser"] = $username;
}

$jsonData = file_get_contents('php://input');

// Decode the JSON data
$data = json_decode($jsonData, true);

$realusername = $data['key1'];
$realsongTitle = $data['key2'];
$realcommand = $data['key3'];

if ($realcommand == "like") {
    like($realusername,$realsongTitle);
} else if ($realcommand == "unlike") {
    unlike($realusername,$realsongTitle);
}
