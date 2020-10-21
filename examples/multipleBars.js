const { RConsole} = require('../index');

const memoryUsage = RConsole.addBar({
  size: 2,
  template: (memory) => [
    `<magenta>=====================</magenta>`,
    `<magenta>Memory: <red>${(memory / 1024 / 1024).toFixed(2)} Mb</red></magenta>`
  ]
})

const progressBar = RConsole.addBar({
  size: 3, // 3 lines height
  template: ({progress}) => [
    `<cyan>=====================</cyan>`,
    `<cyan>Progress: <yellow>${progress.toFixed(2)}%</yellow></cyan>`,
    `<cyan>=====================</cyan>`
  ]
});

let progress = 0;
progressBar.update({progress});
RConsole.print('We can print some message');
RConsole.print('But bottomBar will be displayed always at the bottom');


let memoryHandle = setInterval(() => {
  memoryUsage.update(process.memoryUsage().heapUsed) // Displays current heap usage
}, 500);


// Emulates progress
let handle = setInterval(() => {
  progress += Math.random() * 20;
  if (progress >= 100) {
    progress = 100;
    clearInterval(handle);
    clearInterval(memoryHandle)
  }
  progressBar.update({progress}) // update bottomBar value. All previously printed messages will stay on screen
}, 500);


