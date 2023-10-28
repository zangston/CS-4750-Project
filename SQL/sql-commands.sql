-- Redundancies spotted:
    -- follows and library_artists: if we display followed artists in library, then we can just use the first table and don't need both
    -- likes and library_liked_songs: same thing here
        -- also applies to likes and library_saved_albums since likes stores both liked songs and liked albums
    -- manages and library_playlists: if we don't offer the ability to look up other users' playlists, then there's no reason to have both of these tables

-- TODO:
    -- create playlist/rename playlist/reorder playlists
    -- change password
    -- reorder songs within playlist??

-- Lookup password given a username
SELECT password FROM user WHERE username = username_input; -- where password_input is passed in as a parameter based on user input
    -- successful login if user's password input matches the query

-- Find playlists in a user's library
SELECT * FROM library_playlists WHERE username = username_input;

-- Find saved albums in a user's library
SELECT * FROM library_saved_albums WHERE username = username_input;

-- Find user's followed artists
SELECT * FROM follows WHERE username = username_input;

-- Find all songs in a playlist
SELECT * FROM playlist_songs WHERE playlist_id = playlist_input;

-- Find all songs that a user has liked
SELECT * FROM library_liked_songs WHERE username = username_input;

-- Find all recommended songs for a user
SELECT * FROM recommendations WHERE username = username_input;

-- Find all songs in an album
SELECT * FROM (album NATURAL JOIN album_has) JOIN song ON song.song_id = album_has.song_id WHERE album_id = album_input;

-- Find all releases from an artist
SELECT * FROM releases WHERE artist = artist_input;

-- Delete a song from a playlist
DELETE FROM playlist_songs WHERE song_id = song_input;

-- Delete a playlist
DELETE FROM library_playlists WHERE username = user_input AND playlist_id = playlist_input;
DELETE FROM playlist WHERE owner_username = user_input AND playlist_id = playlist_input;

-- Unfollow an artist
DELETE FROM follows WHERE username = user_input AND artist_id = artist_input;

-- Delete (unsave) an album
DELETE FROM library_saved_albums WHERE username = user_input AND album_id = album_input;

-- Unlike a song/album
DELETE FROM likes WHERE username = user_input AND release_id = release_input;