
function steamrollArray(arr) {
    // I'm a steamroller, baby
    var newarr = [];
    for (var i = 0; i < arr.length; i++) {
        if (Array.isArray(arr[i])) {
            newarr = newarr.concat(steamrollArray(arr[i]));
        } else {
            newarr.push(arr[i]);
        }
    }
    return newarr;
}

console.log(steamrollArray([1,[2],3]));
console.log(steamrollArray([1, [2], [3, [[4]]]]));
