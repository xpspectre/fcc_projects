// There was something wrong with the fcc test function - did it now behave properly with the global vars of the `permute`
// function? The `permuteHeap` function, which is all local, worked fine. Same results.
var usedChars = [];
var perms = [];
function permute(x) {
    for (var i = 0; i < x.length; i++) {
        var ch = x.splice(i, 1)[0];
        usedChars.push(ch);
        if (x.length === 0) {
            perms.push(usedChars.slice());
        }
        permute(x);
        x.splice(i, 0, ch);
        usedChars.pop();
    }
    return perms;
}

function permuteHeap(x) {
    // In-place permute (still needs to save a copy of each permutation to a new array, though) with Heap's algorithm
    // https://en.wikipedia.org/wiki/Heap%27s_algorithm
    var n = x.length;
    var c = [];
    for (var i = 0; i < n; i++) {
        c.push(0);
    }

    var p = [x.slice(0)];
    var i = 1;
    while (i < n) {
        if (c[i] < i) {
            if (i % 2 === 0) {
                // swap(0, i);
                var temp = x[0];
                x[0] = x[i];
                x[i] = temp;
            } else {
                // swap(c[i], i)
                var temp = x[c[i]];
                x[c[i]] = x[i];
                x[i] = temp;
            }
            p.push(x.slice(0));
            c[i]++;
            i = 1;
        } else {
            c[i] = 0;
            i++;
        }
    }

    return p;
}

function permuteString(s) {
    var x = s.split('');
    var p = permuteHeap(x);
    for (var i = 0; i < p.length; i++) {
        p[i] = p[i].join('');
    }
    return p;
}

function hasSuccessive(s) {
    var c = s[0];
    for (var i = 1; i < s.length; i++) {
        if (s[i] === c) {
            return true;
        } else {
            c = s[i];
        }
    }
    return false;
}

function permAlone(str) {
    // Permutations that don't have repeated sequential letters
    var p = permuteString(str);
    p = p.filter(function (s) {
        return !hasSuccessive(s);
    });
    return p.length;
}

// console.log(permuteHeap([1,2,3,4]));
// console.log(hasSuccessive('aba'));
console.log(permAlone('abcdefa'));
permAlone('aaabb');