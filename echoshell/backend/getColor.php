<?php
session_start();
include '../connect-db.php';
global $db;

function getColor($user){
    global $db;
    $query = "SELECT font_color FROM user WHERE username = :username";
    $statement = $db->prepare($query); 
    $statement->bindValue(':username', $user);
    $statement->execute();

    $output = $statement->fetchColumn();

    $statement->closeCursor();

    return $output;
}

$jsonData = file_get_contents('php://input');

// Decode the JSON data
$data = json_decode($jsonData, true);

$realuser = $data['key1'];

$variable = getColor($realuser);

$responseData = array(
    'color' => $variable
);

header('Content-Type: application/json');
echo json_encode($responseData);