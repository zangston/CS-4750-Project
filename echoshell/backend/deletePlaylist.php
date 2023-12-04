<?php
session_start();
include '..\connect-db.php'; 
global $db; 
function removeSongFromPlaylist($songName,$playlistName) {
    global $db; 

    $queryPlaylist = "SELECT playlist_id FROM playlist WHERE playlist_title = :playlistTitle AND owner_username = :ownerUsername";
    $statementPlaylist = $db->prepare($queryPlaylist);
    $statementPlaylist->bindParam(':playlistTitle', $playlistName);
    $statementPlaylist->bindParam(':ownerUsername', $_SESSION['currUser']);
    $statementPlaylist->execute();
    $playlistID = $statementPlaylist->fetchColumn();
    
    if ($playlistID){
        $query = "DELETE FROM playlist_songs WHERE playlist_id = :playlistID AND song_name = :songName";
        $statement = $db->prepare($query);
        $statement->bindParam(':playlistID', $playlistID);
        $statement->bindParam(':songName', $songName);
        $result = $statement->execute();
        return $result;
    }
    return false;
}

$jsonData = file_get_contents('php://input');

// Decode the JSON data
$data = json_decode($jsonData, true);

$songName = $data['key1'];
$playlistName = $data['key2'];

$output = removeSongFromPlaylist($songName,$playlistName);

$responseData = array(
    'status' => $output
);

header('Content-Type: application/json');
echo json_encode($responseData);