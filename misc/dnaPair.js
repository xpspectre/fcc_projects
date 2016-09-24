
function pairElement(str) {
    var pairs = [];
    for (var i = 0; i < str.length; i++) {
        var base = str[i];
        var pair;
        switch (base) {
            case 'A':
                pair = ['A', 'T'];
                break;
            case 'T':
                pair = ['T', 'A'];
                break;
            case 'C':
                pair = ['C', 'G'];
                break;
            case 'G':
                pair = ['G', 'C'];
                break;
        }
        pairs.push(pair);
    }

    return pairs;
}

pairElement("GCG");
