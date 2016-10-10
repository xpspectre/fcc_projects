// Pomodoro clock or stopwatch
// Implemented as a FSM
// Note: can be off by half a sec
//
// Get start time
// Calculate end time
// Every second, get time, compare to end time, and output time remaining

var state = 'stopped';
var tEnd;
var tRemainDefault = 25*60*1000; // (ms, default 25 min) time remaining in any state
// var tSessionDefault = 3*1000; // testing
var tRemain = tRemainDefault;
var timer;

function pad(n, width, z) {
    z = z || '0';
    n = n + '';
    return n.length >= width ? n : new Array(width - n.length + 1).join(z) + n;
}

function ms2display(ms) {
    // Format time for display, as mm:ss, rounded to nearest s
    var s = Math.round(ms/1000);
    var mm = Math.floor(s/60);
    var ss = s % 60;
    return pad(mm.toString(), 2) + ':' + pad(ss.toString(), 2);
}

function start() {
    state = 'running';
    var d = new Date();
    tEnd = d.getTime() + tRemain;
    timer = runTimer();

    $("#stop").text('Pause');
}

function pause() {
    state = 'paused';
    pauseTimer();

    $("#start").text('Resume');
    $("#stop").text('Reset');
}

function reset() {
    state = 'stopped';
    tRemain = tRemainDefault;
    $("#time").text(ms2display(tRemain));

    $("#start").text('Start');
    $("#stop").text('Stop');
}

function finish() {
    state = 'finished';
    pauseTimer();
    $("#time").text('Time up!');

    $("#stop").text('Reset');
}

function runTimer() {
    return setInterval(function() {
        var d = new Date();
        tRemain = tEnd - d.getTime();
        if (tRemain < 0) {
            finish();
        } else {
            $("#time").text(ms2display(tRemain));
        }

    }, 1000);
}

function pauseTimer() {
    clearInterval(timer);
}

$(document).ready(function () {
    $("#time").text(ms2display(tRemain));

    $("#start").on("click", function () {
        switch(state) {
            case 'stopped': // -> running
                start();
                break;
            case 'running':
                // pass
                break;
            case 'paused': // -> running
                start();
                break;
            case 'finished':
                // pass
                break;
        }
    });

    $("#stop").on("click", function () {
        switch(state) {
            case 'stopped':
                // pass
                break;
            case 'running': // -> paused
                pause();
                break;
            case 'paused': // -> stopped
                reset();
                break;
            case 'finished':
                reset();
                break;
        }
    });
});
