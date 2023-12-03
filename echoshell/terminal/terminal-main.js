// Initialize parser
const p = new Parser();

// Initialize terminal
var xterm = new Terminal();
terminalInit(xterm);
xterm.write("Echoshell $ ");

// Terminal responses to keyboard inputs
var currLine = "";
var entries = [];
var historyIndex = 0;
var maxHistoryIndex;

xterm.onKey(async (ev) => {
    // Enter: create new line
    if (ev.domEvent.key === "Enter") {  
        if (currLine) {
            entries.push(currLine);
            historyIndex = entries.length; // Move history index to the end
            xterm.write("\r\n");

        // Send cmd to backend parser
        const response = await p.parseInput(currLine);

        currLine = "";
        xterm.write(response + "\r\nEchoshell $ ");
        }
    }
    // Backspace: move cursor backward, erase character
    else if (ev.domEvent.key === "Backspace") {
        if (currLine) {
        currLine = currLine.slice(0, currLine.length - 1);
        xterm.write("\b \b");
        }
    }
    // Arrow Up: retrieve previous command from history
    else if (ev.domEvent.key === "ArrowUp") {
        if (historyIndex > 0) {
        historyIndex--;
        eraseLine();
        currLine = entries[historyIndex];
        xterm.write('Echoshell $ ' + currLine);
        }
    }
    // Arrow Down: retrieve next command from history
    else if (ev.domEvent.key === "ArrowDown") {
        if (historyIndex < entries.length - 1) {
        historyIndex++;
        eraseLine();
        currLine = entries[historyIndex];
        xterm.write('Echoshell $ ' + currLine);
        } else {
        // If at the end of history, clear the line
        eraseLine();
        currLine = "";
        xterm.write('Echoshell $ ' + currLine);
        }
    }
    // Ignore left and right arrow inputs
    else if (ev.domEvent.key === "ArrowLeft" || ev.domEvent.key === "ArrowRight") {            
    }
    else if (ev.domEvent.ctrlKey && ev.domEvent.key === 'c') {
        xterm.write("C^\r\n")
        xterm.write("Echoshell $ ");
        currLine = "";
    }
    // Normal input: write character to terminal line
    else {
        currLine += ev.key;
        xterm.write(ev.key);
    }
    });

function eraseLine() {
  xterm.write("\r\x1b[K");
}
