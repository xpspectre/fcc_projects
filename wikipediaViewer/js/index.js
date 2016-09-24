function gotoRandomArticle() {
    window.open("https://en.wikipedia.org/wiki/Special:Random");
}

function getSearchResults() {
    var query = $("#search-entry").val();
    console.log("Searched for: " + query);

    $.ajax({
        url: "https://en.wikipedia.org/w/api.php?action=query&list=search&srsearch=" + encodeURI(query) + "&format=json&origin=*", // using new Wikimedia CORS support
        cache: false,
        success: function (json) {
            console.log(json);
            $("#search-heading").html("Search results:");
            $("#search-list").empty(); // clear previous search list, if applicable
            var n = json.query.search.length;
            for (var i = 0; i < n; i++) {
                var title = json.query.search[i].title;
                var snippet = json.query.search[i].snippet;
                $("#search-list").append("<li><a href='https://en.wikipedia.org/wiki/" + encodeURI(title) + "'>" +
                    title + "</a><p>" + snippet +"</p></li>");
            }
        }
    });
}

$(document).ready(function () {
    $("#random-button").on("click", function () {
        gotoRandomArticle();
    });

    $("#search-button").on("click", function () {
        getSearchResults();
    });

});