function ordinals(n) {
    var s;
    switch (n) {
        case 1:
            s = '1st';
            break;
        case 2:
            s = '2nd';
            break;
        case 3:
            s = '3rd';
            break;
        default:
            s = n + 'th';
    }
    return s;
}

function monthStr(n) {
    var s;
    switch (n) {
        case 1:
            s = 'January';
            break;
        case 2:
            s = 'February';
            break;
        case 3:
            s = 'March';
            break;
        case 4:
            s = 'April';
            break;
        case 5:
            s = 'May';
            break;
        case 6:
            s = 'June';
            break;
        case 7:
            s = 'July';
            break;
        case 8:
            s = 'August';
            break;
        case 9:
            s = 'September';
            break;
        case 10:
            s = 'October';
            break;
        case 11:
            s = 'November';
            break;
        case 12:
            s = 'December';
            break;
    }
    return s;
}

var _MS_PER_DAY = 1000 * 60 * 60 * 24;

// a and b are javascript Date objects
function dateDiffInDays(a, b) {
    // Discard the time and time-zone information.
    var utc1 = Date.UTC(a.getFullYear(), a.getMonth(), a.getDate());
    var utc2 = Date.UTC(b.getFullYear(), b.getMonth(), b.getDate());

    return Math.floor((utc2 - utc1) / _MS_PER_DAY);
}

function makeFriendlyDates(arr) {
    var start = arr[0];
    var end = arr[1];
    var startParts = start.split('-');
    var endParts = end.split('-');
    var startYear = parseInt(startParts[0]);
    var startMonth = parseInt(startParts[1]);
    var startDay = parseInt(startParts[2]);
    var endYear = parseInt(endParts[0]);
    var endMonth = parseInt(endParts[1]);
    var endDay = parseInt(endParts[2]);

    var diff = dateDiffInDays(new Date(startYear, startMonth, startDay), new Date(endYear, endMonth, endDay));

    // Make 1st date
    var outStart = monthStr(startMonth) + ' ' + ordinals(startDay);
    if (!(startYear === 2016 && diff < 365)) {
        outStart += ', ' + startYear;
    }

    if (diff === 0) { // degenerate date range
        return [outStart];
    }

    // Make last date
    var outEnd = '';
    if (endYear === startYear && endMonth === startMonth) { // current month
        outEnd += ordinals(endDay);
    } else { // or after the current month
        outEnd += monthStr(endMonth) + ' ' + ordinals(endDay);
    }
    if (diff >= 365) { // more than a year after
        outEnd += ', ' + endYear;
    }
    return [outStart, outEnd];
}

// console.log(makeFriendlyDates(['2016-07-01', '2016-08-04']));
// console.log(makeFriendlyDates(["2016-07-01", "2016-07-04"]));
// console.log(makeFriendlyDates(["2016-12-01", "2018-02-03"]));
// console.log(makeFriendlyDates(["2018-01-13", "2018-01-13"]));
console.log(makeFriendlyDates(["2022-09-05", "2023-09-05"]));
