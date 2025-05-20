const now = new Date();
const Time = now.toLocaleTimeString();
const CurrTime = parseInt(Time.slice(0, 2));
let greet = "";
if (CurrTime >= 0 && CurrTime < 12) {
  greet = "Morning";
} else {
  greet = "Evening";
}
let name = localStorage.getItem("name");

if (!name) {
  name = prompt("What's your name?");
  if (name) localStorage.setItem("name", name);
}
const greeting = document.getElementById("Greeting");
greeting.innerText = `Good ${greet} ${name}`;

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
