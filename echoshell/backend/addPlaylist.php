<?php
session_start();
include '..\connect-db.php'; 
global $db; 
function addSongToPlaylist($songName,$playlistName) {
    global $db; 

    $queryPlaylist = "SELECT playlist_id FROM playlist WHERE playlist_title = :pTitle AND owner_username = :ownerUsername";
    $statementPlaylist = $db->prepare($queryPlaylist);
    $statementPlaylist->bindParam(':pTitle', $playlistName);
    $statementPlaylist->bindParam(':ownerUsername', $_SESSION['currUser']);
    $statementPlaylist->execute();
    $playlistID = $statementPlaylist->fetchColumn();

    if ($playlistID){
        $querySong = "SELECT song_id FROM song WHERE song_title = :song_title";
        $statementSong = $db->prepare($querySong);
        $statementSong->bindParam(':song_title', $songName);
        $statementSong->execute();
        $songID = $statementSong->fetchColumn();

        if ($songID){
            $query = "INSERT INTO playlist_songs (playlist_id, song_id, song_name) VALUES (:playlistID, :songID, :songTitle)";
            $statement = $db->prepare($query);
            $statement->bindParam(':playlistID', $playlistID);
            $statement->bindParam(':songID', $songID);
            $statement->bindParam(':songTitle', $songName);
            $result = $statement->execute();
            return $result;
        }
        return false;
    }
    return false;
}

$jsonData = file_get_contents('php://input');

// Decode the JSON data
$data = json_decode($jsonData, true);

$songName = $data['key1'];
$playlistName = $data['key2'];

$output = addSongToPlaylist($songName,$playlistName);

$responseData = array(
    'status' => $output
);

header('Content-Type: application/json');
echo json_encode($responseData);