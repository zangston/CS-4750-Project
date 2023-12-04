<?php
session_start();
include '../connect-db.php';
global $db;
global $check;
$check = false;

$user = $_SESSION['currUser'];
function newName($new, $old, $usern){
    global $db;
    global $check;
    $query = "UPDATE playlist SET playlist_title = :new_name WHERE playlist_title 
    = :old_name AND owner_username = :username";
    $statement = $db->prepare($query); 
    $statement->bindValue(':username', $usern);
    $statement->bindValue(':new_name', $new);
    $statement->bindValue(':old_name', $old);
    $result = $statement->execute();
    $statement->closeCursor();
    return $result;
}

$jsonData = file_get_contents('php://input');

// Decode the JSON data
$data = json_decode($jsonData, true);

$newName = $data['key1'];
$currName = $data['key2'];

$output = newName($newName,$currName,$user);

$responseData = array(
    'status' => $output
);

header('Content-Type: application/json');
echo json_encode($responseData);