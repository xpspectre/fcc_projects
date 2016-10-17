// Tic-tac-toe game logic and AI
// See http://neverstopbuilding.com/minimax
// Build a command line version for debugging

// Board is a 3x3 array
// 1st player is x, 2nd is o
// If a player is about to lose, they pick the 1st choice starting from upper left

function copyArrArr(a) {
    // Copy array of arrays by value
    var b = [];
    for (var i = 0; i < a.length; i++)
        b[i] = a[i].slice();
    return b;
}

function maxInd(a) {
    // Get index of max of array
    return a.indexOf(Math.max.apply(Math, a));
}

function minInd(a) {
    // Get index of min of array
    return a.indexOf(Math.min.apply(Math, a));
}

function randBoard() {
    // Make random board
    var b = [[' ', ' ', ' '], [' ', ' ', ' '], [' ', ' ', ' ']];
    for (var i = 0; i < 3; i++) {
        for (var j = 0; j < 3; j++) {
            // b[i][j] = 'xo '.charAt(Math.floor(Math.random() * 3));
            b[i][j] = 'xo    '.charAt(Math.floor(Math.random() * 6));
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

function allSameFilled(a) {
    // Returns whether all elements in an array are the same 'x' or 'o'
    var a0 = a[0];
    if (a0 === ' ') {
        return false;
    }
    return a.every(function(e,i,a) {
        return e === a0;
    });
}

function allFilled(b) {
    // Returns whether the entire 3x3 board is filled
    for (var i = 0; i < 3; i++) {
        for (var j = 0; j < 3; j++) {
            if (b[i][j] === ' ') {
                return false;
            }
        }
    }
    return true;
}

function isWinner(b) {
    // Returns whether a board has a winning placement, returning 'x' or 'o' for winner, 'd' for whole board filled and
    //  draw, or ' ' blank for no winner and not finished
    // There are 8 ways to win: 3 rows, 3 cols, and 2 diags

    // Check rows and cols
    for (var i = 0; i < 3; i++) {
        var row = [];
        var col = [];
        for (var j = 0; j < 3; j++) {
            row.push(b[i][j]);
            col.push(b[j][i]);
        }
        if (allSameFilled(row) || allSameFilled(col)) {
            return row[i]; // shared by row and col
        }
    }

    // Check diags
    var d1 = [];
    var d2 = [];
    for (var i = 0; i < 3; i++) {
        d1.push(b[i][i]);
        d2.push(b[i][2-i]);
    }
    if (allSameFilled(d1) || allSameFilled(d2)) {
        return d1[1]; // shared by d1 and d2
    }

    // Fell thru, no winner
    // Check if incomplete or draw
    if (allFilled(b)) {
        return 'd';
    } else {
        return ' ';
    }
}

function getMoves(game) {
    // Given some state b, return an array of game states/next moves containing all of p's next moves
    var pos = possibleMoves(game.b);
    var moves = [];
    for (var i = 0; i < pos.length; i++) {
        var move = advanceGame(game);
        move.b[pos[i][0]][pos[i][1]] = game.p;
        moves.push(move);
    }
    return moves;
}

function getScore(b, depth) {
    // Returns score, where player winning is +10, player losing is -10, no winner is 0
    var winner = isWinner(b);
    switch (winner) {
        case player:
            return 10 - depth;
            break;
        case opponent:
            return depth - 10;
            break;
        default:
            return 0;
            break;
    }
}

function minimax(game, depth) {
    // Main AI algorithm
    // Return if game is over
    var winner = isWinner(game.b);
    if (winner !== ' ') {
        return getScore(game.b, depth);
    }

    // Calculate possible moves and minimax scores
    depth++;
    var choices = possibleMoves(game.b);
    var moves = getMoves(game);
    var scores = [];
    for (var i = 0; i < moves.length; i++) {
        scores.push(minimax(moves[i], depth));
    }

    // Do min/max calculation
    var ind;
    switch (game.p) {
        case player:
            ind = maxInd(scores);
            break;
        case opponent:
            ind = minInd(scores);
            break;
    }
    choice = choices[ind];
    return scores[ind];
}

function switchPlayer() {
    // Switch global player at end of turn
    switch (player) {
        case 'x':
            player = 'o';
            opponent = 'x';
            break;
        case 'o':
            player = 'x';
            opponent = 'o';
            break;
    }
}

function advanceGame(game) {
    // Make new game board at end of turn
    var b_ = copyArrArr(game.b);
    var p_;
    switch (game.p) {
        case 'x':
            p_ = 'o';
            break;
        case 'o':
            p_ = 'x';
            break;
    }
    return ({b: b_, p: p_ })
}

// Export functions for testing in node
if(typeof exports !== 'undefined') {
    exports.maxInd = maxInd;
    exports.minInd = minInd;
    exports.copyArrArr = copyArrArr;
    exports.printBoard = printBoard;
    exports.randBoard = randBoard;
    exports.possibleMoves = possibleMoves;
    exports.allSameFilled = allSameFilled;
    exports.allFilled = allFilled;
    exports.isWinner = isWinner;
    exports.getMoves = getMoves;
    exports.getScore = getScore;
    exports.minimax = minimax; // last turn integration testing is fast
    exports.switchPlayer = switchPlayer;
    exports.advanceGame = advanceGame;
}
