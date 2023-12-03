<?php
include '../connect-db.php';
global $db;

function getLib($libType, $username) {
    global $db
    if ($libType == 'songs') {
        $query = "SELECT * FROM library_liked_songs WHERE username = '$username'";
    } elseif ($libType == 'albums') {
        $query = "SELECT * FROM library_saved_albums WHERE username = '$username'";
    } elseif ($libType == 'artists') {
        $query = "SELECT * FROM library_artists WHERE username = '$username'";
    } elseif ($libType == 'playlists') {
        $query = "SELECT * FROM library_playlists WHERE username = '$username'";
    }
    $statement = $db->prepare($query);
    $statement->execute();
    $results = $statement->fetchAll();
    $statement->closeCursor();
    return $results;
}

$jsonData = file_get_contents('php://input');

// Decode the JSON data
$data = json_decode($jsonData, true);

$type = $data['key1'];
$username = $data['key2'];

getLib($type, $username);
?>