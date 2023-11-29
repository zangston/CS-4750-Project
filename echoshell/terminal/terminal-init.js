
function terminalInit(xterm) {
    xterm.open(document.getElementById('terminal'));
    xterm.resize(200, 40);
    xterm.write("\x1B[0;32m");   // Note: colors dictated by ANSI scheme: https://bixense.com/clicolors/ 
    xterm.write("Welcome to Echoshell!\r\n");
    xterm.write("Please login with your credentials or enter \"Sign up\" to create an account\r\n");
    xterm.write("Login example: login -u \"username\" -p \"password\"\r\n\r\n");
}