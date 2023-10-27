-- create user
INSERT INTO user (username, name, password, date_joined, streams, background_color, font_color)
VALUES ("testuser", "Test User", "password123", "2023-10-26", 0, "FFFFFF", "000000");

-- test album and songs: After Laughter by Paramore
-- insert artist info
INSERT INTO artist (artist_id, artist_name, spotify_followers)
VALUES ("74XFHRwlV6OrjEM0A2NCMF", "Paramore", "8093430");
-- insert album info 
INSERT INTO album (album_id, album_title, year, artist)
VALUES ("6tG8sCK4htJOLjlWwb7gZB", "After Laughter" , 2017, "74XFHRwlV6OrjEM0A2NCMF");
-- insert songs (god, why did i pick such a long album)
INSERT INTO song (song_id, artist, song_title, year, streams, duration, track_number)
VALUES 
    ("0w5Bdu51Ka25Pf3hojsKHh", "74XFHRwlV6OrjEM0A2NCMF", "Hard Times", 2017, 0, 182693, 1),
    ("2RJfK2pOvGpnxC255YOy5k", "74XFHRwlV6OrjEM0A2NCMF" , "Rose-Colored Boy", 2017, 0, 212853, 2),
    ("7BpYWzZwrsljT1eIjb0TqR", "74XFHRwlV6OrjEM0A2NCMF" , "Told You So", 2017, 0, 188946, 3),
    ("74ABBu8osxqmuFOAKcWWpG", "74XFHRwlV6OrjEM0A2NCMF" , "Forgiveness", 2017, 0, 219760, 4),
    ("6t44iU80A0h8WQ7vc4OoRj", "74XFHRwlV6OrjEM0A2NCMF" , "Fake Happy", 2017, 0, 235706, 5),
    ("7MtlyFbHNTk0Il9wLB6kU5", "74XFHRwlV6OrjEM0A2NCMF" , "26", 2017, 0, 221720, 6),
    ("3xCsHloPBl211Yi4UEUUcm", "74XFHRwlV6OrjEM0A2NCMF" , "Pool", 2017, 0, 232786, 7),
    ("3WKz5JDH0St3Smips7NlOM", "74XFHRwlV6OrjEM0A2NCMF" , "Grudges", 2017, 0, 187466, 8),
    ("27zJBz0YnuZO69U69z96vd", "74XFHRwlV6OrjEM0A2NCMF" , "Caught in the Middle", 2017, 0, 214160, 9),
    ("50zSoW3GT1Ee4hXxQPO08t", "74XFHRwlV6OrjEM0A2NCMF" , "Idle Worship", 2017, 0, 198413, 10),
    ("6RaLExL28RxCmQNUnDvUFT", "74XFHRwlV6OrjEM0A2NCMF" , "No Friend", 2017, 0, 203773, 11),
    ("0Nt9OgNZ856RjKIPldNRf9", "74XFHRwlV6OrjEM0A2NCMF" , "Tell Me How", 2017, 0, 260213, 12);
-- insert album-song associations
INSERT INTO album_has (album_id, song_id)
VALUES 
    ("6tG8sCK4htJOLjlWwb7gZB", "0w5Bdu51Ka25Pf3hojsKHh"),
    ("6tG8sCK4htJOLjlWwb7gZB", "2RJfK2pOvGpnxC255YOy5k"),
    ("6tG8sCK4htJOLjlWwb7gZB", "7BpYWzZwrsljT1eIjb0TqR"),
    ("6tG8sCK4htJOLjlWwb7gZB", "74ABBu8osxqmuFOAKcWWpG"),
    ("6tG8sCK4htJOLjlWwb7gZB", "6t44iU80A0h8WQ7vc4OoRj"),
    ("6tG8sCK4htJOLjlWwb7gZB", "7MtlyFbHNTk0Il9wLB6kU5"),
    ("6tG8sCK4htJOLjlWwb7gZB", "3xCsHloPBl211Yi4UEUUcm"),
    ("6tG8sCK4htJOLjlWwb7gZB", "3WKz5JDH0St3Smips7NlOM"),
    ("6tG8sCK4htJOLjlWwb7gZB", "27zJBz0YnuZO69U69z96vd"),
    ("6tG8sCK4htJOLjlWwb7gZB", "50zSoW3GT1Ee4hXxQPO08t"),
    ("6tG8sCK4htJOLjlWwb7gZB", "6RaLExL28RxCmQNUnDvUFT"),
    ("6tG8sCK4htJOLjlWwb7gZB", "0Nt9OgNZ856RjKIPldNRf9");
