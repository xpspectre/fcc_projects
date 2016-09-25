
function uniteUnique(arr) {
    var all = [];
    for (var i = 0; i < arguments.length; i++) {
        // Inefficient but works for the small test dataset
        var x = arguments[i];
        for (var j = 0; j < x.length; j++) {
            var ind = all.indexOf(x[j]);
            if (ind == -1) {
                all.push(x[j]);
            }
        }
    }
    return all;
}

uniteUnique([1, 3, 2], [5, 2, 1, 4], [2, 1]);
