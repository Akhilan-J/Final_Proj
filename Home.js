//Personalized Greeting
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

const profileBtn = document.getElementById("name-change");
profileBtn.addEventListener("click", () => {
  name = prompt("What's your name?");
  if (name) localStorage.setItem("name", name);
  const greeting = document.getElementById("Greeting");
  greeting.innerText = `Good ${greet} ${name}`;
});

//Getting Random fact
async function getFact() {
  try {
    const res = await fetch(
      "https://uselessfacts.jsph.pl/random.json?language=en"
    );
    const toJson = await res.json();
    return toJson;
  } catch (err) {
    console.error("Failed to fetch fact", err);
    return { text: "Could not load a fact right now." };
  }
}

async function renderFact() {
  const factData = await getFact();
  const factElement = document.createElement("h2");
  factElement.innerHTML = factData.text;
  factElement.className = "Fact";
  document.body.appendChild(factElement);
}
renderFact();

//Light or dark mode
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
