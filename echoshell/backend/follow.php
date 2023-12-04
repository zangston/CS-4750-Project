<?php
include '../connect-db.php';
global $db;

function follow($username, $artistName) {
    global $db;

    $query = "INSERT INTO library_artists VALUES (:username, (SELECT artist_id FROM artist WHERE artist_name = :artistName))";

    $statement = $db->prepare($query);
    $statement->bindValue(':username', $username);
    $statement->bindValue(':artistName', $artistName);
    $statement->execute();
    $statement->closeCursor();
    $_SESSION["currUser"] = $username;
}

function unfollow($username, $artistName) {
    global $db;

    $query = "DELETE FROM library_artists VALUES (:username, (SELECT artist_id FROM artist WHERE artist_name = :artistName))";

    $statement = $db->prepare($query);
    $statement->bindValue(':username', $username);
    $statement->bindValue(':artistName', $artistName);
    $statement->execute();
    $statement->closeCursor();
    $_SESSION["currUser"] = $username;
}

$jsonData = file_get_contents('php://input');

// Decode the JSON data
$data = json_decode($jsonData, true);

$realusername = $data['key1'];
$realartistName = $data['key2'];
$realcommand = $data['key3'];

if ($realcommand == "follow") {
    follow($realusername,$realartistName);
} else if ($realcommand == "unfollow") {
    unfollow($realusername,$realartistName);
}
