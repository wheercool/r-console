const EventEmitter = require('events');
const { color } = require('./utils');

class RBar extends EventEmitter {
  value = '';

  constructor({size, template}) {
    super({captureRejections: true});
    this.size = size || 1;
    this.value = new Array(this.size).fill('').join('\n');
    this.template = template;
  }

  update(value) {
    const originValues = this.template(value)
    const values = originValues.map(s => color(s))
    this.value = values.join('\n');
    this.emit('changed', {target: this});
  }
}

module.exports = {
  RBar
}
