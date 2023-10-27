-- Advanced SQL commands
-- Including CHECK Constraints and Triggers


-- CHECK Constraints

-- prevents users from registering with a username that already exists
--ALTER TABLE user
--ADD CONSTRAINT checkUsername UNIQUE (username);   -- i just added this one manually

-- requires user passwords to have at least one capital letter and at least one number
--ALTER TABLE user
--ADD CONSTRAINT checkPassword
--CHECK (password LIKE '%[A-Z]%' AND password LIKE '%[0-9]%');  -- this one doesn't work for some reason

-- checks that artist ID and release ID conform to Spotify standards (22 characters long)
ALTER TABLE releases
ADD CONSTRAINT checkIdLength
CHECK (CHAR_LENGTH(artist_id) = 22 AND CHAR_LENGTH(release_id) = 22);

-- prevents users from following an artist they already follow
ALTER TABLE follows
ADD CONSTRAINT checkDuplicateFollow UNIQUE (username, artist_id);

-- prevents users from liking a release they already liked
ALTER TABLE likes
ADD CONSTRAINT checkDuplicateLike UNIQUE (username, release_id);


-- Triggers

-- update time_length on each created playlist when a user adds a song to that playlist
DELIMITER $$
CREATE OR REPLACE TRIGGER addSongTrigger
BEFORE INSERT ON playlist_songs
FOR EACH ROW
BEGIN
    UPDATE playlist
    SET time_length = time_length + (SELECT duration FROM song WHERE song_id = new.song_id)
    WHERE playlist_id = new.playlist_id;
END
$$
DELIMITER ;

-- update time_length on each created playlist when a user removes a song from that playlist
DELIMITER $$
CREATE OR REPLACE TRIGGER removeSongTrigger
AFTER DELETE ON playlist_songs
FOR EACH ROW
BEGIN
    UPDATE playlist
    SET time_length = time_length - (SELECT duration FROM song WHERE song_id = old.song_id)
    WHERE playlist_id = old.playlist_id;
END
$$
DELIMITER ;
