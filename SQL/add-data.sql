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
INSERT INTO song (song_id, artist, song_title, year, streams, duration, track_number)
VALUES ("0w5Bdu51Ka25Pf3hojsKHh", "74XFHRwlV6OrjEM0A2NCMF", "Hard Times", 2017, 0, 182693, 1)
INSERT INTO song (song_id, artist, song_title, year, streams, duration, track_number)
VALUES ("2RJfK2pOvGpnxC255YOy5k", "74XFHRwlV6OrjEM0A2NCMF" , "Rose-Colored Boy", 2017, 0, 212853, 2)
INSERT INTO song (song_id, artist, song_title, year, streams, duration, track_number)
VALUES ("7BpYWzZwrsljT1eIjb0TqR", "74XFHRwlV6OrjEM0A2NCMF" , "Told You So", 2017, 0, 188946, 3)
INSERT INTO song (song_id, artist, song_title, year, streams, duration, track_number)
VALUES ("74ABBu8osxqmuFOAKcWWpG", "74XFHRwlV6OrjEM0A2NCMF" , "Forgiveness", 2017, 0, 219760, 4)
INSERT INTO song (song_id, artist, song_title, year, streams, duration, track_number)
VALUES ("6t44iU80A0h8WQ7vc4OoRj", "74XFHRwlV6OrjEM0A2NCMF" , "Fake Happy", 2017, 0, 235706, 5)
INSERT INTO song (song_id, artist, song_title, year, streams, duration, track_number)
VALUES (, "74XFHRwlV6OrjEM0A2NCMF" , "", 2017, 0, , 6)
INSERT INTO song (song_id, artist, song_title, year, streams, duration, track_number)
VALUES (, "74XFHRwlV6OrjEM0A2NCMF" , "", 2017, 0, , 7)
INSERT INTO song (song_id, artist, song_title, year, streams, duration, track_number)
VALUES (, "74XFHRwlV6OrjEM0A2NCMF" , "", 2017, 0, , 8)
INSERT INTO song (song_id, artist, song_title, year, streams, duration, track_number)
VALUES (, "74XFHRwlV6OrjEM0A2NCMF" , "", 2017, 0, , 9)
INSERT INTO song (song_id, artist, song_title, year, streams, duration, track_number)
VALUES (, "74XFHRwlV6OrjEM0A2NCMF" , "", 2017, 0, , 10)
INSERT INTO song (song_id, artist, song_title, year, streams, duration, track_number)
VALUES (, "74XFHRwlV6OrjEM0A2NCMF" , "", 2017, 0, , 11)
INSERT INTO song (song_id, artist, song_title, year, streams, duration, track_number)
VALUES (, "74XFHRwlV6OrjEM0A2NCMF" , "", 2017, 0, , 12)