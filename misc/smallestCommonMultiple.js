var primes;

function zip(arrays) {
    return arrays[0].map(function(_,i){
        return arrays.map(function(array){return array[i]})
    });
}

function getPrimes(n) {
    // Get next prime numbers up to n
    var primes = [2];
    var p = 3;
    while (p <= n) {
        var rootp = Math.floor(Math.sqrt(p));
        var isp = true;
        for (var i = 0; primes[i] <= rootp; i++) {
            if (p % primes[i] === 0) {
                isp = false;
                break;
            }
        }
        if (isp) {
            primes.push(p);
        }
        p += 2;
    }
    return primes
}

function getFactor(n) {
    // Get 1st prime factor of n + remainder in an array w/ 2 elements
    for (var i = 0; i < primes.length; i++) {
        if (n % primes[i] === 0) {
            return [primes[i], n / primes[i]];
        }
    }
    return [-1, n]; // fell thru, n is prime
}

function getFactors(n) {
    // Get array of prime factors of n
    var factors = [];
    while (true) {
        var f = getFactor(n);
        if (f[0] === -1) { // prime, done
            factors.push(n);
            break;
        } else {
            factors.push(f[0]);
            n = f[1];
        }
    }
    return factors;
}

function countFactors(f) {
    // Make an array of [factor, power] pairs from array of factors f. Drop 1's.
    var factors = [];
    var counts = [];
    for (var i = 0; i < f.length; i++) {
        if (f[i] === 1) {
            continue;
        }
        var ind = factors.indexOf(f[i]);
        if (ind === -1) { // new factor
            factors.push(f[i]);
            counts.push(1);
        } else { // increase count of existing factor
            counts[ind] += 1;
        }
    }
    return zip([factors, counts]);
}

function smallestCommons(arr) {
    var start = Math.min(arr[0], arr[1]);
    var end = Math.max(arr[0], arr[1]);

    // Accumulate max factor counts
    var factors = [];
    var counts = [];
    for (var i = start; i <= end; i++) {
        var f = countFactors(getFactors(i));
        for (var j = 0; j < f.length; j++) {
            var ind = factors.indexOf(f[j][0]);
            if (ind === -1) { // new factor
                factors.push(f[j][0]);
                counts.push(f[j][1]);
            } else { // update count if this factorization has a higher power
                if (f[j][1] > counts[ind]) {
                    counts[ind] = f[j][1];
                }
            }
        }
    }

    // Multiple combined prime factorization
    var prod = 1;
    for (var i = 0; i < factors.length; i++) {
        prod *= Math.pow(factors[i], counts[i]);
    }
    return prod;
}

primes = getPrimes(100); // max prime factor allowed
// console.log(countFactors(getFactors(100)));
console.log(smallestCommons([23,18]));

smallestCommons([6,10]);
