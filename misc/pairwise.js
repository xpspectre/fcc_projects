function minArray(a) {
    return a.reduce(function(p, c, ind, arr){return Math.min(p, c);});
}


function pairwise(arr, arg) {
    // Make augmented arr with indices
    var arr2 = [];
    for (var i = 0; i < arr.length; i++) {
        arr2.push([arr[i], i]);
    }

    // Get pairs and indices
    var pairs = [];
    while (arr2.length > 1) {
        var x1 = arr2[0][0];
        for (var i = 1; i < arr2.length; i++) {
            var x2 = arr2[i][0];
            if (x1 + x2 === arg) {
                // Make sure pairs gets the values in sorted order
                if (x1 < x2) {
                    pairs.push([arr2[0], arr2[i]]);
                } else {
                    pairs.push([arr2[i], arr2[0]]);
                }
                arr2.splice(i, 1);
                break;
            }
        }
        arr2.splice(0, 1);

    }

    // Get min index pair if there are multiple pairs with the same values
    var keptPairs = pairs[0];
    for (var i = 1; i < pairs.length; i++) {
        for (var j = 0; j < keptPairs.length; j++) {
            if (pairs[i][0][0] === keptPairs[j][0][0] && pairs[i][1][0] === keptPairs[j][1][0] && pairs[i][0][1] + pairs[i][1][1] < keptPairs[j][0][1] + keptPairs[j][1][1]) {
                keptPairs.splice(j, 1, pairs[i]);
                break;
            }
        }
    }

    // Sum indices
    var sums = [];
    for (var i = 0; i < pairs.length; i++) {
        sums.push(pairs[i][0][1] + pairs[i][1][1]);
    }
    return sums.reduce(function(p, c, ind, arr){return p + c;}, 0);
}

// console.log(minArray([2,4,5,8,2]));
// console.log(pairwise([1, 3, 2, 4], 4));
console.log(pairwise([1, 4, 2, 3, 0, 5], 7));
// console.log(pairwise([1, 1, 1], 2));
// console.log(pairwise([0, 0, 0, 0, 1, 1], 1));
