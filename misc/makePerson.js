// https://developer.mozilla.org/en-US/Add-ons/SDK/Guides/Contributor_s_Guide/Private_Properties
// Use a closure around local vars to keep them private
// Alt, rely on convention like underscore prefix to indicate private (but not enforced)
var Person = function(firstAndLast) {
    var parts = firstAndLast.split(' ');
    var _first = parts[0];
    var _last= parts[1];
    this.getFirstName = function() {
        return _first;
    };
    this.getLastName = function() {
        return _last;
    };
    this.getFullName = function() {
        return _first + ' ' + _last;
    };
    this.setFirstName = function(first) {
        _first = first;
    };
    this.setLastName = function(last) {
        _last = last;
    };
    this.setFullName = function(firstAndLast) {
        parts = firstAndLast.split(' ');
        _first = parts[0];
        _last= parts[1];
    };
};

var bob = new Person('Bob Ross');
console.log(bob.getFullName());
