<?php
session_start(); 
include '../connect-db.php';
global $db;
global $created;

$user = $_SESSION['currUser'];

function getLib($libType, $username) {
    global $db
    
    if ($libType == '-s') {
        $query = "SELECT * FROM library_liked_songs WHERE username = '$username'";
    } elseif ($libType == '-al') {
        $query = "SELECT * FROM library_saved_albums WHERE username = '$username'";
    } elseif ($libType == '-ar') {
        $query = "SELECT * FROM library_artists WHERE username = '$username'";
    } elseif ($libType == '-p') {
        $query = "SELECT * FROM playlists WHERE username = '$username'";
    }
    $statement = $db->prepare($query);
    $statement->bindValue(':username', $username);
    $statement->execute();
    
    $results = $statement->fetchAll();
    $libList = array();
    foreach($results.serialize() as $entry) {
        // echo $entry . "<br/>";
        $libList[] = $entry
    }
    $statement->closeCursor();
    return $libList;
}

$type = $data['key1'];
$result = getLib($type, $user);

$responseData = array(
    'library' => $result
);

header('Content-Type: application/json');
echo json_encode($responseData);

// $jsonData = file_get_contents('php://input');

// // Decode the JSON data
// $data = json_decode($jsonData, true);

// $type = $data['key1'];
// $username = $data['key2'];

// if ($type == '-s') {
//     $whichLib = "Liked Songs";
// } elseif ($type == '-al') {
//     $whichLib = "Saved Albums";
// } elseif ($type == '-ar') {
//     $whichLib = "Liked Artists";
// } elseif ($type == '-p') {
//     $whichLib = "Your Playlists";
// }

// $libList = getLib($type, $username);
// echo json_encode($whichLib);
// echo json_encode($libList);
// foreach ($libList.serialize() as $entry):
//     echo $entry . "<br/>";
// ?>