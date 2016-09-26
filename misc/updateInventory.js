
function updateInventory(arr1, arr2) {
    // All inventory must be accounted for or you're fired!
    // Get existing item names for convenient indexing
    var arr1Names = [];
    for (var i = 0; i < arr1.length; i++) {
        arr1Names.push(arr1[i][1]);
    }

    // Add items
    for (var j = 0; j < arr2.length; j++) {
        var newQty = arr2[j][0];
        var newName = arr2[j][1];
        var ind = arr1Names.indexOf(newName);
        if (ind !== -1) { // already have some
            arr1[ind][0] += newQty;
        } else { // new item
            arr1.push([newQty, newName]);
        }
    }

    // Sort by item name
    arr1.sort(function (a, b) {
        if (a[1] < b[1]) {
            return -1;
        } else {
            return 1;
        }
    });

    return arr1;
}

// Example inventory lists
var curInv = [
    [21, "Bowling Ball"],
    [2, "Dirty Sock"],
    [1, "Hair Pin"],
    [5, "Microphone"]
];

var newInv = [
    [2, "Hair Pin"],
    [3, "Half-Eaten Apple"],
    [67, "Bowling Ball"],
    [7, "Toothpaste"]
];

console.log(updateInventory(curInv, newInv));
