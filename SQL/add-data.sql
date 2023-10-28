-- create user
INSERT INTO user (username, name, password, date_joined, streams, background_color, font_color)
VALUES 
    ("testuser", "Test User", "Password123", "2023-10-26", 0, "FFFFFF", "000000"),
    ("topuser", "Spotify Fanatic", "IloveSpotify1", "2019-01-01", 0, "FFFFFF", "FFFFFF"),
    ("coolSongz21", "Music Man", "Songs000", "2020-01-01", 0, "FFFFFF", "FFFFFF");

-- test album and songs
-- insert artist info
INSERT INTO artist (artist_id, artist_name, spotify_followers)
VALUES 
    ("74XFHRwlV6OrjEM0A2NCMF", "Paramore", 8093430),
    ("6HvZYsbFfjnjFrWF950C9d", "New Jeans", 5822809);

-- insert album info 
INSERT INTO album (album_id, album_title, year, artist)
VALUES 
    ("6tG8sCK4htJOLjlWwb7gZB", "After Laughter" , 2017, "74XFHRwlV6OrjEM0A2NCMF"),
    ("4N1fROq2oeyLGAlQ1C1j18", "Get Up", 2023, "6HvZYsbFfjnjFrWF950C9d");

-- insert songs (god, why did i pick such a long album)
INSERT INTO song (song_id, artist, song_title, year, streams, duration, track_number)
VALUES
    ("0w5Bdu51Ka25Pf3hojsKHh", "74XFHRwlV6OrjEM0A2NCMF", "Hard Times", 2017, 0, 182693, 1), -- After Laughter by Paramore
    ("2RJfK2pOvGpnxC255YOy5k", "74XFHRwlV6OrjEM0A2NCMF", "Rose-Colored Boy", 2017, 0, 212853, 2),
    ("7BpYWzZwrsljT1eIjb0TqR", "74XFHRwlV6OrjEM0A2NCMF", "Told You So", 2017, 0, 188946, 3),
    ("74ABBu8osxqmuFOAKcWWpG", "74XFHRwlV6OrjEM0A2NCMF", "Forgiveness", 2017, 0, 219760, 4),
    ("6t44iU80A0h8WQ7vc4OoRj", "74XFHRwlV6OrjEM0A2NCMF", "Fake Happy", 2017, 0, 235706, 5),
    ("7MtlyFbHNTk0Il9wLB6kU5", "74XFHRwlV6OrjEM0A2NCMF", "26", 2017, 0, 221720, 6),
    ("3xCsHloPBl211Yi4UEUUcm", "74XFHRwlV6OrjEM0A2NCMF", "Pool", 2017, 0, 232786, 7),
    ("3WKz5JDH0St3Smips7NlOM", "74XFHRwlV6OrjEM0A2NCMF", "Grudges", 2017, 0, 187466, 8),
    ("27zJBz0YnuZO69U69z96vd", "74XFHRwlV6OrjEM0A2NCMF", "Caught in the Middle", 2017, 0, 214160, 9),
    ("50zSoW3GT1Ee4hXxQPO08t", "74XFHRwlV6OrjEM0A2NCMF", "Idle Worship", 2017, 0, 198413, 10),
    ("6RaLExL28RxCmQNUnDvUFT", "74XFHRwlV6OrjEM0A2NCMF", "No Friend", 2017, 0, 203773, 11),
    ("0Nt9OgNZ856RjKIPldNRf9", "74XFHRwlV6OrjEM0A2NCMF", "Tell Me How", 2017, 0, 260213, 12)
    ("7woEDtme8YkFiWeyiinIjy", "6HvZYsbFfjnjFrWF950C9d", "New Jeans", 2023, 0, 108142, 1), -- Get Up by New Jeans
    ("0kwrPQkiGVE8KTHalH1uMo", "6HvZYsbFfjnjFrWF950C9d", "Super Shy", 2023, 0, 154185, 2),
    ("56v8WEnGzLByGsDAXDiv4d", "6HvZYsbFfjnjFrWF950C9d", "ETA", 2023, 0, 231851, 3),
    ("02wk5BttM0QL38ERjLPQJB", "6HvZYsbFfjnjFrWF950C9d", "Cool With You", 2023, 0, 227581, 4),
    ("1wUnuiXMMvhudmzvcCtlZP", "6HvZYsbFfjnjFrWF950C9d", "Get Up", 2023, 0, 36686, 5),
    ("5fpyAakgFOm4YTXkgfPzvV", "6HvZYsbFfjnjFrWF950C9d", "ASAP", 2023, 0, 2148794, 6);

-- insert playlist data
INSERT INTO playlist (playlist_id, playlist_title, owner_username, date_created, time_length)
VALUES 
    (1, "Mental Mingle", "testuser", "2023-10-26", 3008838),
    (2, "MyFavPlaylist", "topuser", "2023-10-26", 691709),
    (3, "yo pass me the aux", "coolSongz21", "2023-10-27", 320995);

INSERT INTO manages (username, playlist_id)
VALUES 
    ("testuser", 1),
    ("topuser", 2),
    ("coolSongz21", 3);

INSERT INTO playlist_songs (playlist_id, song_id, song_order)
VALUES
    (1, "5fpyAakgFOm4YTXkgfPzvV", 1),
    (1, "1wUnuiXMMvhudmzvcCtlZP", 2),
    (1, "3WKz5JDH0St3Smips7NlOM", 3),
    (1, "3xCsHloPBl211Yi4UEUUcm", 4),
    (1, "27zJBz0YnuZO69U69z96vd", 5),
    (1, "7BpYWzZwrsljT1eIjb0TqR", 6),
    (2, "6t44iU80A0h8WQ7vc4OoRj", 1),
    (2, "3WKz5JDH0St3Smips7NlOM", 2),
    (2, "56v8WEnGzLByGsDAXDiv4d", 3),
    (2, "1wUnuiXMMvhudmzvcCtlZP", 4),
    (3, "2RJfK2pOvGpnxC255YOy5k", 1),
    (3, "7woEDtme8YkFiWeyiinIjy", 2);

-- insert album-song associations
INSERT INTO album_has (album_id, song_id)
VALUES 
    ("6tG8sCK4htJOLjlWwb7gZB", "0w5Bdu51Ka25Pf3hojsKHh"),   -- After Laughter by Paramore
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
    ("6tG8sCK4htJOLjlWwb7gZB", "0Nt9OgNZ856RjKIPldNRf9"),
    ("4N1fROq2oeyLGAlQ1C1j18", "7woEDtme8YkFiWeyiinIjy"),   -- Get Up by New Jeans
    ("4N1fROq2oeyLGAlQ1C1j18", "0kwrPQkiGVE8KTHalH1uMo"),
    ("4N1fROq2oeyLGAlQ1C1j18", "56v8WEnGzLByGsDAXDiv4d"),
    ("4N1fROq2oeyLGAlQ1C1j18", "02wk5BttM0QL38ERjLPQJB"),
    ("4N1fROq2oeyLGAlQ1C1j18", "1wUnuiXMMvhudmzvcCtlZP"),
    ("4N1fROq2oeyLGAlQ1C1j18", "5fpyAakgFOm4YTXkgfPzvV");

-- insert artist release associations
INSERT INTO releases (artist_id, release_id)
VALUES
    ("74XFHRwlV6OrjEM0A2NCMF", "6tG8sCK4htJOLjlWwb7gZB"),   -- After Laughter by Paramore
    ("74XFHRwlV6OrjEM0A2NCMF", "0w5Bdu51Ka25Pf3hojsKHh"),       -- After Laughter songs
    ("74XFHRwlV6OrjEM0A2NCMF", "2RJfK2pOvGpnxC255YOy5k"),
    ("74XFHRwlV6OrjEM0A2NCMF", "7BpYWzZwrsljT1eIjb0TqR"),
    ("74XFHRwlV6OrjEM0A2NCMF", "74ABBu8osxqmuFOAKcWWpG"),
    ("74XFHRwlV6OrjEM0A2NCMF", "6t44iU80A0h8WQ7vc4OoRj"),
    ("74XFHRwlV6OrjEM0A2NCMF", "7MtlyFbHNTk0Il9wLB6kU5"),
    ("74XFHRwlV6OrjEM0A2NCMF", "3xCsHloPBl211Yi4UEUUcm"),
    ("74XFHRwlV6OrjEM0A2NCMF", "3WKz5JDH0St3Smips7NlOM"),
    ("74XFHRwlV6OrjEM0A2NCMF", "27zJBz0YnuZO69U69z96vd"),
    ("74XFHRwlV6OrjEM0A2NCMF", "50zSoW3GT1Ee4hXxQPO08t"),
    ("74XFHRwlV6OrjEM0A2NCMF", "6RaLExL28RxCmQNUnDvUFT"),
    ("74XFHRwlV6OrjEM0A2NCMF", "0Nt9OgNZ856RjKIPldNRf9"),
    ("6HvZYsbFfjnjFrWF950C9d", "4N1fROq2oeyLGAlQ1C1j18"),   -- Get Up by New Jeans
    ("6HvZYsbFfjnjFrWF950C9d", "7woEDtme8YkFiWeyiinIjy"),       -- Get Up songs
    ("6HvZYsbFfjnjFrWF950C9d", "0kwrPQkiGVE8KTHalH1uMo"),
    ("6HvZYsbFfjnjFrWF950C9d", "56v8WEnGzLByGsDAXDiv4d"),
    ("6HvZYsbFfjnjFrWF950C9d", "02wk5BttM0QL38ERjLPQJB"),
    ("6HvZYsbFfjnjFrWF950C9d", "1wUnuiXMMvhudmzvcCtlZP"),
    ("6HvZYsbFfjnjFrWF950C9d", "5fpyAakgFOm4YTXkgfPzvV");

-- insert user likes associations
INSERT INTO likes (username, release_id)
VALUES 
    ("testuser", "0w5Bdu51Ka25Pf3hojsKHh"),
    ("topuser", "7woEDtme8YkFiWeyiinIjy");

-- insert recommendation associations
INSERT INTO recommendations (username, song_id)
VALUES
    ("testuser", "0w5Bdu51Ka25Pf3hojsKHh"),
    ("testuser", "2RJfK2pOvGpnxC255YOy5k"),
    ("testuser", "7BpYWzZwrsljT1eIjb0TqR"),
    ("testuser", "74ABBu8osxqmuFOAKcWWpG"),
    ("testuser", "6t44iU80A0h8WQ7vc4OoRj"),
    ("testuser", "7MtlyFbHNTk0Il9wLB6kU5"),
    ("testuser", "3xCsHloPBl211Yi4UEUUcm"),
    ("testuser", "3WKz5JDH0St3Smips7NlOM"),
    ("testuser", "27zJBz0YnuZO69U69z96vd"),
    ("testuser", "50zSoW3GT1Ee4hXxQPO08t"),
    ("testuser", "6RaLExL28RxCmQNUnDvUFT"),
    ("testuser", "0Nt9OgNZ856RjKIPldNRf9"),
    ("testuser", "56v8WEnGzLByGsDAXDiv4d"),
    ("testuser", "02wk5BttM0QL38ERjLPQJB");

-- insert following associations
INSERT INTO follows (username, artist_id)
VALUES
    ("testuser", "74XFHRwlV6OrjEM0A2NCMF"),
    ("topuser", "6HvZYsbFfjnjFrWF950C9d"),
    ("topuser", "74XFHRwlV6OrjEM0A2NCMF"),
    ("coolSongz21", "6HvZYsbFfjnjFrWF950C9d");

-- insert playlist library for user
INSERT INTO library_playlists (username, playlist_id, playlist_order)
VALUES
    ("testuser", 1, 1),
    ("topuser", 2, 1),
    ("coolSongsz21", 3, 1);

-- insert playlist library artists for user
INSERT INTO library_artists (username, artist_id)
VALUES
    ("testuser", "Paramore"),
    ("topuser", "New Jeans"),    
    ("topuser", "Paramore"),
    ("coolSongz21", "New Jeans");           

-- insert library of liked songs for user
INSERT INTO library_liked_songs (username, song_id)
VALUES
    ("testuser", "0w5Bdu51Ka25Pf3hojsKHh"),
    ("testuser", "7BpYWzZwrsljT1eIjb0TqR"),
    ("testuser", "74ABBu8osxqmuFOAKcWWpG"),
    ("testuser", "3xCsHloPBl211Yi4UEUUcm"),
    ("testuser", "3WKz5JDH0St3Smips7NlOM"),
    ("testuser", "7woEDtme8YkFiWeyiinIjy"),
    ("testuser", "5fpyAakgFOm4YTXkgfPzvV"),
    ("testuser", "50zSoW3GT1Ee4hXxQPO08t");

-- insert library of saved albums for user
INSERT INTO library_saved_albums (username, album_id)
VALUES
    ("testuser", "6tG8sCK4htJOLjlWwb7gZB"),
    ("topuser", "6tG8sCK4htJOLjlWwb7gZB"),
    ("topuser", "4N1fROq2oeyLGAlQ1C1j18"),
    ("coolSongz21", "4N1fROq2oeyLGAlQ1C1j18");