function testProperties(query, source) {
    var skeys = Object.keys(source);
    for (var j = 0; j < skeys.length; j++) {
        if (!query.hasOwnProperty(skeys[j]) || query[skeys[j]] != source[skeys[j]]) {
            return false;
        }
    }
    // fell through, all properties accounted for
    return true;
}


function whatIsInAName(collection, source) {
    // What's in a name?
    var arr = [];
    // Only change code below this line
    // must match all key-val pairs in source
    for (var i = 0; i < collection.length; i++) {
        if (testProperties(collection[i], source)) {
            arr.push(collection[i]);
        }
    }
    console.log(arr);
    // Only change code above this line
    return arr;
}

// whatIsInAName([{ first: "Romeo", last: "Montague" }, { first: "Mercutio", last: null }, { first: "Tybalt", last: "Capulet" }], { last: "Capulet" });
whatIsInAName([{"a": 1, "b": 2}, {"a": 1}, {"a": 1, "b": 2, "c": 2}], {"a": 1, "b": 2});