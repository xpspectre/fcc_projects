
function dropElements(arr, func) {
    // Drop them elements.
    var arrmap = arr.map(func);
    var first = arrmap.indexOf(true);
    if (first === -1) { // handle special case of no element in arr satisfy func
        return [];
    }
    return arr.slice(first);
}

console.log(dropElements([1, 2, 3, 4], function(n) {return n > 5; }));
