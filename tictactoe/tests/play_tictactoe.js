var ttt = require('../js/tictactoe');
var printBoard = ttt.printBoard;

function play(game) {
    while (true) {
        var winner = ttt.isWinner(game.b);
        switch (winner) {
            case 'x':
            case 'o':
                console.log('Player ' + winner + ' won with:');
                console.log(printBoard(game.b));
                return;
            case 'd':
                console.log('It was a draw with:');
                console.log(printBoard(game.b));
                return;
        }
        // not done yet, keep going

        ttt.minimax(game, 0);

        console.log('Player ' + player + ' should choose ' + choice);
        game.b[choice[0]][choice[1]] = player;
        console.log(printBoard(game.b));

        ttt.switchPlayer(game);
        game = ttt.advanceGame(game);
    }

}

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

console.log(printBoard(game.b));
play(game);
