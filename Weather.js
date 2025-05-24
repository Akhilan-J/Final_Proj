import { API_KEY } from "./API.js";
console.log(API_KEY);
console.log("Hello");
let unit = "metric";
let currentCity = "";

const celsiusBtn = document.getElementById("celsius");
const fahrenheitBtn = document.getElementById("fahrenheit");

celsiusBtn.addEventListener("click", () => {
  if (unit !== "metric") {
    unit = "metric";
    updateToggleUI();
    if (currentCity) getWeather(currentCity);
  }
});

fahrenheitBtn.addEventListener("click", () => {
  if (unit !== "imperial") {
    unit = "imperial";
    updateToggleUI();
    if (currentCity) getWeather(currentCity);
  }
});

function updateToggleUI() {
  const celsiusBtn = document.getElementById("celsius");
  const fahrenheitBtn = document.getElementById("fahrenheit");

  if (unit === "metric") {
    celsiusBtn.classList.add("active");
    fahrenheitBtn.classList.remove("active");
  } else {
    fahrenheitBtn.classList.add("active");
    celsiusBtn.classList.remove("active");
  }
}

const profileBtn = document.getElementById("name-change");
profileBtn.addEventListener("click", () => {
  name = prompt("What's your name?");
  if (name) localStorage.setItem("name", name);
});

async function getWeather() {
  const API = API_KEY;
  const city = document.getElementById("city").value;
  currentCity = city;
  if (!city) {
    alert("Plese Enter a City");
    return;
  }
  try {
    const currentWeather = await fetch(
      `https://api.openweathermap.org/data/2.5/weather?q=${city}&appid=${API}&units=${unit}`
    );
    const forecast = await fetch(
      `https://api.openweathermap.org/data/2.5/forecast?q=${city}&appid=${API}&units=${unit}`
    );

    const weatherJson = await currentWeather.json();
    const forecastJson = await forecast.json();

    console.log(weatherJson);
    displayWeather(weatherJson);
    console.log(forecastJson);
    displayHourlyForecast(forecastJson);
  } catch (err) {
    console.error("Error fetching weather:", err);
  }
}
document.getElementById("search-btn").addEventListener("click", getWeather);

function displayWeather(data) {
  const tempDivInfo = document.getElementById("temp");
  const weatherInfoDiv = document.getElementById("weather");
  const weatherIcon = document.getElementById("weather-icon");
  const hourlyForecastDiv = document.getElementById("Forecast");

  weatherInfoDiv.innerHTML = "";
  hourlyForecastDiv.innerHTML = "";
  tempDivInfo.innerHTML = "";

  if (data.cod === "404") {
    weatherInfoDiv.innerHTML = `<p>${data.message}</p>`;
  } else {
    const cityName = data.name;
    const temperature = Math.round(data.main.temp);
    const description = data.weather[0].description;
    const iconCode = data.weather[0].icon;
    const iconUrl = `https://openweathermap.org/img/wn/${iconCode}@4x.png`;

    const temperatureHTML = `<p id="temp-value">${temperature}°${
      unit === "metric" ? "C" : "F"
    }</p>`;

    const weatherHtml = `
          <p>${cityName}</p>
          <p>${description}</p>
      `;

    tempDivInfo.innerHTML = temperatureHTML;
    weatherInfoDiv.innerHTML = weatherHtml;
    weatherIcon.src = iconUrl;
    weatherIcon.alt = description;

    document.getElementById("unit").style.display = "block";

    showImage();
  }
}

function displayHourlyForecast(hourlyData) {
  const hourlyForecastDiv = document.getElementById("Forecast");

  const next24Hours = hourlyData.list.slice(0, 8);

  next24Hours.forEach((item) => {
    const dateTime = new Date(item.dt * 1000);
    const hour = dateTime.getHours();
    const temperature = Math.round(item.main.temp);
    const iconCode = item.weather?.[0]?.icon || "01d";
    const iconUrl = `https://openweathermap.org/img/wn/${iconCode}.png`;

    const hourlyItemHtml = `
          <div class="hourly-item">
              <span>${hour}:00</span>
              <img src="${iconUrl}" alt="Hourly Weather Icon">
              <span>${temperature}°${unit === "metric" ? "C" : "F"}</span>
          </div>
      `;

    hourlyForecastDiv.innerHTML += hourlyItemHtml;
  });
}

function showImage() {
  const weatherIcon = document.getElementById("weather-icon");
  weatherIcon.style.display = "block";
}

let darkmode = localStorage.getItem("darkmode");
const themeSwitch = document.getElementById("theme-switch");
if (darkmode === "active") {
  document.body.classList.add("darkmode");
} else {
  document.body.classList.remove("darkmode");
}
const enableDarkmode = () => {
  document.body.classList.add("darkmode");
  localStorage.setItem("darkmode", "active");
};

const disableDarkmode = () => {
  document.body.classList.remove("darkmode");
  localStorage.setItem("darkmode", null);
};

if (darkmode === "active") enableDarkmode();

themeSwitch.addEventListener("click", () => {
  darkmode = localStorage.getItem("darkmode");
  darkmode !== "active" ? enableDarkmode() : disableDarkmode();
});
