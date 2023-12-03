
function terminalInit(xterm) {
    xterm.open(document.getElementById('terminal'));
    xterm.resize(200, 40);
    xterm.write("\x1B[0;32m");   // Note: colors dictated by ANSI scheme: https://bixense.com/clicolors/ 
    xterm.write("Welcome to Echoshell!\r\n\r\n");
    xterm.write("Login with your credentials or signup to create an account.\r\n");
    xterm.write("Signup example: signup -u username -p password -n name\r\n");
    xterm.write("Login example: login -u username -p password\r\n\r\n");
}