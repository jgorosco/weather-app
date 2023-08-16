import apiKey from './keys.js';

const apiUrl = "https://api.openweathermap.org/data/2.5/weather?units=metric&lang=es&q="

const weathers = {
    CLOUDS: "Clouds",
    CLEAR: "Clear",
    RAIN: "Rain",
    DRIZZLE: "Drizzle",
    MIST: "Mist"
}

const searchBox = document.querySelector(".search input");
const searchButton = document.querySelector(".search button");
const weatherIcon = document.querySelector(".weather-icon");

async function checkWeather(city) {
    const response = await fetch(apiUrl + city.toLowerCase() + `&appid=${apiKey}`);

    if (response.status == 404) {
        document.querySelector(".error").style.display = "block";
        document.querySelector(".weather").style.display = "none";
    } else {

        var data = await response.json();

        document.querySelector(".city").innerHTML = city;
        document.querySelector(".temp").innerHTML = Math.round(data.main.temp) + "°C";
        document.querySelector(".humidity").innerHTML = data.main.humidity + "%";
        document.querySelector(".wind").innerHTML = data.wind.speed + " m/s";

        weatherIcon.src = "https://openweathermap.org/img/wn/" + data.weather[0].icon + "@2x.png"
        weatherIcon.title = data.weather[0].description

        document.querySelector(".weather").style.display = "block";
    }
}

searchButton.addEventListener("click", () => {
    checkWeather(searchBox.value)
})