var lat;
var lon;
var temp;
var tempUnits;
var desc;
var icon;

function getLocalWeather(lat, lon) {
    $.ajax({
        url: "https://crossorigin.me/http://api.openweathermap.org/data/2.5/weather?lat=" + lat + "&lon=" + lon + "&appid=49aa9280d805bce6505784d55750d684",
        cache: false,
        success: function (json) {
            console.log(json);
            temp = json.main.temp - 273; // in C
            tempUnits = 'C';
            desc = json.weather[0].description;
            icon = 'http://openweathermap.org/img/w/' + json.weather[0].icon + '.png';
            updateFields();
        },
        error: function (xhr, ajaxOptions, thrownError) {
            $("#quote-display").html(xhr.status);
        }
    });
}

function updateFields() {
    $("#temperature").html(Math.round(temp*10)/10 + ' ' + tempUnits); // rounds to 1 decimal place
    $("#description").html(desc);
    $("#icon").attr('src', icon);
}

function toggleTempUnits() {
    if (tempUnits === 'F') {
        tempUnits = 'C';
        temp = (temp - 32) * 5/9;
    } else {
        tempUnits = 'F';
        temp = temp * 9/5 + 32;
    }
    $("#temperature").html(Math.round(temp*10)/10 + ' ' + tempUnits);
}

$(document).ready(function () {
    if (navigator.geolocation) {
        navigator.geolocation.getCurrentPosition(function (position) {
            lat = position.coords.latitude;
            lon = position.coords.longitude;
            $("#location").html("latitude: " + lat + ", longitude: " + lon);

            getLocalWeather(lat, lon);
        });
    }

    $("#toggleTempUnits").on("click", function () {
        toggleTempUnits();
    });

});
