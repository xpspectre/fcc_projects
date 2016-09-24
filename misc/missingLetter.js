
function fearNotLetter(str) {
    // Get number representation
    var missing; // stays undefined if no letter missing
    var expectedCode = str.charCodeAt(0);
    for (var i = 0; i < str.length; i++) {
        if (expectedCode != str.charCodeAt(i)) {
            missing = String.fromCharCode(expectedCode);
            return missing
        }
        expectedCode++;
    }
    // fell thru, all chars present
    return missing;
}

fearNotLetter("abcdefghjklmno");
