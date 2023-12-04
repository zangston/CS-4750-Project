<?php
include '../connect-db.php';
global $db;

function customize($username, $fontColor) {
    global $db;

    $query = "UPDATE user SET font_color = :fontColor WHERE username = :username";
    $statement = $db->prepare($query);
    $statement->bindValue(':username', $username);
    $statement->bindValue(':fontColor', $fontColor);
    $statement->execute();
    $statement->closeCursor();
}


$jsonData = file_get_contents('php://input');

// Decode the JSON data
$data = json_decode($jsonData, true);

$realuser = $data['key1'];
$realfontcolor = $data['key2'];

customize($realuser,$realfontcolor);
