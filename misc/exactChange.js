function round2(x) {
    // Round to cents. This is sort of needed because adding/subtracting a bunch of floats can lose precision, hopefully not enough to
    // actually lose a cent here
    return Math.round(x * 100)/100;
}

function totalCid(cid) {
    var total = 0;
    for (var i = 0; i < cid.length; i++) {
        total += cid[i][1];
    }
    return round2(total);
}

function denominationAmount(s) {
    // Return denomination amount from string
    var x;
    switch (s) {
        case 'ONE HUNDRED':
            x = 100;
            break;
        case 'TWENTY':
            x = 20;
            break;
        case 'TEN':
            x = 10;
            break;
        case 'FIVE':
            x = 5;
            break;
        case 'ONE':
            x = 1;
            break;
        case 'QUARTER':
            x = 0.25;
            break;
        case 'DIME':
            x = 0.1;
            break;
        case 'NICKEL':
            x = 0.05;
            break;
        case 'PENNY':
            x = 0.01;
            break;
    }
    return x;
}

function makeChange(amount, cid) {
    // Make change from cid, returning list of bills. highest to lowest denomination
    // If you can't return exact change (only have large bills), return insufficient funds as well
    var change = [];

    // Go from largest bill to smallest, greedy algorithm for accumulating change
    for (var i = cid.length-1; i >= 0; i--) {
        var x = denominationAmount(cid[i][0]);
        var nbills = 0;
        while (amount >= x && cid[i][1] > 0) {
            nbills++;
            amount = round2(amount - x);
            cid[i][1] = round2(cid[i][1] - x);
        }
        if (nbills > 0) {
            change.push([cid[i][0], nbills*x]);
        }
    }
    if (amount > 0) { // Can't make exact change after going thru all bills
        return 'Insufficient Funds';
    }
    return change;
}

function checkCashRegister(price, cash, cid) {
    var change = cash - price; // assumes customer gave enough cash...
    var total = totalCid(cid);
    if (change > total) {
        return 'Insufficient Funds';
    } else if (change === total) {
        return 'Closed';
    } else {
        return makeChange(change, cid);
    }
}

// Example cash-in-drawer array:
// [["PENNY", 1.01],
// ["NICKEL", 2.05],
// ["DIME", 3.10],
// ["QUARTER", 4.25],
// ["ONE", 90.00],
// ["FIVE", 55.00],
// ["TEN", 20.00],
// ["TWENTY", 60.00],
// ["ONE HUNDRED", 100.00]]

var cid = [["PENNY", 1.01], ["NICKEL", 2.05], ["DIME", 3.10], ["QUARTER", 4.25], ["ONE", 90.00], ["FIVE", 55.00], ["TEN", 20.00], ["TWENTY", 60.00], ["ONE HUNDRED", 100.00]];
// console.log(totalCid(cid));

console.log(checkCashRegister(19.50, 20.00, cid));
console.log(checkCashRegister(3.26, 100.00, cid));