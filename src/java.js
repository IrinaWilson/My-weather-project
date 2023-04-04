let now = new Date();

let days = [
  "Sunday",
  "Monday",
  "Tuesday",
  "Wednsday",
  "Thursday",
  "Friday",
  "Saturday",
];
let months = [
  "January",
  "Febuary",
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
let date = now.getDate();
let month = months[now.getMonth()];
let day = days[now.getDay()];
let hours = now.getHours();
if (hours < 10) {
  hours = `0 ${hours}`;
}
let minutes = now.getMinutes();
if (minutes < 10) {
  minutes = `0${minutes}`;
}
let sDate = document.querySelector(".date");
sDate.innerHTML = `${day}, ${date} ${month}`;
let sTime = document.querySelector(".time");
sTime.innerHTML = `${hours}:${minutes}`;

function search(event) {
  event.preventDefault();
  let cityInput = document.querySelector("#search-text-input");
  let span = document.querySelector("#place");
  span.innerHTML = `${cityInput.value}`;
  let apiKey = "3dce9b1c66837262a25b3f448d354a76";
  let apiUrl = `https://api.openweathermap.org/data/2.5/weather?q=${cityInput.value}&appid=${apiKey}&units=metric`;

  axios.get(apiUrl).then(showTemperature);
}

let form = document.querySelector("#search-form");
form.addEventListener("submit", search);

function showTemperature(response) {
  let temperatureElement = document.querySelector("#temp");

  temperatureElement.innerHTML = `${celsiusTemperature}`;
  let windSpeed = Math.round(response.data.wind.speed);
  let windElement = document.querySelector("#wSpeed");
  windElement.innerHTML = `Wind: ${windSpeed} m/sec`;
  let humidity = Math.round(response.data.main.humidity);
  let humidityElement = document.querySelector("#humidityT");
  humidityElement.innerHTML = `Humidity: ${humidity}%`;
  let descripton = (document.querySelector("#conditions").innerHTML =
    response.data.weather[0].main);

  celsiusTemperature = response.data.main.temp;

  let cityName = response.data.name;
  let span2 = document.querySelector("#place");

  span2.innerHTML = `${cityName}`;

  let locationIcon = document.querySelector("#icon");
  locationIcon.setAttribute(
    "src",
    `http://openweathermap.org/img/wn/${response.data.weather[0].icon}@2x.png`
  );
  locationIcon.setAttribute("alt", response.data.weather[0].descripton);
}

function showPosition(position) {
  let apiKey = "5f472b7acba333cd8a035ea85a0d4d4c";
  let apiUrl = `https://api.openweathermap.org/data/2.5/weather?lat=${position.coords.latitude}&lon=${position.coords.longitude}&appid=${apiKey}&units=metric`;
  axios.get(apiUrl).then(showTemperature);
}

function getCurrentPosition() {
  navigator.geolocation.getCurrentPosition(showPosition);
}

function displayFahrenheitTemp(event) {
  event.preventDefault();
  let temperatureElement = document.querySelector("#temp");
  let fahrenheitTemperature = (celsiusTemperature * 9) / 5 + 32;
  temperatureElement.innerHTML = Math.round(fahrenheitTemperature);
}

function displayCelsiusTemp(event) {
  event.preventDefault();
  let temperatureElement = document.querySelector("#temp");
  temperatureElement.innerHTML = Math.round(celsiusTemperature);
}

let celsiusTemperature = null;
let button = document.querySelector("#getPosition");
button.addEventListener("click", getCurrentPosition);

let fahrenheitLink = document.querySelector("#fahrenheit-link");
fahrenheitLink.addEventListener("click", displayFahrenheitTemp);

let celsiusLink = document.querySelector("#celsius-link");
celsiusLink.addEventListener("click", displayCelsiusTemp);
