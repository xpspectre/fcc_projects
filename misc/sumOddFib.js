
function sumFibs(n) {
    var a = 1;
    var b = 1;
    var sum = 1; // include 1st val
    while (b <= n) {
        var temp = b;
        b = b + a;
        a = temp;
        console.log(a); // a (the laggin value) stays under n
        if (a%2 !== 0) {
            sum += a;
        }
    }

    return sum;
}

sumFibs(75025);
