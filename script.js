const url = "https://api.weatherbit.io/v2.0/current";
const apiKey= "8b660c728e074ec0bb58d80f1bfafca7";
const inputField = document.getElementById("city");
const submitBtn = document.getElementById("submit");
const cityDisplay = document.getElementById("cityName");
const dateDisplay = document.getElementById("date");
const iconDisplay = document.getElementById("icon");
const tempDisplay = document.getElementById("temp");
const cloudDisplay = document.getElementById("cloudCover");
const windDisplay = document.getElementById("windSpeed");

window.addEventListener("DOMContentLoaded", loadedHandler);

//adds event listener for submit button when page is loaded
function loadedHandler() {
    submitBtn.addEventListener("click", getCityName);
    console.log("loaded")
}

//retrieves the city name when submit button is clicked and uses it to call the api
function getCityName() {
    let cityName = inputField.value;
    //checks to see if the user has entered a city
    if (cityName === "") {
        alert("Please enter a valid city name");
        return;
    }
    //call api
    let xhr = new XMLHttpRequest();
    xhr.addEventListener("load", getWeather);
    xhr.open("GET", `${url}?city=${cityName}&key=${apiKey}&units=I`);
    xhr.responseType = "json";
    xhr.send();
}

//takes the api response and uses it to call display weather
function getWeather() {
    //checks to make sure the api is giving a response
    if (this.status !== 200) {
        alert(`Error Making HTTP request: ${this.statusText}`);
        return;
    }

    let response = this.response;
    let data = response.data[0];
    console.log(data.weather.icon)

    displayWeather(data);
}

//uses api response to display current weather data on the webpage
function displayWeather(weatherData) {
    cityDisplay.innerText = weatherData.city_name;
    dateDisplay.innerText = weatherData.ob_time;
    iconDisplay.src = `https://www.weatherbit.io/static/img/icons/${weatherData.weather.icon}.png`
    iconDisplay.removeAttribute("hidden");
    tempDisplay.innerText = `${weatherData.temp}\u00B0F`
    cloudDisplay.innerText = `${weatherData.clouds}% covered`
    windDisplay.innerText = `Winds ${weatherData.wind_cdir} ${weatherData.wind_spd} mph`
}