<?php
session_start(); 
include '../connect-db.php';
global $db;


function getLib($username) {
    global $db;

    
    $query = "SELECT album_title FROM album, ( SELECT album_id FROM library_saved_albums WHERE username = :username ) AS liked WHERE album.album_id = liked.album_id";

    $statement = $db->prepare($query);    
    $statement->bindValue(':username', $username);
    $created = $statement->execute();
    

    $library = array(); 

    while ($row = $statement->fetch(PDO::FETCH_ASSOC)) {
        $library[] = $row['album_id']; 
    }

    $statement->closeCursor();
    return $library;
}
$user = $data['key1'];

$result = getLib($user);

$responseData = array(
    'library' => $result
);

header('Content-Type: application/json');
echo json_encode($responseData);