var assert = require('chai').assert;
var ttt = require('../js/tictactoe');

// Required global vars
// Make call setup to set these before tests that need them
player = 'x';
opponent = 'o';
choice = [];

function testBoard(b) {
    // Whether b is a valid tic-tac-toe board
    // Returns 0 if valid, else
    //  1 for invalid shape
    //  2 for invalid entry

    // Test shape
    if (b.length !== 3) {
        return 1;
    }
    for (var i = 0; i < 3; i++) {
        if (b[i].length !== 3) {
            return 1;
        }
    }

    // Test contents. Must be 'x', 'o', or blank ' '
    for (var i = 0; i < 3; i++) {
        for (var j = 0; j < 3; j++) {
            var x = b[i][j];
            if (!x.match(/^[xo ]$/)) {
                return 2;
            }
        }
    }

    // Fell through, valid
    return 0;
}

suite('Util', function() {
    suite('maxInd()', function() {
        test('should return index of max value', function () {
            assert.equal(1, ttt.maxInd([1,3,2]))
        });
    });

    suite('minInd()', function() {
        test('should return index of min value', function () {
            assert.equal(0, ttt.minInd([1,3,2]))
        });
    });

    suite('copyArrArr()', function() {
        test('should return separate copy of array of arrays', function () {
            var x = [[1,2],[3,4]];
            var y = ttt.copyArrArr(x);

            // References are different
            assert.notEqual(x, y);

            // Contents are the same
            for (var i = 0; i < x.length; i++) {
                for (var j = 0; j < x[i].length; j++) {
                    assert.equal(x[i][j], y[i][j]);
                }
            }

        });
    });

    suite('printBoard()', function() {
        test('should return a string', function () {
            var b = [['x', 'x', 'x'], ['x', 'x', 'x'], [' ', 'x', 'x']];
            assert.isString(ttt.printBoard(b));
        });
    });

    suite('randBoard()', function() {
        test('should return a valid board', function () {
            assert.equal(testBoard(ttt.randBoard()), 0);
        });
    });

    suite('possibleMoves()', function() {
        test('should return the 1 possible move', function () {
            var b = [['x', 'x', 'x'], ['x', 'x', 'x'], [' ', 'x', 'x']];
            var moves = ttt.possibleMoves(b);
            assert.isArray(moves);
            assert.equal(moves.length, 1);
            assert.deepEqual(moves, [[2,0]]); // list of lists
        });

        test('should return the 2 possible moves', function () {
            var b = [['x', 'x', 'x'], ['x', ' ', 'x'], [' ', 'x', 'x']];
            var moves = ttt.possibleMoves(b);
            assert.isArray(moves);
            assert.equal(moves.length, 2);
            assert.deepEqual(moves.sort(), [[1,1], [2,0]].sort()); // don't care about the order
        });

        test('should return the 0 possible moves', function () {
            var b = [['x', 'x', 'x'], ['x', 'x', 'x'], ['x', 'x', 'x']];
            var moves = ttt.possibleMoves(b);
            assert.isArray(moves);
            assert.equal(moves.length, 0);
        });
    });

    suite('allSameFilled()', function() {
        // This function has a dumb bug the 1st time I wrote it
        test("should return true for ['x','x','x']", function () {
            assert.isTrue(ttt.allSameFilled(['x','x','x']));
        });

        test("should return true for ['o','o','o']", function () {
            assert.isTrue(ttt.allSameFilled(['o','o','o']));
        });

        test("should return false for ['x','x',' ']", function () {
            assert.isFalse(ttt.allSameFilled(['x','x',' ']));
        });

        test("should return false for [' ','x','x']", function () {
            assert.isFalse(ttt.allSameFilled([' ','x','x']));
        });

        test("should return false for [' ',' ',' ']", function () {
            assert.isFalse(ttt.allSameFilled([' ',' ',' ']));
        });

    });

    suite('allFilled()', function() {
        test('should return true for a fully filled board of x', function () {
            var b = [['x', 'x', 'x'], ['x', 'x', 'x'], ['x', 'x', 'x']];
            assert.isTrue(ttt.allFilled(b));
        });

        test('should return true for a fully filled board of o', function () {
            var b = [['o', 'o', 'o'], ['o', 'o', 'o'], ['o', 'o', 'o']];
            assert.isTrue(ttt.allFilled(b));
        });

        test('should return true for a fully filled board of mixed x and o', function () {
            var b = [['o', 'x', 'o'], ['x', 'o', 'x'], ['o', 'x', 'o']];
            assert.isTrue(ttt.allFilled(b));
        });

        test('should return false for a board with blanks', function () {
            var b = [[' ', 'x', 'x'], ['x', 'x', 'x'], ['x', 'x', 'x']];
            assert.isFalse(ttt.allFilled(b));
        });
    });

    suite('isWinner()', function() {
        test('should return blank for a blank board', function () {
            var b = [[' ', ' ', ' '], [' ', ' ', ' '], [' ', ' ', ' ']];
            assert.equal(ttt.isWinner(b), ' ');
        });

        test('should return blank for no winner', function () {
            var b = [['x', ' ', 'x'], ['o', 'o', ' '], [' ', ' ', 'x']];
            assert.equal(ttt.isWinner(b), ' ');
        });

        test('should return x for x winning a row', function () {
            var b =[['x', 'x', 'x'], [' ', ' ', ' '], [' ', ' ', ' ']];
            assert.equal(ttt.isWinner(b), 'x');
        });

        test('should return x for x winning a col', function () {
            var b =[[' ', 'x', ' '], [' ', 'x', ' '], [' ', 'x', ' ']];
            assert.equal(ttt.isWinner(b), 'x');
        });

        test('should return x for x winning a diag', function () {
            var b =[['x', ' ', ' '], [' ', 'x', ' '], [' ', ' ', 'x']];
            assert.equal(ttt.isWinner(b), 'x');
        });

        test('should return o for o winning a row', function () {
            var b =[[' ', ' ', ' '], ['o', 'o', 'o'], [' ', ' ', ' ']];
            assert.equal(ttt.isWinner(b), 'o');
        });

        test('should return d for a draw on a filled board', function () {
            var b = [['x', 'o', 'x'], ['x', 'o', 'o'], ['o', 'x', 'x']];
            assert.equal(ttt.isWinner(b), 'd');
        });
    });

    suite('getMoves()', function() {
        test("should return o's last valid move", function () {
            // Make current game state
            var b = [['x', 'o', 'x'], ['x', 'o', 'o'], ['o', 'x', ' ']];
            var game = {
                b: b,
                p: 'x'
            };

            // Check out possible next game states. Current player moves; next player's turn.
            var moves = ttt.getMoves(game);
            assert.isArray(moves);
            assert.equal(moves.length, 1);
            assert.equal(moves[0].p, 'o');
            assert.deepEqual(moves[0].b, [['x', 'o', 'x'], ['x', 'o', 'o'], ['o', 'x', 'x']]);
        });

        test("should return x's last valid move", function () {
            // Make current game state
            var b = [['x', 'o', 'x'], ['x', 'o', 'o'], ['o', 'x', ' ']];
            var game = {
                b: b,
                p: 'o'
            };

            // Check out possible next game states. Current player moves; next player's turn.
            var moves = ttt.getMoves(game);
            assert.isArray(moves);
            assert.equal(moves.length, 1);
            assert.equal(moves[0].p, 'x');
            assert.deepEqual(moves[0].b, [['x', 'o', 'x'], ['x', 'o', 'o'], ['o', 'x', 'o']]);
        });

        test("should return o's last 2 valid moves", function () {
            // Make current game state
            var b = [['x', 'o', 'x'], ['x', 'o', 'o'], ['o', ' ', ' ']];
            var game = {
                b: b,
                p: 'x'
            };

            // Check out possible next game states. Current player moves; next player's turn.
            var moves = ttt.getMoves(game);
            assert.isArray(moves);
            assert.equal(moves.length, 2);
            assert.equal(moves[0].p, 'o');
            assert.equal(moves[1].p, 'o');

            var bExpect = [[['x', 'o', 'x'], ['x', 'o', 'o'], ['o', 'x', ' ']],[['x', 'o', 'x'], ['x', 'o', 'o'], ['o', ' ', 'x']]].sort();
            var bActual = [moves[0].b, moves[1].b].sort();
            assert.deepEqual(bActual, bExpect);
        });
    });

    suite('getScore()', function() {
        // Player is x
        setup(function() {
            player = 'x';
            opponent = 'o';
        });

        test('should return +10 for player win, depth 0', function () {
            var depth = 0;
            var b = [['x', 'x', 'x'], [' ', ' ', ' '], [' ', ' ', ' ']];
            assert.equal(ttt.getScore(b, depth), 10);
        });

        test('should return -10 for player loss, depth 0', function () {
            var depth = 0;
            var b = [['o', 'o', 'o'], [' ', ' ', ' '], [' ', ' ', ' ']];
            assert.equal(ttt.getScore(b, depth), -10);
        });

        test('should return 0 for incomplete', function () {
            var depth = 0;
            var b = [[' ', ' ', ' '], [' ', ' ', ' '], [' ', ' ', ' ']];
            assert.equal(ttt.getScore(b, depth), 0);
        });

        test('should return 0 for tie', function () {
            var depth = 0;
            var b = [['x', 'o', 'x'], ['x', 'o', 'o'], ['o', 'x', 'x']];
            assert.equal(ttt.getScore(b, depth), 0);
        });

        test('should return +8 for player win, depth 2', function () {
            var depth = 2;
            var b = [['x', 'x', 'x'], [' ', ' ', ' '], [' ', ' ', ' ']];
            assert.equal(ttt.getScore(b, depth), 8);
        });
    });

    suite('minimax()', function() {
        setup(function() {
            player = 'x';
            opponent = 'o';
            choice = [];
        });

        test('should return return score +10 for x won', function () {
            var b = [['x', 'x', 'x'], ['o', 'o', ' '], [' ', ' ', ' ']];
            var game = {
                b: b,
                p: 'x'
            };
            var depth = 0;
            assert.equal(ttt.minimax(game, depth), 10);
        });

        test('should return return score +9 for x one move away from winning', function () {
            var b = [['x', 'x', ' '], ['o', 'o', ' '], [' ', ' ', ' ']];
            var game = {
                b: b,
                p: 'x'
            };
            var depth = 0;
            assert.equal(ttt.minimax(game, depth), 9);
        });
    });

    suite('switchPlayer()', function() {
        test('should swap player x and opponent o', function () {
            player = 'x';
            opponent = 'o';
            ttt.switchPlayer();
            assert.equal(player, 'o');
            assert.equal(opponent, 'x');
        });

        test('should swap player o and opponent x', function () {
            player = 'o';
            opponent = 'x';
            ttt.switchPlayer();
            assert.equal(player, 'x');
            assert.equal(opponent, 'o');
        });
    });

    suite('advanceGame()', function() {
        test('should make a copy of the board and change player from x', function () {
            var b = [['x', 'x', ' '], ['o', 'o', ' '], [' ', ' ', ' ']];
            var game = {
                b: b,
                p: 'x'
            };
            var game2 = ttt.advanceGame(game);
            assert.notEqual(game.b, game2.b);
            assert.deepEqual(game.b, game2.b);
            assert.equal(game2.p, 'o');
        });

        test('should make a copy of the board and change player from o', function () {
            var b = [['x', ' ', ' '], ['o', 'o', ' '], ['x', ' ', ' ']];
            var game = {
                b: b,
                p: 'o'
            };
            var game2 = ttt.advanceGame(game);
            assert.notEqual(game.b, game2.b);
            assert.deepEqual(game.b, game2.b);
            assert.equal(game2.p, 'x');
        });
    });
});