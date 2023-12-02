class Parser {
    loggedIn = false;

    constructor() {
        this.loggedIn = false;
    }

    parseInput(input) {
        var tokens = input.split(' ');
        var command = tokens[0]
        var response = command + " is not recognized as a command";

        if (command.toLowerCase() == 'help') {
            response = "\nhelp\r\nlogin\r\nsignup\r\nlogout";
        }

        if (command.toLowerCase() == 'login') {
            if (!this.loggedIn) {
                //TODO replace this with actual login code
                response = "login request received";
                this.loggedIn = true;
            } else {
                response = "already logged in!";
            }
        }

        if (command.toLowerCase() == 'logout') {
            this.loggedIn = false;
            response = "logout complete.";
        }

        if (command.toLowerCase() == 'signup') {
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

        return response;
    }
}