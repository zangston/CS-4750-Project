<?php
session_start(); 
include '../connect-db.php';
global $db;
global $created;

$user = $_SESSION['currUser'];
function displayPlaylists($username) {
    global $db;
    global $created;
    
    $query = "SELECT playlist_title FROM playlist WHERE owner_username = :username";
    
    $statement = $db->prepare($query);    
    $statement->bindValue(':username', $username);
    $created = $statement->execute();
    

    $playlists = array(); 

    while ($row = $statement->fetch(PDO::FETCH_ASSOC)) {
        $playlists[] = $row['playlist_title']; 
    }

    $statement->closeCursor();
    return $playlists;
}

$result = displayPlaylists($user);

$responseData = array(
    'playlists' => $result
);

header('Content-Type: application/json');
echo json_encode($responseData);