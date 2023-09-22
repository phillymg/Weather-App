var APIKey = "72c3cee628c2f88baf91042dc00b51a8";
var city;
var queryURL = "http://api.openweathermap.org/data/2.5/weather?q=" + city + "&appid=" + APIKey;

// fetch(queryURL)

function getCurrentWeather() {
    fetch("http://api.openweathermap.org/data/2.5/weather?q=" + city + "&appid=" + APIKey + "&units=imperial")
        .then(function (response) {
            return response.json()
        }).then(function (data) {
            console.log(data);
        })
}

const formquery = document.querySelector("#searchform");

formquery.addEventListener("submit", (e) => {
    e.preventDefault();
    const data = new FormData(e.target);
    city = data.get("search");
    getCurrentWeather();
})


