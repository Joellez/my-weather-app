//date and time

let currentTime = document.querySelector(".time");

let now = new Date();
let hours = now.getHours();
let minutes = now.getMinutes();
if (minutes < 10) minutes = "0" + minutes;
let time = `${hours}:${minutes}`;
currentTime.innerHTML = time;

let currentDate = document.querySelector(".date");

let days = [
  "Sunday",
  "Monday",
  "Tuesday",
  "Wednesday",
  "Thursday",
  "Friday",
  "Saturday",
  "Sunday",
];
days = days[now.getDay()];

let months = [
  "January",
  "February",
  "March",
  "April",
  "May",
  "June",
  "July",
  "August",
  "September",
  "October",
  "November",
  "December",
];
months = months[now.getMonth()];

function dateOrdinal(number) {
  let date = now.getDate();
  if (date === 31 || date === 21 || date === 1) return date + "st";
  else if (date === 22 || date === 2) return date + "nd";
  else if (date === 23 || date === 3) return date + "rd";
  else return date + "th";
}
let ordinalDate = dateOrdinal();
let year = now.getFullYear();
currentDate.innerHTML = `${days} ${ordinalDate} ${months} ${year}`;

//weather API

function showWeather(response) {
  celsiusTemp = response.data.main.temp;
  cTempLink.classList.add("active");
  fTempLink.classList.remove("active");

  document.querySelector("#temp-number").innerHTML = Math.round(celsiusTemp);

  let description = response.data.weather[0].description;
  document.querySelector("#weather-today").innerHTML = description;

  let currentCity = response.data.name;
  let countryCode = response.data.sys.country;
  document.querySelector(
    "#city-name"
  ).innerHTML = `${currentCity}, ${countryCode}`;

  document.querySelector("#wind-speed-answer").innerHTML = `${Math.round(
    response.data.wind.speed / 1.609
  )}mph (${Math.round(response.data.wind.speed)}km/h)`;

  document.querySelector(
    "#humidity-answer"
  ).innerHTML = `${response.data.main.humidity}%`;

  // icon changes depending on weather
  let iconElement = document.querySelector("#icon-head");
  iconElement.setAttribute(
    "src",
    `http://openweathermap.org/img/wn/${response.data.weather[0].icon}@2x.png`
  );
  iconElement.setAttribute("alt", response.data.weather[0].description);
}

function searchCity(city) {
  let apiKey = "2fa6ed5285fb7256f233dcc9ef3d4087";
  let units = "metric";
  let apiEndpoint = "https://api.openweathermap.org/data/2.5/weather";
  let apiUrl = `${apiEndpoint}?q=${city}&appid=${apiKey}
&units=${units}`;
  axios.get(apiUrl).then(showWeather);
}

function handleSubmit(event) {
  event.preventDefault(); //prevents page from reloading
  let city = document.querySelector("#search-bar").value;
  searchCity(city);
}

let form = document.querySelector("#my-form");
form.addEventListener("submit", handleSubmit);

//Geolocation

function getCurrentLocation(event) {
  event.preventDefault();
  navigator.geolocation.getCurrentPosition(searchLocation);
}

function searchLocation(position) {
  let apiKey = "c0f23c2af89da48c0615f7a3012794ef";
  let lat = position.coords.latitude;
  let lon = position.coords.longitude;
  let url = `https://api.openweathermap.org/data/2.5/weather?lat=${lat}&lon=${lon}&units=metric&appid=${apiKey}`;
  axios.get(url).then(showWeather);
}

let currentLocation = document.querySelector("#location-button");
currentLocation.addEventListener("click", getCurrentLocation);

searchCity("London"); //to search for London on page load

//temp conversion

function changeTempF(event) {
  event.preventDefault();
  let temperatureElement = document.querySelector("#temp-number");
  //remove active class from cTempLink
  cTempLink.classList.remove("active");
  fTempLink.classList.add("active");
  let ftemperature = (celsiusTemp * 9) / 5 + 32;
  temperatureElement.innerHTML = Math.round(ftemperature);
}

function changeTempC(event) {
  event.preventDefault();
  cTempLink.classList.add("active");
  fTempLink.classList.remove("active");
  let temperatureElement = document.querySelector("#temp-number");

  temperatureElement.innerHTML = Math.round(celsiusTemp);
}

let celsiusTemp = null;

let fTempLink = document.querySelector("#f-temp");
fTempLink.addEventListener("click", changeTempF);

let cTempLink = document.querySelector("#c-temp");
cTempLink.addEventListener("click", changeTempC);
