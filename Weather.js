require("dotenv").config();

async function getWeather() {
  const API = "";
  const city = document.getElementById("city").value;
  if (!city) {
    alert("Plese Enter a City");
    return;
  }
  try {
    const currentWeather = await fetch(
      `https://api.openweathermap.org/data/2.5/weather?q=${city}&appid=${API}&units=metric`
    );
    const forecast = await fetch(
      `https://api.openweathermap.org/data/2.5/forecast?q=${city}&appid=${API}&units=metric`
    );

    const weatherJson = await currentWeather.json();
    const forecastJson = await forecast.json();

    console.log(weatherJson);
    console.log(forecastJson);
  } catch (err) {
    console.error("Error fetching weather:", err);
  }
}
let darkmode = localStorage.getItem("darkmode");
const themeSwitch = document.getElementById("theme-switch");

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
