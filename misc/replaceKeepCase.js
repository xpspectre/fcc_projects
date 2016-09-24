
function myReplace(str, before, after) {
    //Handle case
    if (before[0] == before[0].toUpperCase()) {
        after = after[0].toUpperCase() + after.substring(1);
    } else if (before[0] == before[0].toLowerCase()) {
        after = after[0].toLowerCase() + after.substring(1);
    }
    return str.replace(before, after);
}

myReplace("A quick brown fox Jumped over the lazy dog", "Jumped", "leaped");
