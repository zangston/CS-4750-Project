// Create terminal, set window size
var xterm = new Terminal();
xterm.open(document.getElementById('terminal'));
xterm.resize(200, 40);
xterm.write('Hello from \x1B[1;3;31mxterm.js\x1B[0m $ ');

// Terminal responses to keyboard inputs
var currLine = "";
var entries = [];
xterm.onKey((ev) => {
    if (ev.domEvent.key == "Enter") {
        if (currLine) {
            entries.push(currLine);
            xterm.write("\r\n");
            //Send cmd to backend here!
        }
    } else if (ev.domEvent.key == "Backspace") {
        if (currLine) {
            currLine = currLine.slice(0, currLine.length - 1);
            xterm.write("\b \b");
        }
    } else {
        currLine += ev.key
        xterm.write(ev.key);
    }
});