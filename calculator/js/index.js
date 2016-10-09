// "Dumb" calculator evaluates ops as they're entered, not respecting the order of operations of the entire expression
// before pressing Enter
// TODO: Insert parentheses into input-hist when entering an op that breaks normal order of precedence when reading input-hist

var lastVal = 0;
var lastFun;
var lastPress;
function writeNumber(n) {
    // n must be a string
    var inputStr = $('#input').val();
    var inputHistStr = $('#input-hist').val();
    if (inputStr === '0' || inputStr ==='+' || inputStr ==='-' || inputStr ==='*' || inputStr ==='/') {
        $('#input').val(n);
    } else {
        $('#input').val(inputStr + n);

    }
    $('#input-hist').val(inputHistStr + n);
    lastPress = 'num';
}

function applyOp(op) {
    // op must be a string
    // Parses the number in #input
    // Uses 1st class functions to get around needing eval!
    if (lastPress === 'op') { // do nothing if op button is pressed 2x (or more) in a row
        return;
    }
    lastPress = 'op';

    var inputStr = $('#input').val();
    var inputHistStr = $('#input-hist').val();
    var x = parseFloat(inputStr);
    lastVal = x;
    switch (op) {
        case '+':
            lastFun = function (y) {
                return x + y;
            };
            break;
        case '-':
            lastFun = function (y) {
                return x - y;
            };
            break;
        case '*':
            lastFun = function (y) {
                return x * y;
            };
            break;
        case '/':
            lastFun = function (y) {
                return x / y;
            };
            break;
    }

    $('#input').val(op);
    $('#input-hist').val(inputHistStr + op);
}

function evalInput() {
    if (lastPress === 'op') { // do nothing if op button was pressed last; eval requires a number last
        return;
    }
    var inputStr = $('#input').val();
    var x = parseFloat(inputStr);
    var newVal = lastFun(x);
    lastFun = function (y) { // reassign lastFun to dummy fun that does nothing in case '=' is pressed multiple times
        return y;
    };
    $('#input').val(newVal.toString());
    // lastPress is implicitly a number here
}

// I think this is how AC vs CE works...
function allClear() {
    $('#input').val('0');
    $('#input-hist').val('');
    lastPress = 'op';
}

function clearEntry() {
    $('#input').val('0');
    //TODO: revert input-hist to last op, or make writeNumber store vals and only add to input-hist on op
    lastPress = 'op';
}


$(document).ready(function () {
    allClear();

    $("#b0").on("click", function () {
        writeNumber('0');
    });
    $("#b1").on("click", function () {
        writeNumber('1');
    });
    $("#b2").on("click", function () {
        writeNumber('2');
    });
    $("#b3").on("click", function () {
        writeNumber('3');
    });
    $("#b4").on("click", function () {
        writeNumber('4');
    });
    $("#b5").on("click", function () {
        writeNumber('5');
    });
    $("#b6").on("click", function () {
        writeNumber('6');
    });
    $("#b7").on("click", function () {
        writeNumber('7');
    });
    $("#b8").on("click", function () {
        writeNumber('8');
    });
    $("#b9").on("click", function () {
        writeNumber('9');
    });
    $("#bdot").on("click", function () {
        writeNumber('.');
    });

    $("#bplus").on("click", function () {
        applyOp('+');
    });
    $("#bminus").on("click", function () {
        applyOp('-');
    });
    $("#bmult").on("click", function () {
        applyOp('*');
    });
    $("#bdiv").on("click", function () {
        applyOp('/');
    });

    $("#beq").on("click", function () {
        evalInput();
    });

    $("#bac").on("click", function () {
        allClear();
    });
    $("#bce").on("click", function () {
        clearEntry();
    });
    
});
