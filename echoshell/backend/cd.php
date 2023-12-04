<?php
session_start(); 
include '../connect-db.php';
global $db;
global $number;

$user = $_SESSION['currUser'];
function cdPlaylist($username,$pname) {
    global $db;
    global $number;
    $query = "SELECT COUNT(*) FROM playlist WHERE owner_username = :owner_username AND playlist_title = :playlist_title";
    $statement = $db->prepare($query);
    $statement->bindValue(':playlist_title', $pname);
    $statement->bindValue(':owner_username', $username);
    $number = $statement->execute();
    $statement->closeCursor();
    return $number;
}

$jsonData = file_get_contents('php://input');

// Decode the JSON data
$data = json_decode($jsonData, true);

$pname = $data['key1'];

$result = cdPlaylist($user,$pname);

$responseData = array(
    'number' => $result,
);

header('Content-Type: application/json');
echo json_encode($responseData);