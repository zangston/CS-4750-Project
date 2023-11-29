// Create terminal, set window size
var xterm = new Terminal();
xterm.open(document.getElementById('terminal'));
xterm.resize(200, 40);
xterm.write("\x1B[0;32m")   // Note: colors dictated by ANSI scheme: https://bixense.com/clicolors/ 
xterm.write("placeholder output - welcome to echoshell \r\nEchoshell $ ")

// Terminal responses to keyboard inputs
var currLine = "";
var entries = [];
xterm.onKey((ev) => {
    // Enter: create new line
    if (ev.domEvent.key == "Enter") {
        if (currLine) {
            entries.push(currLine);
            xterm.write("\r\nEchoshell $ ");
            //Send cmd to backend here!
        }
    } 
    // Backspace: move cursor backward, erase character
    else if (ev.domEvent.key == "Backspace") {
        if (currLine) {
            currLine = currLine.slice(0, currLine.length - 1);
            xterm.write("\b \b");
        }
    } 
    // Normal input: write character to terminal line
    else {
        currLine += ev.key
        xterm.write(ev.key);
    }
});