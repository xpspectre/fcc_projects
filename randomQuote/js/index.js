// getRandomQuote and 2 are direct using JSONP
// getRandomQuoteProxy and 2 use a CORS proxy, which is 1) more flexible, allowing getting from any regular JSON API, and 2) more secure than JSONP
// Only getRandomQuoteProxy supports the Tweet button correctly right now

var savedQuote;

function getRandomQuote() {
    $.ajax({
        url: "http://quotesondesign.com/wp-json/posts?filter[orderby]=rand&filter[posts_per_page]=1&_jsonp=?",
        dataType: "jsonp",
        jsonp: "jsoncallback",
        cache: false,
        success: function (json) {
            console.log(json);
            $("#quote-display").html(json[0].content);
            $("#quote-author").html(json[0].title);
        },
        error: function (xhr, ajaxOptions, thrownError) {
            $("#quote-display").html(xhr.status);
        }
    });
}

function getRandomQuoteProxy() {
    $.ajax({
        url: "https://crossorigin.me/http://quotesondesign.com/wp-json/posts?filter[orderby]=rand&filter[posts_per_page]=1",
        cache: false,
        success: function (json) {
            console.log(json);
            $("#quote-display").html(json[0].content);
            $("#quote-author").html(json[0].title);
            savedQuote = {content: jQuery(json[0].content).text().trim(), author: json[0].title};
        },
        error: function (xhr, ajaxOptions, thrownError) {
            $("#quote-display").html(xhr.status);
        }
    });
}

function getRandomQuote2() {
    $.ajax({
        url: "http://api.forismatic.com/api/1.0/?method=getQuote&format=jsonp&lang=en&jsonp=?",
        cache: false,
        dataType: "jsonp",
        jsonp: "jsoncallback",
        success: function (json) {
            console.log(json);
            $("#quote-display").html(json.quoteText);
            $("#quote-author").html(json.quoteAuthor);
        },
        error: function (xhr, ajaxOptions, thrownError) {
            $("#quote-display").html(xhr.status);
        }
    });
}

function getRandomQuote2Proxy() {
    $.ajax({
        url: "https://crossorigin.me/http://api.forismatic.com/api/1.0/?method=getQuote&format=json&lang=en",
        cache: false,
        success: function (json) {
            console.log(json);
            $("#quote-display").html(json.quoteText);
            $("#quote-author").html(json.quoteAuthor);
        },
        error: function (xhr, ajaxOptions, thrownError) {
            $("#quote-display").html(xhr.status);
        }
    });
}

function getPhoto() {
    $.ajax({
        url: "http://api.flickr.com/services/rest/?method=flickr.interestingness.getList&format=json&api_key=fbfe07eb3cc28814df5bbc0313cdd521",
        dataType: "jsonp",
        jsonp: 'jsoncallback',
        success: function (data) {
            alert(data);
        }
    });
}

function postQuoteTweet() {
    // Note: doesn't trim tweets to 140 chars...
    console.log(savedQuote);
    window.open("https://twitter.com/intent/tweet?hashtags=quotes&text=\"" + encodeURIComponent(savedQuote.content) + "\" --" + encodeURIComponent(savedQuote.author));
}

$(document).ready(function () {
    // Get initial quote
    // getRandomQuote();
    getRandomQuoteProxy();

    $("#getQuote").on("click", function () {
        // getRandomQuote();
        getRandomQuoteProxy();
    });

    $("#postTweet").on("click", function () {
        postQuoteTweet();
    })
});
