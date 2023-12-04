class Parser {
    loggedIn = false;

    constructor() {
        this.loggedIn = false;
        this.user = null;
    }

    async helper(dataToSend,username){
        this.user = username
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

    async parseInput(input, xterm) {
        var tokens = input.split(' ');
        var command = tokens[0]
        var response = command + " is not recognized as a command";

        // Help command
        if (command.toLowerCase() == 'help') {
            response = await readFile("assets/help.txt") + "\r\n";
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
                    await this.helper(dataToSend,username);
                    if (this.loggedIn){
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
                response = "You're not logged in! Log in first to like songs."
            }
        }

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
