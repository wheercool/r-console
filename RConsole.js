const {color} = require('./utils');
const {RBar} = require('./RBar');

class RConsole {

  constructor() {
    this.bars = [];
    if (process.stdout.isTTY) {
      this.hideCursor();
      process.on('exit', () => {
        this.showCursor();
      })
    }
  }

  addBar(config) {
    const bar = new RBar(config)
    if (process.stdout.isTTY) {
      bar.on('changed', (event) => {
        this.hideBars();
        this.showBars();
      })
      this.hideBars();
      this.bars.push(bar);
      this.showBars();
    }
    return bar
  };

  print(message) {
    this.hideBars();
    this.write(color(message) + '\n');
    this.showBars();
  }

  write(t) {
    process.stdout.write(t);
  }

  moveUp(size) {
    this.write(`\x1b[${size}A`)
  }

  moveToLineStart() {
    this.write('\r')
  }

  clearToEol() {
    this.write(`\x1b[K`)
  }

  hideCursor() {
    this.write('\x9b\x3F\x32\x35\x6C');
  }

  showCursor() {
    this.write('\x9B\x3F\x32\x35\x68')
  }

  hideBars() {
    if (this.bars.length) {
      this.hideBar(this.bars[0]);
    }
    for (let bar of this.bars.slice(1)) {
      this.moveUp(1);
      this.hideBar(bar)
    }
  }

  hideBar(bar) {
    let size = bar.size;
    this.moveToLineStart()
    this.clearToEol();
    while (--size > 0) {
      this.moveUp(1);
      this.clearToEol();
    }
  }

  showBars() {
    const outputs = [];
    for (let bar of this.bars) {
      outputs.push(bar.value);
    }
    this.write(outputs.join('\n'));
  }
}


module.exports = {
  RConsole
}
