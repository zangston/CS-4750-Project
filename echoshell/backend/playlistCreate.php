<?php
session_start(); 
include '../connect-db.php';
global $db;
global $created;

$user = $_SESSION['currUser'];
function createPlaylist($username,$ptitle) {
    global $db;
    global $created;
    $date = date("Y-m-d"); // Get the current date
    $query = "INSERT INTO playlist (playlist_title, owner_username, date_created, time_length) VALUES (:playlist_title, :owner_username, :date_created, 0)";
    $statement = $db->prepare($query);
    $statement->bindValue(':playlist_title', $ptitle);
    $statement->bindValue(':owner_username', $username);
    $statement->bindValue(':date_created', $date);
    
    $created = $statement->execute();
    $statement->closeCursor();
    return $created;
}

$jsonData = file_get_contents('php://input');

// Decode the JSON data
$data = json_decode($jsonData, true);

$ptitle = $data['key1'];

$result = createPlaylist($user,$ptitle);

$responseData = array(
    'status' => $result,
    'user' => $user
);

header('Content-Type: application/json');
echo json_encode($responseData);