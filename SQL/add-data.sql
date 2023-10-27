-- create user
INSERT INTO user (username, name, password, date_joined, streams, background_color, font_color)
VALUES ("testuser", "Test User", "password123", "2023-10-26", 0, "FFFFFF", "000000");

-- test album and songs: After Laughter by Paramore
-- insert artist info
INSERT INTO artist (artist_id, artist_name, spotify_followers)
VALUES ("74XFHRwlV6OrjEM0A2NCMF", "Paramore", "8093430")

-- insert album info 
INSERT INTO album (album_id, album_title, year, artist)
VALUES ("6tG8sCK4htJOLjlWwb7gZB", "After Laughter" , 2017, "74XFHRwlV6OrjEM0A2NCMF")

-- insert songs (god, why did i pick such a long album)
