class Parser {

    loggedIn = false;

    constructor()
    {
        var loggedIn = false;
    }

    parseInput(input) {

        var tokens = input.split(' ');
        var response = tokens[0] + " is not recognized as a command";

        if(tokens[0].toLowerCase() == 'help')
        {
            response = "\nhelp\r\nlogin\r\nsignup\r\n";
        }

        if(tokens[0].toLowerCase() == 'login')
        {   
            if (this.loggedIn == false)
            {
                //TODO replace this with actual login code
                response = "login request recieved";
                this.loggedIn = true;
            }
            else
                response = "already logged in!"
        }

        if(tokens[0].toLowerCase() == 'signup')
        {   
            if (this.loggedIn == false)
            {
                if(tokens[1].toLowerCase() == '-u' && tokens[3].toLowerCase() == '-p' && tokens.length() == 5){
                    var user = tokens[2];
                    var pswd = tokens[4];
                    //TODO: Push tuple to database
                    response = "signup successful!";
                    this.loggedIn = true;
                }
                else {
                    response = "signup format incorrect: aborting signup.";
                }
            }
            else
                response = "already logged in!"
        }
        
        return response;
    }
}