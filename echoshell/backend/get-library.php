<?php
include '../connect-db.php';
global $db;

function getLib($libType, $username) {
    global $db
    if ($libType == '-s') {
        $query = "SELECT * FROM library_liked_songs WHERE username = '$username'";
    } elseif ($libType == '-al') {
        $query = "SELECT * FROM library_saved_albums WHERE username = '$username'";
    } elseif ($libType == '-ar') {
        $query = "SELECT * FROM library_artists WHERE username = '$username'";
    } elseif ($libType == '-p') {
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

if ($type == '-s') {
    $whichLib = "Liked Songs";
} elseif ($type == '-al') {
    $whichLib = "Saved Albums";
} elseif ($type == '-ar') {
    $whichLib = "Liked Artists";
} elseif ($type == '-p') {
    $whichLib = "Your Playlists";
}

$libList = getLib($type, $username);
echo $whichLib;
foreach ($libList as $entry):
    echo $entry . "<br/>";
?>