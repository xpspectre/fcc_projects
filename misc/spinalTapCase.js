
function spinalCase(str) {
    // "It's such a fine line between stupid, and clever."
    // --David St. Hubbins
    head = str[0].toLowerCase();
    tail = str.substr(1).replace(/[\s]/g, '-');
    tail = tail.replace(/_/g, '-');
    tail = tail.replace(/[A-Z]/g, function(s){return '-' + s.toLowerCase();});
    tail = tail.replace(/--/g, '-');
    return head + tail;
}

spinalCase('This Is Spinal Tap');
