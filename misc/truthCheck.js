
function truthCheck(collection, pre) {
    // Is everyone being true?
    for (var i = 0; i < collection.length; i++) {
        if (!collection[i].hasOwnProperty(pre) || !collection[i][pre]) { // missing field or value of field is falsy
            return false;
        }
    }
    // fell through
    return true;
}

console.log(truthCheck([{"user": "Tinky-Winky", "sex": "male"}, {"user": "Dipsy", "sex": "male"}, {"user": "Laa-Laa", "sex": "female"}, {"user": "Po", "sex": "female"}], "sex"));
console.log(truthCheck([{"user": "Tinky-Winky", "sex": "male"}, {"user": "Dipsy"}, {"user": "Laa-Laa", "sex": "female"}, {"user": "Po", "sex": "female"}], "sex"));