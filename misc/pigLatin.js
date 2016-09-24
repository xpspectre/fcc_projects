function isVowel(s) {
    return (s == 'a' || s == 'e' || s == 'i' || s == 'o' || s == 'i');
}

function translatePigLatin(str) {
    var out = [];
    if (isVowel(str[0])) { // starts w/ vowel
        out = str + 'way';
    } else { // starts with consonant
        out = str.substring(1) + str[0];
        for (var i = 0; i < out.length; i++) { // keep moving consonants back until you get a vowel
            if (!isVowel(out[0])) {
                out = out.substring(1) + out[0];
            } else {
                break;
            }
        }
        out += 'ay';
    }
    return out;
}

translatePigLatin("consonant");
