var ttt = require('../js/tictactoe');

var b0 = [[' ', ' ', ' '], [' ', ' ', ' '], [' ', ' ', ' ']]; // empty starting board
var b1 = ttt.randBoard(); // random testing board
var b2 = [['o', ' ', 'x'], ['x', ' ', ' '], ['x', 'o', 'o']];
var b3 = [[' ', ' ', ' '], ['x', 'x', 'x'], [' ', 'x', 'o']];
var b4 = [['x', ' ', ' '], ['x', 'o', 'o'], ['x', 'o', 'o']];
var b5 = [['x', ' ', ' '], [' ', ' ', ' '], [' ', ' ', ' ']];
var b6 = [[' ', 'x', ' '], [' ', ' ', 'x'], ['o', 'o', 'x']];

bx = b0;

// Play test game
var game = {
    b: bx,
    p: 'x'
};

// Global vars
// Fine in an app of this size. Alt, you could wrap the whole game inside an object, and it would effectively be the same
player = 'x';
opponent = 'o';
// player = 'o';
// opponent = 'x';
choice = []; // coordinates of best move

console.log(ttt.printBoard(game.b));
ttt.play(game);
