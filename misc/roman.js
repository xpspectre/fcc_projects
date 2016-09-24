function convertToRoman(num) {
    // Assume integers from 1 to 3999
    // The switches below can be made less redundant by making mapping of the chars for each place
    var str = num.toString();
    var n = str.length;
    var out = [];
    var c1; // x1 for this place
    var c2; // x5
    var c3; // x10
    for (var i = 0; i < n; i++) {
        var x = parseInt(str[i]);
        var place = n - i;
        console.log(x + ' at pos ' + i);

        if (place == 4) { // thousands place
            out.push('M'.repeat(x));
            continue;
        } else if (place == 3) { // hundreds place
            c1 = 'C';
            c2 = 'D';
            c3 = 'M';
        } else if (place == 2) { // tens place
            c1 = 'X';
            c2 = 'L';
            c3 = 'C';
        } else if (place == 1) { // ones place
            c1 = 'I';
            c2 = 'V';
            c3 = 'X';
        }

        switch (x) {
            case 0:
                break; // nothing
            case 1:
            case 2:
            case 3:
                out.push(c1.repeat(x));
                break;
            case 4:
                out.push(c1 + c2);
                break;
            case 5:
                out.push(c2);
                break;
            case 6:
            case 7:
            case 8:
                out.push(c2 + c1.repeat(x-5));
                break;
            case 9:
                out.push(c1 + c3);
                break;
        }
    }

    console.log(out);

    return out.join('');
}

convertToRoman(1742);
