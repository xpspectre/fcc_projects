var assert = require('chai').assert;
var ttt = require('../js/tictactoe');

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

});