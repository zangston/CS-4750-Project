// Initialize parser
const p = new Parser();

// Initialize terminal
var xterm = new Terminal();
terminalInit(xterm);
xterm.write("Echoshell $ ");

// Terminal responses to keyboard inputs
var currLine = "";
var entries = [];
xterm.onKey((ev) => {
    // Enter: create new line
    if (ev.domEvent.key == "Enter") {
        if (currLine) {
            entries.push(currLine);
            xterm.write("\r\n");

            //Send cmd to backend parser
            response = p.parseInput(currLine);
            
            currLine = "";
            xterm.write(response + "\r\nEchoshell $ ");
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