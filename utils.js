function color(s) {
  const reset = '\x1b[0m';
  const stack = [];
  const close = () => {
    stack.pop();
    if (stack.length) {
      return stack[stack.length - 1];
    } else {
      return reset;
    }
  }
  const open = (code) => {
    stack.push(code);
    return code;
  }
  const process = (code) => {
    if (code.startsWith('</')) {
      return close();
    }
    switch (code) {
      case '<red>':
        return open('\x1b[31m');
      case '<green>':
        return open('\x1b[32m');
      case '<yellow>':
        return open('\x1b[33m');
      case '<blue>':
        return open('\x1b[34m');
      case '<magenta>':
        return open('\x1b[35m');
      case '<cyan>':
        return open('\x1b[36m');
      case '<white>':
        return open('\x1b[37m');
      case '<black>':
        return open('\x1b[30m');
      default:
        return code;
    }
  }

  return s.replace(/<(\/?(red|green|blue|yellow|magenta|cyan|white|black))>/g, process);
  // BgRed = "\x1b[41m"
  // BgGreen = "\x1b[42m"
  // BgYellow = "\x1b[43m"
  // BgBlue = "\x1b[44m"
  // BgMagenta = "\x1b[45m"
  // BgCyan = "\x1b[46m"
  // BgWhite = "\x1b[47m"
}
module.exports = {
 color
}
