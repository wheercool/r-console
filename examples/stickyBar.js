const { RConsole } = require('../index');

const bottomBar = RConsole.addBar({
 size: 3, // 3 lines height
 template: ({progress}) => [
   `<cyan>=====================</cyan>`,
   `<cyan>Progress: <yellow>${progress.toFixed(2)}%</yellow></cyan>`,
   `<cyan>=====================</cyan>`
 ]
});

let progress = 0;
bottomBar.update({ progress });
RConsole.print('We can print some message');
RConsole.print('But bottomBar will be displayed always at the bottom');

// Emulates progress
let handle = setInterval(() => {
    progress += Math.random() * 20;
    if (progress >= 100) {
      progress = 100;
      clearInterval(handle);
    }
    bottomBar.update({progress}) // update bottomBar value. All previously printed messages will stay on screen.
}, 500);
