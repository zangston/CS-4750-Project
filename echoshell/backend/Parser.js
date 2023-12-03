class Parser {
    loggedIn = false;

    constructor() {
        this.loggedIn = false;
    }

    async helper(dataToSend,username){
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

    async parseInput(input) {
        var tokens = input.split(' ');
        var command = tokens[0]
        var response = command + " is not recognized as a command";

        if (command.toLowerCase() == 'help') {
            response = "\nhelp\r\nlogin\r\nsignup\r\nlogout";
        }

        if (command.toLowerCase() == 'login') {
            if (!this.loggedIn) {
                //TODO replace this with actual login code
                if (tokens[1] && tokens[2] && tokens.length == 3){
                    var username = tokens[1];
                    var password = tokens[2];
                    const dataToSend = {
                        key1: username,
                        key2: password,
                      };
                      console.log("D");
                    
                    console.log(response);
                    console.log(this.loggedIn);
                    await this.helper(dataToSend,username);
                    if (this.loggedIn){
                        response = "Welcome Back, " + username + "!";
                    }
                    else{
                        response = "Stop hacking me.";
                    }
                }
                else {
                    response = "invalid login format"
                }
                console.log(response);
                console.log(this.loggedIn);
            }   
            else{
                response = "Why are you logging in again?";
                
            }
            console.log(response);
        }

        if (command.toLowerCase() == 'logout') {
            this.loggedIn = false;
            response = "logout complete.";
        }

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
                    response = "signup format incorrect: aborting signup.";
                }
            } else {
                response = "already logged in!";
            }
        }

        if (command.toLowerCase() == 'search') {
//            if (this.loggedIn) {
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
//            } else {
//                response = "you're not logged in! log in first to search for songs, albums, or artists."
//            }
        }
      
        return Promise.resolve(response);
    }
}
