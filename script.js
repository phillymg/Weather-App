var APIKey = "72c3cee628c2f88baf91042dc00b51a8";
var city;
var queryURL = "http://api.openweathermap.org/data/2.5/weather?q=" + city + "&appid=" + APIKey;
const template = document.querySelector("#weathertemplate");
const foreTemplate = document.querySelector("#forecasttemplate");
const histlist = document.querySelector("#histlist")
const currentDay = document.querySelector("#currentday");
const fivedayweek = document.querySelector("#fivedayweek");
const histbutton = document.querySelector("#histbutton");

// fetch(queryURL)

function getCurrentWeather() {
    fetch("http://api.openweathermap.org/data/2.5/weather?q=" + city + "&appid=" + APIKey + "&units=imperial")
        .then(function (response) {
            return response.json()
        }).then(function (data) {
            // console.log(data);
            displayCurrent(data);
            saveToStorage(data.name)
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
    currentDay.innerHTML = "";

    const currentTemplate = template.content.cloneNode(true);
    currentTemplate.querySelector("#today-city-name").textContent = data.name;
    currentTemplate.querySelector("#today-date").textContent = new Date(data.dt * 1000).toLocaleDateString(undefined, { weekday: "long", month: "short", day: "numeric" });
    currentTemplate.querySelector("#today-icon").setAttribute("src", `https://openweathermap.org/img/wn/${data.weather[0].icon}@2x.png`);
    currentTemplate.querySelector("#today-temp").textContent = data.main.temp;
    currentTemplate.querySelector("#today-humid").textContent = data.main.humidity;
    currentTemplate.querySelector("#today-wind-speed").textContent = data.wind.speed;
    currentDay.append(currentTemplate);

}

function displayForecast(data) {
    fivedayweek.innerHTML = "";
    for (let i = 0; i < data.list.length; i += 8) {
        const forecastCard = foreTemplate.content.cloneNode(true)
        forecastCard.querySelector(`#forecast-city-name`).textContent = data.city.name;
        forecastCard.querySelector(`#forecast-date`).textContent = new Date(data.list[i].dt * 1000).toLocaleDateString(undefined, { weekday: "long", month: "short", day: "numeric" });
        forecastCard.querySelector(`#forecast-icon`).setAttribute("src", `https://openweathermap.org/img/wn/${data.list[i].weather[0].icon}@2x.png`);
        forecastCard.querySelector(`#forecast-temp`).textContent = data.list[i].main.temp;
        forecastCard.querySelector(`#forecast-humid`).textContent = data.list[i].main.humidity;
        forecastCard.querySelector(`#forecast-wind-speed`).textContent = data.list[i].wind.speed;
        fivedayweek.append(forecastCard);
    }
    console.log(data)
}

function saveToStorage(cityname) {
    const readLocalStorage = JSON.parse(localStorage.getItem("searchhistory"));
    if (readLocalStorage === null || readLocalStorage.length === 0) {
        localStorage.setItem("searchhistory", JSON.stringify([cityname]));
    } else {
        readLocalStorage.push(cityname);
        localStorage.setItem("searchhistory", JSON.stringify(readLocalStorage));
    }
}

function localStorageHistory() {
    const readLocalStorage = JSON.parse(localStorage.getItem("searchhistory"));
    histlist.innerHtml = "";
    for (let i = 0; i < readLocalStorage.length; i++) {
        const button = histbutton.content.cloneNode(true);
        button.querySelector('#city-button').textContent = readLocalStorage[i];
        histlist.append(button);
    }
}

localStorageHistory();