class Parser {
    loggedIn = false;

    constructor() {
        this.loggedIn = false;
        this.user = null;
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
        var response = tokens[0] + " is not recognized as a command";

        if (tokens[0].toLowerCase() == 'help') {
            response = "\nhelp\r\nlogin\r\nsignup\r\nlogout";
        }

        if (tokens[0].toLowerCase() == 'login') {
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

        if (tokens[0].toLowerCase() == 'logout') {
            this.loggedIn = false;
            this.user = null;
            response = "logout complete.";
        }

        if (tokens[0].toLowerCase() == 'signup') {
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


        if (tokens[0].toLowerCase() == 'library') {
            if (!this.loggedIn) {
                response = 'please login';
            } else {
                if (tokens[1] != "-s" || tokens[1] != "-ar" || tokens[1] != "-al" || tokens[1] != "-p" ) {
                    response = "Please specify which library you would like to view: \r\n-s: view your liked songs\r\n-al: view your saved albums\r\n-ar: view artists you follow\r\n-p: view your playlists";
                }
                // if (tokens[1] == '-songs') { // liked songs
                //     return viewLibrary('track', this.user)
                // }
                // else if (tokens[1] == '-artists') { // liked artist
                //     return viewLibrary('artists', this.user);
                // }
                // else if (tokens[1] == '-albums') { // saved albums
                //     return viewLibrary('albums', this.user);
                // }
                // else if (tokens[1] == '-playlists') {
                //     return viewLibrary('playlist', this.user);
                // }
                else {
                    var libType = tokens[1];
                    var username = this.user
                    const dataToSend = {
                        key1: libType,
                        key2: username
                    };
                    fetch('backend/get-library.php', {
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
                }
            }
        }

        return Promise.resolve(response);
    
    }
}