var APIKey = "72c3cee628c2f88baf91042dc00b51a8";
var city;
var queryURL = "http://api.openweathermap.org/data/2.5/weather?q=" + city + "&appid=" + APIKey;
const template = document.querySelector("#weathertemplate");
const foreTemplate = document.querySelector("#forecasttemplate");
const histlist = document.querySelector("#histlist")
const currentDay = document.querySelector("#currentday");
const fivedayweek = document.querySelector("#fivedayweek");
const histbutton = document.querySelector("#histbutton");


function getCurrentWeather() {

    fetch("http://api.openweathermap.org/data/2.5/weather?q=" + city + "&appid=" + APIKey + "&units=imperial")
        .then(function (response) {
            return response.json()
        }).then(function (data) {
            displayCurrent(data);
            saveToStorage(data.name)
        })

}
function getForecast() {

    fetch("http://api.openweathermap.org/data/2.5/forecast?q=" + city + "&appid=" + APIKey + "&units=imperial")
        .then(function (response) {
            return response.json()
        }).then(function (data) {
            displayForecast(data);
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
    currentDay.innerHTML = "";

    const currentTemplate = template.content.cloneNode(true);
    currentTemplate.querySelector("#today-city-name").textContent = data.name;
    currentTemplate.querySelector("#today-date").textContent = "Date: " + new Date(data.dt * 1000).toLocaleDateString(undefined, { weekday: "long", month: "short", day: "numeric" });
    currentTemplate.querySelector("#today-icon").setAttribute("src", `https://openweathermap.org/img/wn/${data.weather[0].icon}@2x.png`);
    currentTemplate.querySelector("#today-temp").textContent = "Temperature: " + data.main.temp;
    currentTemplate.querySelector("#today-humid").textContent = "Humidity: " + data.main.humidity;
    currentTemplate.querySelector("#today-wind-speed").textContent = "Wind Speed: " + data.wind.speed;
    currentDay.append(currentTemplate);

}

function displayForecast(data) {
    fivedayweek.innerHTML = "";
    for (let i = 0; i < data.list.length; i += 8) {
        const forecastCard = foreTemplate.content.cloneNode(true)
        forecastCard.querySelector(`#forecast-city-name`).textContent = data.city.name;
        forecastCard.querySelector(`#forecast-date`).textContent = "Date: " + new Date(data.list[i].dt * 1000).toLocaleDateString(undefined, { weekday: "long", month: "short", day: "numeric" });
        forecastCard.querySelector(`#forecast-icon`).setAttribute("src", `https://openweathermap.org/img/wn/${data.list[i].weather[0].icon}@2x.png`);
        forecastCard.querySelector(`#forecast-temp`).textContent = "Temperature: " + data.list[i].main.temp;
        forecastCard.querySelector(`#forecast-humid`).textContent = "Humidity: " + data.list[i].main.humidity;
        forecastCard.querySelector(`#forecast-wind-speed`).textContent = "Wind Speed: " + data.list[i].wind.speed;
        fivedayweek.append(forecastCard);
    }
}

function saveToStorage(cityname) {
    const readLocalStorage = JSON.parse(localStorage.getItem("searchhistory")) || [];

    if (!readLocalStorage.includes(cityname)) {
        readLocalStorage.push(cityname);
        localStorage.setItem("searchhistory", JSON.stringify(readLocalStorage));
        localStorageHistory();
    }
}



function localStorageHistory() {
    const readLocalStorage = JSON.parse(localStorage.getItem("searchhistory"));
    histlist.innerHTML = "";
    for (let i = 0; i < readLocalStorage.length; i++) {
        const button = histbutton.content.cloneNode(true);
        button.querySelector('#city-button').textContent = readLocalStorage[i];
        button.querySelector('#city-button').addEventListener("click", (e) => {
            city = e.target.textContent
            getCurrentWeather();
            getForecast();
        })
        histlist.append(button);
    }

}

localStorageHistory();

