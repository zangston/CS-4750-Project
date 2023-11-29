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
            response = "placeholder help response";
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
                //TODO replace this with actual signup code
                response = "signup request recieved";
                this.loggedIn = true;
            }
            else
                response = "already logged in!"
        }
        
        return response;
    }
}