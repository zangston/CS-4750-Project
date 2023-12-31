class Parser {
    loggedIn = false;

    constructor() {
        this.loggedIn = false;
        this.selected = false;
        this.currPlay = "";
        this.user = "";
    }

    async loginhelper(dataToSend){
        let response = await fetch('backend/login.php', {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json'
        },
        body: JSON.stringify(dataToSend)
            })
        let data = await response.json();
        console.log(data);
        var checking = data.status;
        this.loggedIn = checking;
        console.log(this.loggedIn);
        console.log(response);
    }
  
    async colorHelper(dataToSend){
        let response = await fetch('backend/getColor.php', {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json'
        },
        body: JSON.stringify(dataToSend)
            })
        let data = await response.json();
        var color_name = JSON.stringify(data.color);
        return color_name;
    }
  
    // display liked songs
    async songLibHelper(dataToSend) {
        let response = await fetch('backend/songLib.php', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify(dataToSend)
                })
            let data = await response.json();
            console.log(data);
            var array = data.library;
            return array
    }

    // display saved albums
    async albumLibHelper(dataToSend) {
        let response = await fetch('backend/albumLib.php', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify(dataToSend)
                })
            let data = await response.json();
            console.log(data);
            var array = data.library;
            return array
    }

    // display liked artists
    async artistLibHelper(dataToSend) {
        let response = await fetch('backend/artistLib.php', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify(dataToSend)
                })
            let data = await response.json();
            console.log(data);
            var array = data.library;
            return array
    }

    // display playlists
    async playlistLibHelper(dataToSend) {
        let response = await fetch('backend/playlistLib.php', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify(dataToSend)
                })
            let data = await response.json();
            console.log(data);
            var array = data.library;
            return array
    }

    //helper function for creating playlist
    async playlistCreateHelper(dataToSend){
        let response = await fetch('backend/playlistCreate.php', {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json'
        },
        body: JSON.stringify(dataToSend)
            })
        let data = await response.json();
        console.log(data);
        var checking = data.status;
        return checking
    }

    //helper function for displaying playlists
    async playlistDisplayHelper(dataToSend){
        let response = await fetch('backend/playlistDisplay.php', {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json'
        },
        body: JSON.stringify(dataToSend)
            })
        let data = await response.json();
        console.log(data);
        var array = data.playlists;
        return array
    }

    //helper function for displaying playlists
    async cdHelper(dataToSend){
        let response = await fetch('backend/cd.php', {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json'
        },
        body: JSON.stringify(dataToSend)
            })
        let data = await response.json();
        console.log(data);
        var number = data.number;
        return number
    }

    //helper function for renaming playlists
    async renameHelper(dataToSend){
        let response = await fetch('backend/rename.php', {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json'
        },
        body: JSON.stringify(dataToSend)
            })
        let data = await response.json();
        console.log(data);
        var stat = data.status;
        return stat
    }

    async addHelper(dataToSend){
        let response = await fetch('backend/addPlaylist.php', {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json'
        },
        body: JSON.stringify(dataToSend)
            })
        let data = await response.json();
        console.log(data);
        var stat = data.status;
        return stat
    }

    async deleteHelper(dataToSend){
        let response = await fetch('backend/deletePlaylist.php', {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json'
        },
        body: JSON.stringify(dataToSend)
            })
        let data = await response.json();
        console.log(data);
        var stat = data.status;
        return stat
    }

    async playlistViewHelper(dataToSend){
        let response = await fetch('backend/viewPlaylist.php', {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json'
        },
        body: JSON.stringify(dataToSend)
            })
        let data = await response.json();
        console.log(data);
        var array = data.playlists;
        return array
    }

    async playlistSortHelper(dataToSend){
        let response = await fetch('backend/sortPlaylist.php', {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json'
        },
        body: JSON.stringify(dataToSend)
            })
        let data = await response.json();
        console.log(data);
        var array = data.playlists;
        return array
    }

    async parseInput(input) {
        var tokens = input.split(' ');
        var command = tokens[0]
        var response = command + " is not recognized as a command";

        // Help command
        if (command.toLowerCase() == 'help') {
            response = await readFile("assets/help.txt") + "\r\n";
        }
        
        if (command.toLowerCase() == 'playlist'){
            if (this.loggedIn){
                if (tokens[1] && tokens[1] == "create" && tokens[2] && tokens.length == 3){
                    var playName = tokens[2];
                    const dataToSend = {
                        key1: playName,
                    };
                    var checker = await this.playlistCreateHelper(dataToSend);
                    if (checker){
                        response = "Playlist " + playName + " has been created.";
                    }
                    else {
                        response = "Playlist creation has failed.";
                    }
                }
                if (tokens[1] && tokens[1] == "ls" && tokens.length == 2){
                    const dataToSend = {
                        key1: "username",
                    };
                    var array = await this.playlistDisplayHelper(dataToSend);
                    var output = "";
                    for (let x in array){
                        output += array[x]+"\r\n";
                    }
                    response = output;
                }

                if (tokens[1] && tokens[1] == "cd" && tokens[2] && tokens.length == 3){
                    if (!this.selected){
                        var playlistName = tokens[2];
                        const dataToSend = {
                            key1: playlistName,
                        };
                        var numPlaylist = await this.cdHelper(dataToSend);
                        if (!numPlaylist){
                            response = "You cannot cd into a playlist that doesn't exist.";
                        }
                        else {
                            this.selected = true;
                            this.currPlay = playlistName;
                            response = "Successfully cd'd into " + playlistName;
                        }
                    }
                    else{
                        if (tokens[2] == ".."){
                            this.selected = false;
                            this.currPlay = "";
                            response = "Successfully exited playlist.";
                        }
                        else{
                            response = "You cannot cd while in a playlist.";
                        }    
                    }   
                }
                
            }
            else {
                response = "You can only create playlists when you're logged in."
            }
        }

        //playlist subcommands
        if (this.selected){
            if (tokens[0] && tokens[0] == "add" && tokens[1]){
                var songName = tokens[1];
                for (let i = 2; i < 100; i++){
                    if (tokens[i]){
                        songName = songName + " " + tokens[i];
                    }
                    else{
                        break;
                    }
                }
                const dataToSend = {
                    key1: songName,
                    key2: this.currPlay
                };
                var diditAdd = await this.addHelper(dataToSend);
                if (diditAdd){
                    response = "Song: " + songName + " has been added to " + this.currPlay + ".";
                }
                else {
                    response = "Song failed to add."
                }
            }
            if (tokens[0] && tokens[0] == "view"){
                var playlistName = tokens[1];
                for (let i = 2; i < 100; i++){
                    if (tokens[i]){
                        songName = songName + " " + tokens[i];
                    }
                    else{
                        break;
                    }
                }
                const dataToSend = {
                    key1: this.currPlay,
                };
                var array = await this.playlistViewHelper(dataToSend);
                var output = "";
                for (let x in array){
                    output += array[x]+"\r\n";
                }
                response = output;
            }
            if (tokens[0] && tokens[0] == "delete" && tokens[1]){
                var songName = tokens[1];
                const dataToSend = {
                    key1: songName,
                    key2: this.currPlay
                };
                var diditDelete = await this.deleteHelper(dataToSend);
                if (diditDelete){
                    response = "Song: " + songName + " has been removed from " + this.currPlay + ".";
                }
                else {
                    response = "Song failed to delete."
                }
            }
            if (tokens[0] && tokens[0] == "rename" && tokens[1]){
                var newName = tokens[1];
                const dataToSend = {
                    key1: newName,
                    key2: this.currPlay
                };
                var renamed = await this.renameHelper(dataToSend);
                if (renamed == true){
                    this.currplay = newName;
                    response = "Successfully renamed playlist to " + newName; 
                }
                else {
                    response = "Renaming process failed."
                }
            }
            if (tokens[0] && tokens[0] == "sort"){
                const dataToSend = {
                    key1: this.currPlay
                };
                var array = await this.playlistSortHelper(dataToSend);
                var output = "";
                for (let x in array){
                    output += array[x]+"\r\n";
                }
                response = output;
            }
        } 

        // Login command
        if (command.toLowerCase() == 'login') {
            if (!this.loggedIn) {
                //TODO replace this with actual login code
                if (tokens[1] && tokens[1].toLowerCase() == '-u' && tokens[3] && tokens[3].toLowerCase() == '-p' && tokens.length == 5){
                    var username = tokens[2];
                    var password = tokens[4];
                    const dataToSend = {
                        key1: username,
                        key2: password,
                      };
                      console.log("D");
                    
                    console.log(response);
                    console.log(this.loggedIn);
                    await this.loginhelper(dataToSend);
                    if (this.loggedIn){
                        this.user = username;
                        var color_name = await this.colorHelper(dataToSend);
                        color_code = encodeColor(color_name.replace(/"/g, ''));
                        response = color_code + "Welcome Back, " + username + "!";
                    }
                    else{
                        response = "Stop hacking me.";
                    }
                }
                else {
                    response = "Invalid login format"
                }
                console.log(response);
                console.log(this.loggedIn);
            }   
            else{
                response = "Why are you logging in again?";
                
            }
            console.log(response);
        }

        // Logout command
        if (command.toLowerCase() == 'logout') {
            this.loggedIn = false;
            this.user = "";
            response = "\x1b[0;32mLogout complete.";
        }

        // Signup command
        if (command.toLowerCase() == 'signup') {
            if (!this.loggedIn) {
                if (tokens[1] && tokens[1].toLowerCase() == '-u' && tokens[3] && tokens[3].toLowerCase() == '-p' && tokens[5] && tokens[5].toLowerCase() == '-n' && tokens.length == 7) {
                    var user = tokens[2];
                    var pswd = tokens[4];
                    var fullName = tokens[6];
                    const dataToSend = {
                        key1: user,
                        key2: pswd,
                        key3: fullName
                      };
                    fetch('backend/signup.php', {
                        method: 'POST',
                        headers: {
                          'Content-Type': 'application/json'
                        },
                        body: JSON.stringify(dataToSend)
                      })
                        .then(response => response.json())
                        .then(data => {
                          // Handle the response from the PHP backend
                          console.log(data);
                        })
                        .catch(error => {
                          console.error('Error:', error);
                        });
                    //TODO: Push tuple to database
                    this.user = user;
                    response = "Welcome " + user + "!";
                    this.loggedIn = true;
                } else {
                    response = "Signup format incorrect: aborting signup.";
                }
            } else {
                response = "Already logged in!";
            }
        }

        // Search command
        if (command.toLowerCase() == 'search') {
            if (this.loggedIn) {
                var searchQuery = ""
                for (let i = 2; i < tokens.length; i++) {
                    searchQuery += tokens[i] + '+';
                }

                if (tokens[1] == '-song') {
                    return searchSpotify(searchQuery, 'track')
                        .then(searchResponse => {
                            response = searchResponse;
                            return response;
                        });
                }
                else if (tokens[1] == '-album') {
                    return searchSpotify(searchQuery, 'album')
                        .then(searchResponse => {
                            response = searchResponse;
                            return response;
                        });
                }
                else if (tokens[1] == '-artist') {
                    return searchSpotify(searchQuery, 'artist')
                        .then(searchResponse => {
                            response = searchResponse;
                            return response;
                        });
                }
                else {
                    response = "No valid search type specified, please try again";
                }
            }
            else {
                response = "You're not logged in! Log in first to search for songs, albums, or artists."
            }
        }

        // Like/Unlike songs command
        if (command.toLowerCase() == 'like' || command.toLowerCase() == 'unlike') {
            if (this.loggedIn) {
                if (tokens[1] && tokens[1].toLowerCase() == '-song') {
                    var username = this.user;
                    var songTitle = tokens.slice(2).join(' ').toLowerCase()
                    console.log(username);
                    console.log(songTitle);
                    const dataToSend = {
                        key1: username,
                        key2: songTitle,
                        key3: command
                      };
                    fetch('backend/like.php', {
                        method: 'POST',
                        headers: {
                          'Content-Type': 'application/json'
                        },
                        body: JSON.stringify(dataToSend)
                      })
                        .then(response => response.json())
                        .then(data => {
                          // Handle the response from the PHP backend
                          console.log(data);
                        })
                        .catch(error => {
                          console.error('Error:', error);
                        });
                    if (command.toLowerCase() == 'like') {
                        response = "Song added to liked songs!";
                    } else if (command.toLowerCase() == 'unlike') {
                        response = "Song removed from liked songs!";
                    }
                } else {
                    response = "Format incorrect. Use this format to like songs: like -song [song_title]";
                }
            } else {
                response = "You're not logged in! Log in first to like songs.";
            }
        }

        // follow / unfollow artist command
        if (command.toLowerCase() == 'follow' || command.toLowerCase() == 'unfollow') {
            if (this.loggedIn) {
                if (tokens[1] && tokens[1].toLowerCase() == '-artist') {
                    var username = this.user;
                    var artistName = tokens.slice(2).join(' ').toLowerCase();
                    console.log(username);
                    console.log(artistName);
                    const dataToSend = {
                        key1: username,
                        key2: artistName,
                        key3: command
                      };
                    fetch('backend/follow.php', {
                        method: 'POST',
                        headers: {
                          'Content-Type': 'application/json'
                        },
                        body: JSON.stringify(dataToSend)
                      })
                        .then(response => response.json())
                        .then(data => {
                          // Handle the response from the PHP backend
                          console.log(data);
                        })
                        .catch(error => {
                          console.error('Error:', error);
                        });
                    if (command.toLowerCase() == 'follow') {
                        response = "Now following " + artistName + "!";
                    } else if (command.toLowerCase() == 'unfollow') {
                        response = "Unfollowed " + artistName + "!";
                    }
                } else {
                    response = "Format incorrect. Use this format to follow artists: follow -artist [artist_name]";
                }
            } else {
                response = "You're not logged in! Log in first to follow artists.";
            }
        }

        // view library command
        if (command.toLowerCase() == 'library') {
            if (this.loggedIn) {
                var currUser = this.user;
                console.log(currUser);
                if (tokens[1].toLowerCase() == '-s' && tokens.length == 2) {
                    const dataToSend = {
                        key1: currUser
                    };
                    var array = await this.songLibHelper(dataToSend);
                    var output = "";
                    for (let x in array) {
                        output += array[x] + "\r\n";
                    }
                    response = output;
                } else if (tokens[1].toLowerCase() == '-al' && tokens.length == 2) {
                    const dataToSend = {
                        key1: currUser
                    };
                    var array = await this.albumLibHelper(dataToSend);
                    var output = "";
                    for (let x in array) {
                        output += array[x] + "\r\n";
                    }
                    response = output;
                } else if (tokens[1].toLowerCase() == '-ar' && tokens.length == 2) {
                    const dataToSend = {
                        key1: currUser
                    };
                    var array = await this.artistLibHelper(dataToSend);
                    var output = "";
                    for (let x in array) {
                        output += array[x] + "\r\n";
                    }
                    response = output;
                } else if (tokens[1].toLowerCase() == '-p' && tokens.length == 2) {
                    const dataToSend = {
                        key1: "username"
                    };
                    var array = await this.playlistDisplayHelper(dataToSend);
                    var output = "";
                    for (let x in array) {
                        output += array[x] + "\r\n";
                    }
                    response = output;
                } else {
                    response = "Please specify which library you would like to view: \r\n-s: view your liked songs\r\n-al: view your saved albums\r\n-ar: view artists you follow\r\n-p: view your playlists";
                }
            } else {
                response = 'Please login';
            }
        }



        // Save/Unsave songs command
        if (command.toLowerCase() == 'save' || command.toLowerCase() == 'unsave') {
            if (this.loggedIn) {
                if (tokens[1] && tokens[1].toLowerCase() == '-album') {
                    var username = this.user;
                    var albumTitle = tokens.slice(2).join(' ').toLowerCase()
                    console.log(username);
                    console.log(albumTitle);
                    const dataToSend = {
                        key1: username,
                        key2: albumTitle,
                        key3: command
                      };
                    fetch('backend/save.php', {
                        method: 'POST',
                        headers: {
                          'Content-Type': 'application/json'
                        },
                        body: JSON.stringify(dataToSend)
                      })
                        .then(response => response.json())
                        .then(data => {
                          // Handle the response from the PHP backend
                          console.log(data);
                        })
                        .catch(error => {
                          console.error('Error:', error);
                        });
                    if (command.toLowerCase() == 'save') {
                        response = "Album added to saved albums!";
                    } else if (command.toLowerCase() == 'unsave') {
                        response = "Album removed from saved albums!";
                    }
                } else {
                    response = "Format incorrect. Use this format to save albums: save -album [album_title]";
                }
            } else {
                response = "You're not logged in! Log in first to save albums."
            }
        }

        // Customize font color
        if (command.toLowerCase() == 'customize') {
            if(this.loggedIn) {
                var color = tokens[1].toLowerCase();
                
                const dataToSend = {
                    key1: this.user,
                    key2: color,
                    };

                fetch('backend/customize.php', {
                    method: 'POST',
                    headers: {
                        'Content-Type': 'application/json'
                    },
                    body: JSON.stringify(dataToSend)
                });

                var color_code = encodeColor(color.toLowerCase());
                response = color_code + "Font color changed\r\n"
            }
            else {
                response = "Not logged in! Log in first to customize font color"
            }
        }

        return Promise.resolve(response);
    }
}