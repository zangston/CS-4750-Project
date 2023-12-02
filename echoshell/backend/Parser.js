class Parser {
    loggedIn = false;

    constructor() {
        this.loggedIn = false;
    }

    parseInput(input) {
        var tokens = input.split(' ');
        var response = "Command not recognized";

        switch(tokens[0].toLowerCase()) {
            case 'help':
                response = "\r\nhelp\r\nlogin\r\nsignup\r\nlogout\n";
                break;
            case 'login':
                if (!this.loggedIn) {
                    // TODO replace this with actual login code
                    response = "login request received";
                    this.loggedIn = true;
                } else {
                    response = "already logged in!";
                }
                break;
            case 'logout':
                this.loggedIn = false;
                response = "logout complete.";
                break;
            case 'signup':
                if (!this.loggedIn) {
                    if(tokens[1] && tokens[1].toLowerCase() == '-u' && tokens[3] && tokens[3].toLowerCase() == '-p' && tokens.length == 5) {
                        var user = tokens[2];
                        var pswd = tokens[4];
                        // TODO: Push tuple to database
                        response = "signup successful!";
                        this.loggedIn = true;
                    } else {
                        response = "signup format incorrect: aborting signup.";
                    }
                } else {
                    response = "already logged in!";
                }
                break;
        }

        return response;
    }
}