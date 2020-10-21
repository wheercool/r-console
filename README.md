# r-console
`RConsole` is a library that helps to display realtime information in the console. 
It adds a concept of `Bar` - group of lines sticked to the bottom of the console.
`Bars` makes possible to display general information all the time despite other printed messages.
Each bar can be updated asynchronous and independently.
All these features makes possible to create console-based dashboards easily.

## Console layout
All messages will be printed above bottom bars.
There are 2 bottom bars. They will always be displayed  at the bottom of the console.
```
$ Some text goes here


====================
Sticky bottom bar 1
====================
Sticky bottom bar 2
====================
```
## Install
```
$ npm install r-console
```
Features:
* Colored messages
* Sticky bottom bars

## Colored messages
Wrapping message with color tag will change the color of the text inside this tag.

To run it locally:
```
$ npm run example1
```
```js
const { RConsole } = require('r-console');

RConsole.print('Simple message');
RConsole.print('<red>Colored message</red>');
RConsole.print('<magenta>Colors <red>can be nested</red>, cool!</magenta>')

```
### Available colors: 
 * `red`
 * `green`
 * `yellow`
 * `blue`
 * `magenta`
 * `cyan`
 * `white`
 * `black`

## Sticky bottom bars
It is possible to add multiple bottom bars. All printed messages (RConsole.print) will appear above
added bars. It is handy to display monitoring information in that way. 

## Progress bar example
To run it locally:
```
$ npm run example2
```
```js
const { RConsole } = require('r-console');

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
```

## Multiple independent bars
It is possible to add more than one bar and update them independently.

To run it locally:
```
$ npm run example3
```
```js
const { RConsole} = require('r-console');

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
```
## API
## RConsole.print(coloredMessage)
Displays message in the console
### coloredMessage 
Type: `string`

String to print. May contain color tags:
  * `<red>`
  * `<green>`
  * `<yellow>`
  * `<blue>`
  * `<magenta>`
  * `<cyan>`
  * `<white>`
  * `<black>`
  
All text inside tags will be colored.

## RConsole.addBar(config)
ReturnType: `Bar`

Adds a sticky bottom bar at the bottom of console. Bar will not be displayed automatically.
To display bar see `Bar.update()` method.

### config
#### size
Type: `number`

Number of lines that bar takes.

#### template
Type: `function`

ReturnType: `coloredString[]`

Function that will be invoked when `Bar:update()` is called. All parameters of `update` method will be
passed to `template`. The result must be an array of `size` strings.

## Bar.update(...values)
Displays/Updates the bar with new `values`. 

### values
Type: `...any`

Values that will be passed to `template` callback.
