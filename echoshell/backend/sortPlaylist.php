<?php
session_start();
include '../connect-db.php';
global $db;

$user = $_SESSION['currUser'];
function sortPlaylist($playlistName){
    global $db;
    $queryPL = "SELECT playlist_id FROM playlist WHERE playlist_title = :playlistTitle AND owner_username = :ownerUsername";
    $statementPlaylist = $db->prepare($queryPL);
    $statementPlaylist->bindParam(':playlistTitle', $playlistName);
    $statementPlaylist->bindParam(':ownerUsername', $_SESSION['currUser']);
    $statementPlaylist->execute();
    $playlistID = $statementPlaylist->fetchColumn();

    if ($playlistID){
        $query = "SELECT song_name FROM playlist_songs WHERE playlist_id = :playlistID ORDER BY song_name ASC";
        $statement = $db->prepare($query);
        $statement->bindParam(':playlistID', $playlistID);
        $statement->execute();
        $playlists = array(); 

        while ($row = $statement->fetch(PDO::FETCH_ASSOC)) {
            $playlists[] = $row['song_name']; 
        }
        $statement->closeCursor();
        return $playlists;
    }
    return false;
}

$jsonData = file_get_contents('php://input');

// Decode the JSON data
$data = json_decode($jsonData, true);


$pName = $data['key1'];

$output = sortPlaylist($pName);

$responseData = array(
    'playlists' => $output
);

header('Content-Type: application/json');
echo json_encode($responseData);