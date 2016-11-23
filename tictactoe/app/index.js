// Game running code

player = '';
opponent = '';
mainGame = '';

function showBoard() {
    $("#xoselect").hide();
    $("#game-board").show();
    $('#status').text('You selected ' + player);
}

function writeNumber(x) {
    $('#status').text(x);
}

function initGame(){
    var b0 = [[' ', ' ', ' '], [' ', ' ', ' '], [' ', ' ', ' ']]; // empty starting board
    var game = {
        b: b0,
        p: player
    };
    showBoard();
    mainGame = game;
}

function playGame() {

}

$(document).ready(function () {
    $("#game-board").hide();

    $("#select-x").on("click", function () {
        player = 'x';
        opponent = 'o';
        initGame()
    });
    $("#select-o").on("click", function () {
        player = 'o';
        opponent = 'x';
        initGame()
    });

    $("#b0").on("click", function () {
        playGame(0);
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
});
