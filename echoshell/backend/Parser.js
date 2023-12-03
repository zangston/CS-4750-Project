class Parser {
    loggedIn = false;

    constructor() {
        this.loggedIn = false;
        this.user = null;
    }

    parseInput(input) {
        var tokens = input.split(' ');
        var response = tokens[0] + " is not recognized as a command";

        if (tokens[0].toLowerCase() == 'help') {
            response = "\nhelp\r\nlogin\r\nsignup\r\nlogout";
        }

        if (tokens[0].toLowerCase() == 'login') {
            if (!this.loggedIn) {
                //TODO replace this with actual login code
                response = "login request received";
                this.loggedIn = true;
            } else {
                response = "already logged in!";
            }
        }

        if (tokens[0].toLowerCase() == 'logout') {
            this.loggedIn = false;
            this.user = null;
            response = "logout complete.";
        }

        if (tokens[0].toLowerCase() == 'signup') {
            if (!this.loggedIn) {
                if (tokens[1] && tokens[1].toLowerCase() == '-u' && tokens[3] && tokens[3].toLowerCase() == '-p' && tokens.length == 5) {
                    var user = tokens[2];
                    var pswd = tokens[4];
                    //TODO: Push tuple to database
                    response = "signup successful!";
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
                response = 'please login'
            } else {
                var libQuery = ""
                for (let i = 2; i < tokens.length; i++) {
                    libQuery += tokens[i] + '+';
                }
                
                if (tokens[1] == '-songs') { // liked songs
                    response = viewLibrary(libQuery, 'track');
                }
                else if (tokens[1] == '-artists') { // liked artist
                    response = viewLibrary(libQuery, 'artists');
                }
                else if (tokens[1] == '-albums') { // saved albums
                    response = viewLibrary(libQuery, 'albums');
                }
                else if (tokens[1] == '-playlists') {
                    response = viewLibrary(libQuery, 'playlist');
                }
                else {
                    response = "Please specify which library you would like to view: \r\n-songs: view your liked songs\r\n-albums: view your saved albums\r\n-artists: view artists you follow\r\n-playlists: view your playlists";
                }
            }
        }

        return response;
    }
}