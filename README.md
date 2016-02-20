# Fibonacci game

The page contains a grid of 50 x 50 cells and every time you click a cell the cell value will be +1.
By default a cell has value 0 and value 0 is hidden.

If a fibonacci sequence is found in a row it will light up green and will be resetted to zero/empty.

## Demo

A demo can be found on http://marsbergen.github.io/fibonacci-game

## Development

If you want to develop the app, run the command below and it will watch your files and build them to the .tmp directory.
Then you can open up your browser and point to the index.html file in the .tmp locally. You don't need a server for this simple app.

`npm run watch`

## Unit tests

To run the tests once run:

`npm run tests`

To watch the files during development and continuously run tests run:

`npm run watch-tests`

## Build

To build the project in a single run to the .tmp directory run the command below.
Then you can open up your browser and point to the index.html file in the .tmp locally. You don't need a server for this simple app.

`npm run build`
