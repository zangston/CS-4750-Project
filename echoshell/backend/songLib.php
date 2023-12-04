<?php
session_start(); 
include '../connect-db.php';
global $db;

$user = $_SESSION['currUser'];
function getLib($username) {
    global $db;

    
    $query = "SELECT song_title FROM `song`, ( SELECT song_id FROM library_liked_songs WHERE username = :username ) AS liked WHERE song.song_id = liked.song_id";
    // "SELECT song_title FROM library_liked_songs WHERE username = :username";

    $statement = $db->prepare($query);    
    $statement->bindValue(':username', $username);
    $created = $statement->execute();
    

    $library = array(); 

    while ($row = $statement->fetch(PDO::FETCH_ASSOC)) {
        $library[] = $row['song_title']; 
    }

    $statement->closeCursor();
    return $library;
}
// $user = $data['key1'];

$result = getLib($user);

$responseData = array(
    'library' => $result
);

header('Content-Type: application/json');
echo json_encode($responseData);