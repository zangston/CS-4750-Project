function parseInput(input) {
    tokens = input.split(' ');
    var response = tokens[0] + " is not recognized as a command";

    if(tokens[0].toLowerCase() == 'login')
    {   
        //TODO replace this with actual login code
        response = "login request recieved";
    }

    if(tokens[0].toLowerCase() == 'signup')
    {   
        //TODO replace this with actual signup code
        response = "signup request recieved";
    }

    return response;
}