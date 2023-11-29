var term = new Terminal();
term.open(document.getElementById('terminal'));
term.resize(200, 40);
term.write('Hello from \x1B[1;3;31mxterm.js\x1B[0m $ ');
term.onKey(e => {
    console.log(e.key);
    term.write(e.key);
    if (e.key == '\r')
        term.write('\n');
})