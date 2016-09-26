
function telephoneCheck(str) {
    // Good luck!
    var regexNoParens = /^1?[\s]*\d\d\d[\s-]*\d\d\d[\s-]*\d\d\d\d$/g;
    var regexParens = /^1?[\s]*\(\d\d\d\)[\s]*\d\d\d[\s-]*\d\d\d\d$/g;
    return regexNoParens.test(str) || regexParens.test(str);
}

console.log(telephoneCheck("555-555-5555"));
