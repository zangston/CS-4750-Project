
function terminalInit(xterm) {
    xterm.open(document.getElementById('terminal'));
    xterm.resize(200, 40);
    xterm.write("\x1B[0;32m")   // Note: colors dictated by ANSI scheme: https://bixense.com/clicolors/ 
    xterm.write("placeholder output - welcome to echoshell \r\nEchoshell $ ")
}