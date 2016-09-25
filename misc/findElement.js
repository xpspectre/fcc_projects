// Why is this one so much easier than the last one?
function findElement(arr, func) {
    var newarr = arr.filter(func);
    return newarr[0];
}

findElement([1, 2, 3, 4], function(num){ return num % 2 === 0; });
