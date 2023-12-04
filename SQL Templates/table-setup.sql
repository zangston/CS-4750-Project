-- Running this script will populate the database with all of the tables needed for the app to work
    -- Tables are created according to schema statements with were derived from E-R diagram and normalization

-- user(username, name, password, date_joined, streams, background_color, font_color)
CREATE TABLE user (
    DISTINCT username VARCHAR(255) PRIMARY KEY,
    name VARCHAR(255),
    password VARCHAR(255),
    date_joined DATE,
    streams INT,
    background_color VARCHAR(255),
    font_color VARCHAR(255)
);

-- artist(artist_id, artist_name, spotify_followers)
CREATE TABLE artist (
    artist_id VARCHAR(255) PRIMARY KEY,
    artist_name VARCHAR(255),
    spotify_followers INT
);

-- follows(username, artist_id)
CREATE TABLE follows (
    username VARCHAR(255),
    artist_id VARCHAR(255),
    FOREIGN KEY (username) REFERENCES user(username),
    FOREIGN KEY (artist_id) REFERENCES artist(artist_id)
);

-- releases(artist_id, release_id)
CREATE TABLE releases (
    artist_id VARCHAR(255),
    release_id VARCHAR(255) PRIMARY KEY,
    FOREIGN KEY (artist_id) REFERENCES artist(artist_id)
);

-- likes(username, release_id)
CREATE TABLE likes (
    username VARCHAR(255),
    release_id VARCHAR(255),
    FOREIGN KEY (username) REFERENCES user(username),
    FOREIGN KEY (release_id) REFERENCES releases(release_id)
);

-- playlist(playlist_id, playlist_title, owner_username, date_created, time_length, song_titles)
CREATE TABLE playlist (
    playlist_id INT PRIMARY KEY AUTO_INCREMENT,
    playlist_title VARCHAR(255),
    owner_username VARCHAR(255),
    date_created DATE,
    time_length INT,
    -- song_titles VARCHAR(255),
    FOREIGN KEY (owner_username) REFERENCES user(username)
);

-- manages(username, playlist_id)
CREATE TABLE manages (
    username VARCHAR(255),
    playlist_id INT,
    FOREIGN KEY (username) REFERENCES user(username),
    FOREIGN KEY (playlist_id) REFERENCES playlist(playlist_id)
);

-- song(song_id, artist, song_title, year, streams)
CREATE TABLE song (
    song_id VARCHAR(255) PRIMARY KEY,
    artist VARCHAR(255),
    song_title VARCHAR(255),
    year INT,
    streams INT,
    duration INT,
    track_number INT,
    FOREIGN KEY (artist) REFERENCES artist(artist_id)
);

-- recommendations(username, song_id)
CREATE TABLE recommendations (
    username VARCHAR(255),
    song_id VARCHAR(255),
    FOREIGN KEY (username) REFERENCES user(username),
    FOREIGN KEY (song_id) REFERENCES song(song_id)
);

-- owns(artist, song_title, album_title)
-- CREATE TABLE owns (
--     artist VARCHAR(255),
--     song_title VARCHAR(255),
--     album_title VARCHAR(255),
--     FOREIGN KEY (artist) REFERENCES artist(artist_id),
--     FOREIGN KEY (song_title) REFERENCES song(song_title),
--     FOREIGN KEY (album_title) REFERENCES album(album_title)
-- );

-- album(album_id, album_title, year, artist)
CREATE TABLE album (
    album_id VARCHAR(255) PRIMARY KEY,
    album_title VARCHAR(255),
    year INT,
    artist VARCHAR(255),
    FOREIGN KEY (artist) REFERENCES artist(artist_id)
);

-- album_has(album_id, song_id)
CREATE TABLE album_has (
    album_id VARCHAR(255),
    song_id VARCHAR(255),
    FOREIGN KEY (album_id) REFERENCES album(album_id),
    FOREIGN KEY (song_id) REFERENCES song(song_id)
);

-- playlist_songs(playlist_id, song_id)
CREATE TABLE playlist_songs (
    playlist_id INT,
    song_id VARCHAR(255),
    song_order INT,
    FOREIGN KEY (playlist_id) REFERENCES playlist(playlist_id),
    FOREIGN KEY (song_id) REFERENCES song(song_id)
);

-- library(username, playlists, artists, liked_songs, saved_albums)
-- CREATE TABLE library (
--     username VARCHAR(255),
--     playlists VARCHAR(255),
--     artists VARCHAR(255),
--     liked_songs VARCHAR(255),
--     saved_albums VARCHAR(255),
--     FOREIGN KEY (username) REFERENCES user(username)
-- );

-- library_playlists(username, playlist_id)
CREATE TABLE library_playlists (
    username VARCHAR(255),
    playlist_id INT,
    playlist_order INT,
    FOREIGN KEY (username) REFERENCES user(username),
    FOREIGN KEY (playlist_id) REFERENCES playlist(playlist_id)
);

-- library_artists(username, artist_id)
CREATE TABLE library_artists (
    username VARCHAR(255),
    artist_id VARCHAR(255),
    FOREIGN KEY (username) REFERENCES user(username),
    FOREIGN KEY (artist_id) REFERENCES artist(artist_id)
);

-- library_liked_songs(username, song_id)
CREATE TABLE library_liked_songs (
    username VARCHAR(255),
    song_id VARCHAR(255),
    FOREIGN KEY (username) REFERENCES user(username),
    FOREIGN KEY (song_id) REFERENCES song(song_id)
);

-- library_saved_albums(username, album_id)
CREATE TABLE library_saved_albums (
    username VARCHAR(255),
    album_id VARCHAR(255),
    FOREIGN KEY (username) REFERENCES user(username),
    FOREIGN KEY (album_id) REFERENCES album(album_id)
);
