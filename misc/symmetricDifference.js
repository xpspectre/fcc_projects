function uniqueArray(a) {
    return a.filter(function(val, ind, self) {
        return self.indexOf(val) === ind;
    })
}

function removeItems(a, r) {
    // Removes items in r from a. Aka difference.
    for (var i = 0; i < r.length; i++) {
        while (true) {
            var ind = a.indexOf(r[i]);
            if (ind !== -1) {
                a.splice(ind, 1);
            } else {
                break;
            }
        }
    }
    return a;
}

function sym(args) {
    // Keep elements that show up in an odd number of input args
    // https://en.wikipedia.org/wiki/Symmetric_difference
    var out = uniqueArray(arguments[0]);
    for (var i = 1; i < arguments.length; i++) { // go thru rest of the args
        var add = [];
        var remove = [];
        var entries = uniqueArray(arguments[i]);
        for (var j = 0; j < entries.length; j++) {
            var entry = entries[j];
            var ind = out.indexOf(entry);
            if (ind !== -1) {
                remove.push(entry);
            } else {
                add.push(entry);
            }
        }
        out = removeItems(out, remove);
        out = out.concat(add);
    }

    return out;
}

console.log(sym([1, 2, 3], [5, 2, 1, 4]));
console.log(sym([1, 1, 2, 5], [2, 2, 3, 5], [3, 4, 5, 5]));
// console.log(removeItems([1,2,2,3,3,4,5], [1,3,4]));