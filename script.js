var APIKey = "72c3cee628c2f88baf91042dc00b51a8";
var city;
var queryURL = "http://api.openweathermap.org/data/2.5/weather?q=" + city + "&appid=" + APIKey;
const template = document.querySelector("#weathertemplate");
const foreTemplate = document.querySelector("#forecasttemplate");
const currentDay = document.querySelector("#currentday");
const fivedayweek = document.querySelector("#fivedayweek")
// fetch(queryURL)

function getCurrentWeather() {
    fetch("http://api.openweathermap.org/data/2.5/weather?q=" + city + "&appid=" + APIKey + "&units=imperial")
        .then(function (response) {
            return response.json()
        }).then(function (data) {
            // console.log(data);
            displayCurrent(data);
        })
}
function getForecast() {
    console.log(APIKey)
    console.log(city)
    fetch("http://api.openweathermap.org/data/2.5/forecast?q=" + city + "&appid=" + APIKey + "&units=imperial")
        .then(function (response) {
            return response.json()
        }).then(function (data) {
            displayForecast(data);
            console.log(data);

        })
}

const formQuery = document.querySelector("#searchform");

formQuery.addEventListener("submit", (e) => {
    e.preventDefault();
    const data = new FormData(e.target);
    city = data.get("search");
    getCurrentWeather();
    getForecast();

})

function displayCurrent(data) {
    const currentTemplate = template.content.cloneNode(true);
    currentTemplate.querySelector("#today-city-name").textContent = data.name;
    currentTemplate.querySelector("#today-date").textContent = data.dt;
    currentTemplate.querySelector("#today-icon").setAttribute("src", `https://openweathermap.org/img/wn/${data.weather[0].icon}@2x.png`);
    currentTemplate.querySelector("#today-temp").textContent = data.main.temp;
    currentTemplate.querySelector("#today-humid").textContent = data.main.humidity;
    currentTemplate.querySelector("#today-wind-speed").textContent = data.wind.speed;
    currentDay.append(currentTemplate);
}

function displayForecast(data) {
    let dayCounter = 0;

    for (let i = 0; i < data.list.length; i += 8) {
        const dayId = "day" + (dayCounter + 1);

        document.querySelector(`#${dayId}-city-name`).textContent = city;
        document.querySelector(`#${dayId}-date`).textContent = data.list[i].dt_txt;
        document.querySelector(`#${dayId}-icon`).setAttribute("src", `https://openweathermap.org/img/wn/${data.list[i].weather[0].icon}@2x.png`);
        document.querySelector(`#${dayId}-temp`).textContent = data.list[i].main.temp;
        document.querySelector(`#${dayId}-humid`).textContent = data.list[i].main.humidity;
        document.querySelector(`#${dayId}-wind-speed`).textContent = data.list[i].wind.speed;

        dayCounter++;

        if (dayCounter >= 5) {
            break;
        }
    }
}


