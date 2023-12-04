<?php
session_start();
include '../connect-db.php';
global $db;
global $check;
$check = false;

function log_in($user, $pswd){
    global $db;
    global $check;
    $query = "SELECT password FROM user WHERE username = :username";
    $statement = $db->prepare($query); 
    $statement->bindValue(':username', $user);
    $statement->execute();
    $storedPassword = $statement->fetch();
    if (password_verify($pswd, $storedPassword[0])) {
    $_SESSION["currUser"] = $user;
    $check = true;
    }
    $statement->closeCursor();
}

$jsonData = file_get_contents('php://input');

// Decode the JSON data
$data = json_decode($jsonData, true);

$realuser = $data['key1'];
$realpswd = $data['key2'];

log_in($realuser,$realpswd);

$responseData = array(
    'status' => $check
);

header('Content-Type: application/json');
echo json_encode($responseData);