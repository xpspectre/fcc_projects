// Pomodoro clock or stopwatch
// Implemented as 2 nested FSMs
// Note: can be off by half a sec
//
// Get start time
// Calculate end time
// Every second, get time, compare to end time, and output time remaining

var session_break = 'session';
var state = 'stopped';
var tEnd;
var tSessionDefault = 25*60*1000; // (ms, default 25 min) time remaining in any state
// var tSessionDefault = 3*1000; // testing
var tBreakDefault = 5*60*1000;
// var tBreakDefault = 3*1000; // testing
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
    switch (session_break) {
        case 'session':
            tRemain = tSessionDefault;
            break;
        case 'break':
            tRemain = tBreakDefault;
            break;
    }
    // tRemain = tSessionDefault;
    $("#time").text(ms2display(tRemain));

    $("#start").text('Start');
    $("#stop").text('Stop');
}

function finish() {
    state = 'finished';
    pauseTimer();
    $("#time").text('Time up!');

    switch (session_break) {
        case 'session':
            $("#start").text('Start break');
            break;
        case 'break':
            $("#start").text('Start session');
            break;
    }
    $("#stop").text('Reset'); // do session/break again
}

function switchSession() {
    switch (session_break) {
        case 'session':
            session_break = 'break';
            // tRemain = tBreakDefault;
            break;
        case 'break':
            session_break = 'session';
            // tRemain = tSessionDefault;
            break;
    }
    $("#session_break").text(session_break);
    reset();
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
    tRemain = tSessionDefault;
    $("#time").text(ms2display(tRemain));
    $("#session_break").text(session_break);

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
            case 'finished': // -> switch session
                switchSession();
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

    // Modifying the current session/break time takes effect after reset. Displays what it gets modified to, but doesn't
    //  affect current countdown.
    $("#sminus").on("click", function () {
        tSessionDefault -= 60*1000;
        if (tSessionDefault < 0) {
            tSessionDefault = 0;
        }
        if (session_break === 'session') {
            tRemain = tSessionDefault;
        }
        $("#time").text(ms2display(tSessionDefault));
    });

    $("#splus").on("click", function () {
        tSessionDefault += 60*1000;
        if (session_break === 'session') {
            tRemain = tSessionDefault;
        }
        $("#time").text(ms2display(tSessionDefault));
    });

    $("#bminus").on("click", function () {
        tBreakDefault -= 60*1000;
        if (tBreakDefault < 0) {
            tBreakDefault = 0;
        }
        if (session_break === 'break') {
            tRemain = tBreakDefault;
        }
        $("#time").text(ms2display(tBreakDefault));
    });

    $("#bplus").on("click", function () {
        tBreakDefault += 60*1000;
        if (session_break === 'break') {
            tRemain = tBreakDefault;
        }
        $("#time").text(ms2display(tBreakDefault));
    });
});
