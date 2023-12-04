<?php
session_start(); 
include '../connect-db.php';
global $db;


$user = $_SESSION['currUser'];
function getLib($username) {
    global $db;

    
    $query = "SELECT artist_id FROM library_artists WHERE username = :username";

    $statement = $db->prepare($query);    
    $statement->bindValue(':username', $username);
    $created = $statement->execute();
    

    $library = array(); 

    while ($row = $statement->fetch(PDO::FETCH_ASSOC)) {
        $library[] = $row['artist_id']; 
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