function isPrime(n) {
    var m = Math.floor(Math.sqrt(n));
    for (var i = 2; i <= m; i++) {
        if (n%i === 0) {
            return false;
        }
    }
    return true;
}


function sumPrimes(num) {
    var sum = 0;
    for (var i = 2; i <= num; i++) {
        if (isPrime(i)) {
            sum += i;
        }
    }
    return sum;
}

sumPrimes(10);
