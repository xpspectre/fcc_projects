
function orbitalPeriod(arr) {
    var GM = 398600.4418;
    var earthRadius = 6367.4447;
    var out = [];
    for (var i = 0; i < arr.length; i++) {
        out.push({'name': arr[i].name, 'orbitalPeriod': Math.round(2*Math.PI*Math.sqrt(Math.pow(earthRadius+arr[i].avgAlt, 3)/GM))});
    }
    return out;
}

console.log(orbitalPeriod([{name : "sputnik", avgAlt : 35873.5553}]));
