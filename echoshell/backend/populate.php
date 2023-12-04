<?php
include '../connect-db.php';
global $db;

// populate song table (artist and song)
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

// populate album table (artist and album)
function populateAlbum($album_id, $albumName, $year, $artist_id, $artist_name, $artist_followers) {
    global $db;

    // insert artist into artist table so that song can be added
    $query = "INSERT INTO artist VALUES (:artist_id, :artist_name, :spotify_followers)";

    $statement = $db->prepare($query);
    $statement->bindValue(':artist_id', $artist_id);
    $statement->bindValue(':artist_name', $artist_name);
    $statement->bindValue(':spotify_followers', $artist_followers);
    $statement->execute();
    $statement->closeCursor();

    // insert album into the albums song
    $query2 = "INSERT INTO album VALUES (:album_id, :album_title, :year, :artist)";

    $statement2 = $db->prepare($query2);
    $statement2->bindValue(':album_id', $album_id);
    $statement2->bindValue(':album_title', $albumName);
    $statement2->bindValue(':year', $year);
    $statement2->bindValue(':artist', $artist_id);
    $statement2->execute();
    $statement2->closeCursor();
}

// populate artist table
function populateArtist($artist_id, $artistName, $artist_followers) {
    global $db;

    // insert artist into artist table
    $query = "INSERT INTO artist VALUES (:artist_id, :artist_name, :spotify_followers)";

    $statement = $db->prepare($query);
    $statement->bindValue(':artist_id', $artist_id);
    $statement->bindValue(':artist_name', $artistName);
    $statement->bindValue(':spotify_followers', $artist_followers);
    $statement->execute();
    $statement->closeCursor();
}

$jsonData = file_get_contents('php://input');

// Decode the JSON data
$data = json_decode($jsonData, true);

$realsearchType = $data['key1'];

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
} else if ($realsearchType == "album") {
    $realalbum_id = $data['key2'];
    $realalbumName = $data['key3'];
    $realyear = $data['key4'];
    $realartist_id = $data['key5'];
    $realartist_name = $data['key6'];
    $realartist_followers = $data['key7'];
    populateAlbum($realalbum_id, $realalbumName, $realyear, $realartist_id, $realartist_name, $realartist_followers);
} else if ($realsearchType == "artist") {
    $realartist_id = $data['key2'];
    $realartistName = $data['key3'];
    $realartist_followers = $data['key4'];
    populateArtist($realartist_id, $realartistName, $realartist_followers);
}
