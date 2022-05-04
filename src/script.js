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

//search bar

//function handleSubmit(event) {
// event.preventDefault();
// let input = document.querySelector("#search-bar");
// let h1 = document.querySelector("h1");
// h1.innerHTML = `${input.value}`;
//}

//let searchButton = document.querySelector("#my-form");
//searchButton.addEventListener("submit", handleSubmit);

//temperature changer

//function changeTempC(event) {
// event.preventDefault();
// let temperature = document.querySelector("#temp-number");
// temperature.innerHTML = 17;
//}

//let ctemp = document.querySelector("#c-temp");
//ctemp.addEventListener("click", changeTempC);

//function changeTempF(event) {
// event.preventDefault();
// let temperature = document.querySelector("#temp-number");
// temperature.innerHTML = 63;
//}

//let ftemp = document.querySelector("#f-temp");
//ftemp.addEventListener("click", changeTempF)

//weather API

function showWeather(response) {
  document.querySelector("#temp-number").innerHTML = Math.round(
    response.data.main.temp
  );

  let description = response.data.weather[0].description;
  document.querySelector("#weather-today").innerHTML = description;

  let currentCity = response.data.name;
  let countryCode = response.data.sys.country;
  document.querySelector(
    "#city-name"
  ).innerHTML = `${currentCity}, ${countryCode}`;

  document.querySelector("#wind-speed-answer").innerHTML = `${Math.round(
    response.data.wind.speed
  )}km/h`;
  document.querySelector(
    "#humidity-answer"
  ).innerHTML = `${response.data.main.humidity}%`;
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
  event.preventDefault();
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
