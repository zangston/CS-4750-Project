function customizeDialogue(color) {
    if (color == 'red')
        return '\x1b[1;31m';
    if (color == 'green')
        return '\x1b[0;32m';
    if (color == 'yellow')
        return '\x1b[0;33m';
    if (color == 'blue')
        return '\x1b[0;34m';
    if (color == 'pink')
        return '\x1b[1;35m';
    if (color == 'purple')
        return '\x1b[0;35m';
    if (color == 'cyan')
        return '\x1b[1;36m';
    if (color == 'teal')
        return '\x1b[0;36m';
    if (color == 'white')
        return '\x1b[1;37m';
    if (color == 'gray')
        return '\x1b[0;37m';
}