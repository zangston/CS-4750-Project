<?php
include '../connect-db.php';
global $db;

function populateSong($song_id, $artist_id, $title, $year, $streams, $preduration, $trackNumber, $artist, $artist_followers) {
    global $db;

    // insert artist into artist table so that song can be added
    $query = "INSERT INTO artist VALUES (:artist_id, :artist_name, :spotify_followers)";

    $statement = $db->prepare($query);
    $statement->bindValue(':artist_id', $artist_id);
    $statement->bindValue(':artist_name', $artist);
    $statement->bindValue(':spotify_followers', $artist_followers);
    $statement->execute();
    $statement->closeCursor();

    // insert song into the song table
    $query2 = "INSERT INTO song VALUES (:song_id, :artist, :song_title, :year, :streams, :duration, :track_number)";

    $statement2 = $db->prepare($query2);
    $statement2->bindValue(':song_id', $song_id);
    $statement2->bindValue(':artist', $artist_id);
    $statement2->bindValue(':song_title', $title);
    $statement2->bindValue(':year', $year);
    $statement2->bindValue(':streams', $streams);
    $statement2->bindValue(':duration', $preduration);
    $statement2->bindValue(':track_number', $trackNumber);
    $statement2->execute();
    $statement2->closeCursor();

}

// function populateAlbum($username, $songTitle) {
//     global $db;
//
//     $query = "INSERT INTO library_liked_songs VALUES (:username, (SELECT song_id FROM song WHERE song_title = :songTitle))";
//
//     $statement = $db->prepare($query);
//     $statement->bindValue(':username', $username);
//     $statement->bindValue(':songTitle', $songTitle);
//     $statement->execute();
//     $statement->closeCursor();
//     $_SESSION["currUser"] = $username;
// }
//
// function populateArtist($username, $songTitle) {
//     global $db;
//
//     $query = "INSERT INTO library_liked_songs VALUES (:username, (SELECT song_id FROM song WHERE song_title = :songTitle))";
//
//     $statement = $db->prepare($query);
//     $statement->bindValue(':username', $username);
//     $statement->bindValue(':songTitle', $songTitle);
//     $statement->execute();
//     $statement->closeCursor();
//     $_SESSION["currUser"] = $username;
// }

$jsonData = file_get_contents('php://input');

// Decode the JSON data
$data = json_decode($jsonData, true);

$realsearchType = $data['key1'];
// $realsongTitle = $data['key2'];
// $realcommand = $data['key3'];

if ($realsearchType == "track") {
    $realsong_id = $data['key2'];
    $realartist_id = $data['key3'];
    $realtitle = $data['key4'];
    $realyear = $data['key5'];
    $realstreams = $data['key6'];
    $realpreduration = $data['key7'];
    $realtrackNumber = $data['key8'];
    $realartist = $data['key9'];
    $realartist_followers = $data['key10'];
    populateSong($realsong_id, $realartist_id, $realtitle, $realyear, $realstreams, $realpreduration, $realtrackNumber, $realartist, $realartist_followers);
}
// else if ($realsearchType == "album") {
//     $realartist = $data['key2'];
//     $realtitle = $data['key3'];
//     $realyear = $data['key4'];
//     $realduration = $data['key5'];
//     $realtrackNumber = $data['key6'];
//     populateSong($realartist, $realtitle, $realyear, $realduration, $realtrackNumber);
// }
