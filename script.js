//Date/time stuff
let now = new Date ();

let days = ["Sunday", "Monday", "Tuesday", "Wednesday", "Thursday", "Friday", "Saturday"];
let day = days[now.getDay()];
let hours = now.getHours();
let minutes = now.getMinutes();

if (minutes < 10) {
  minutes = `0${minutes}`;
}

let currentDayTime = document.querySelector("#current-day-time");

currentDayTime.innerHTML = `${day}, ${hours}:${minutes}`;

//Here's the start of the search bar/submit stuff

function showTemperature(response) {
  document.querySelector("#city").innerHTML = response.data.name;
  let temperature = Math.round(response.data.main.temp);
  document.querySelector("#temp").innerHTML = `${temperature}°F`;
}

function userCity(event) {
  event.preventDefault();
  let apiKey = "5a533b6a6d16b85bbee4c6b85f37d1be";
  let city = document.querySelector("#city-search");
  let cityResult = city.value;
  let units = "imperial";
  let apiUrl = `https://api.openweathermap.org/data/2.5/weather?q=${cityResult}&appid=${apiKey}&units=${units}`;
  axios.get(apiUrl).then(showTemperature); 
}

let form = document.querySelector("form");
let searchButton = document.querySelector("#search-button");

form.addEventListener("submit", userCity);
searchButton.addEventListener("click", userCity);

//Geolocation stuff

function showWeather(response) {
  let findCity = document.querySelector("#city");
  let findTemp = document.querySelector("#temp");
  let city = response.data.name;
  let temp = Math.round(response.data.main.temp);
  findCity.innerHTML = `${city}`;
  findTemp.innerHTML = `${temp}°F`;
}

function userPosition(position) {
  let apiKey = "5f472b7acba333cd8a035ea85a0d4d4c";
  let lat = position.coords.latitude;
  let lon = position.coords.longitude;
  let units = "imperial"
  let url = `https://api.openweathermap.org/data/2.5/weather?lat=${lat}&lon=${lon}&appid=${apiKey}&units=${units}`;
  axios.get(url).then(showWeather);
}

function userGeolocation() {
  navigator.geolocation.getCurrentPosition(userPosition);
}

let currentLocation = document.querySelector("#current-location-button");
currentLocation.addEventListener("click", userGeolocation);
