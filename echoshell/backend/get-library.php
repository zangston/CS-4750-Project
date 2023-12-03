<?php

global $db;
$type = $_POST['type'];
$username = $_POST['user'];

if ($type == 'songs') {
    $query = "SELECT * FROM library_liked_songs WHERE username = '$username'";
} elseif ($type == 'albums') {
    $query = "SELECT * FROM library_saved_albums WHERE username = '$username'";
} elseif ($type == 'artists') {
    $query = "SELECT * FROM library_artists WHERE username = '$username'";
} elseif ($type == 'playlists') {
    $query = "SELECT * FROM library_playlists WHERE username = '$username'";
}

$statement = $db->prepare($query);
$statement->execute();
$results = $statement->fetchAll();
$statement->closeCursor();
return $results;

?>