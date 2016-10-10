// Tic-tac-toe game logic and AI
// Build a command line version for debugging

// Board is a 3x3 array
// 1st player is x, 2nd is o

var b = [[' ', ' ', ' '], [' ', ' ', ' '], [' ', ' ', ' ']];

function randBoard() {
    // Make random board
    var b = [[' ', ' ', ' '], [' ', ' ', ' '], [' ', ' ', ' ']];
    for (var i = 0; i < 3; i++) {
        for (var j = 0; j < 3; j++) {
            b[i][j] = 'xo '.charAt(Math.floor(Math.random() * 3));
        }
    }
    return b;
}

function printBoard(b) {
    // Returns the board in graphical form for the console.
    // Dividing lines don't help readability/spacing
    var s = '';
    for (var i = 0; i < 3; i++) {
        s += b[i][0] + ' ' + b[i][1] + ' ' + b[i][2] + '\n';
    }
    return s;
}

function possibleMoves(b) {
    var moves = [];
    // List possible moves as an array of i,j positions; aka gets blank spaces
    for (var i = 0; i < 3; i++) {
        for (var j = 0; j < 3; j++) {
            if (b[i][j] === ' ') {
                moves.push([i,j]);
            }
        }
    }
    return moves;
}

function allSame(a) {
    // Returns whether all elements in an array are the same
    var a0 = a[0];
    return a.every(function(e,i,a) {
        return e === a0;
    });
}

function isWinner(b) {
    // Returns whether a board has a winning placement, returning 'x' or 'o' for winner, or ' ' for no winner.
    // There are 8 ways to win: 3 rows, 3 cols, and 2 diags

    // Check rows and cols
    for (var i = 0; i < 3; i++) {
        var row = [];
        var col = [];
        for (var j = 0; j < 3; j++) {
            row.push(b[i][j]);
            col.push(b[j][i]);
        }
        if (allSame(row) || allSame(col)) {
            return row[i];
        }
    }

    // Check diags
    var d1 = [];
    var d2 = [];
    for (var i = 0; i < 3; i++) {
        d1.push(b[i][i]);
        d2.push(b[i][2-i]);
    }
    if (allSame(d1) || allSame(d2)) {
        return d1[1];
    }

    // Fell thru, no winner
    return ' ';
}

function score(b) {
    // Returns score
}

var b1 = randBoard();
console.log(printBoard(b1));
console.log(possibleMoves(b1));
console.log(isWinner(b1));
1