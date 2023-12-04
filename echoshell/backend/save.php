<?php
include '../connect-db.php';
global $db;

function save($username, $albumTitle) {
    global $db;

    $query = "INSERT INTO library_saved_albums VALUES (:username, (SELECT album_id FROM album WHERE album_title = :albumTitle))";

    $statement = $db->prepare($query);
    $statement->bindValue(':username', $username);
    $statement->bindValue(':albumTitle', $albumTitle);
    $statement->execute();
    $statement->closeCursor();
    $_SESSION["currUser"] = $username;
}

function unsave($username, $albumTitle) {
    global $db;

    $query = "DELETE FROM library_saved_albums WHERE username = :username AND album_id = (SELECT album_id FROM album WHERE album_title = :albumTitle)";

    $statement = $db->prepare($query);
    $statement->bindValue(':username', $username);
    $statement->bindValue(':albumTitle', $albumTitle);
    $statement->execute();
    $statement->closeCursor();
    $_SESSION["currUser"] = $username;
}

$jsonData = file_get_contents('php://input');

// Decode the JSON data
$data = json_decode($jsonData, true);

$realusername = $data['key1'];
$realalbumTitle = $data['key2'];
$realcommand = $data['key3'];

if ($realcommand == "save") {
    save($realusername,$realalbumTitle);
} else if ($realcommand == "unsave") {
    unsave($realusername,$realalbumTitle);
}