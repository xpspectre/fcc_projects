function addTogether() {
    var args  = Array.prototype.slice.call(arguments);
    for (var i = 0; i < args.length; i++) {
        if (typeof  args[i] !== 'number') {
            return undefined;
        }
    }
    if (args.length === 2) {
        return args[0] + args[1];
    } else { // assume there's 1 arg
        return function (x) {
            if (typeof x !== 'number') {
                return undefined;
            }
            return x + args[0];
        };
    }
}

console.log(addTogether(2,3));
console.log(addTogether(2)(3));
console.log(addTogether(2, "3"));
console.log(addTogether(2)([3]));