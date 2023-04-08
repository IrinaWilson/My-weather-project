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
  hours = `0${hours}`;
}
let minutes = now.getMinutes();
if (minutes < 10) {
  minutes = `0${minutes}`;
}
let sDate = document.querySelector(".date");
sDate.innerHTML = `${day}, ${date} ${month}`;
let sTime = document.querySelector(".time");
sTime.innerHTML = `${hours}:${minutes}`;

function formatDay(timestamp) {
  let date = new Date(timestamp * 1000);
  let day = date.getDay();
  let days = ["Sun", "Mon", "Tue", "Wed", "Thu", "Fri", "Sat"];
  return days[day];
}

function displayForecast(response) {
  let forecast = response.data.daily;
  let forecastElement = document.querySelector("#forecast");
  let forecastHTML = `<div class="row">`;

  forecast.forEach(function (forecastDay, index) {
    if (index < 6) {
      forecastHTML =
        forecastHTML +
        `
              <div class="column">
              <span class="monday">${formatDay(forecastDay.time)}</span>
              <br />
             <img src="http://shecodes-assets.s3.amazonaws.com/api/weather/icons/${
               forecastDay.condition.icon
             }.png" alt="" class="emoji1"/>
              <br />
              <span class="temp1-max">${Math.round(
                forecastDay.temperature.maximum
              )}°</span>
              <span class="temp1-min">${Math.round(
                forecastDay.temperature.minimum
              )}°</span>
            </div>
            `;
    }
  });

  forecastHTML = forecastHTML + `</div>`;
  forecastElement.innerHTML = forecastHTML;
}

function getForecast(coordinates) {
  console.log(coordinates);
  let apiKey = "80083fa950bb6bac505970t4eao412fe";
  let apiUrl = `https://api.shecodes.io/weather/v1/forecast?lon=${coordinates.lon}&lat=${coordinates.lat}&key=${apiKey}&units=metric`;
  axios.get(apiUrl).then(displayForecast);
}

function showTemperature(response) {
  let temperatureElement = document.querySelector("#temp");
  celsiusTemperature = Math.round(response.data.main.temp);
  temperatureElement.innerHTML = `${celsiusTemperature}`;
  let windSpeed = Math.round(response.data.wind.speed);
  let windSpeedPerKmPerHour = windSpeed * 3.6;
  let windElement = document.querySelector("#wSpeed");
  windElement.innerHTML = `Wind: ${Math.round(windSpeedPerKmPerHour)} km/h`;
  let humidity = Math.round(response.data.main.humidity);
  let humidityElement = document.querySelector("#humidityT");
  humidityElement.innerHTML = `Humidity: ${humidity}%`;
  let descripton = (document.querySelector("#conditions").innerHTML =
    response.data.weather[0].main);

  let cityName = response.data.name;
  let span2 = document.querySelector("#place");

  span2.innerHTML = `${cityName}`;

  let locationIcon = document.querySelector("#icon");
  locationIcon.setAttribute(
    "src",
    `http://openweathermap.org/img/wn/${response.data.weather[0].icon}@2x.png`
  );
  locationIcon.setAttribute("alt", response.data.weather[0].descripton);

  getForecast(response.data.coord);
}

function search(city) {
  let apiKey = "3dce9b1c66837262a25b3f448d354a76";
  let apiUrl = `https://api.openweathermap.org/data/2.5/weather?q=${city}&appid=${apiKey}&units=metric`;

  axios.get(apiUrl).then(showTemperature);
}

function handleSubmit(event) {
  event.preventDefault();
  let cityInputElement = document.querySelector("#search-text-input");
  search(cityInputElement.value);
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
  celsiusLink.classList.remove("active");
  fahrenheitLink.classList.add("active");
  let fahrenheitTemperature = (celsiusTemperature * 9) / 5 + 32;
  temperatureElement.innerHTML = Math.round(fahrenheitTemperature);
}

function displayCelsiusTemp(event) {
  event.preventDefault();
  celsiusLink.classList.add("active");
  fahrenheitLink.classList.remove("active");
  let temperatureElement = document.querySelector("#temp");

  temperatureElement.innerHTML = Math.round(celsiusTemperature);
}

let form = document.querySelector("#search-form");
form.addEventListener("submit", handleSubmit);

let celsiusTemperature = null;
let button = document.querySelector("#getPosition");
button.addEventListener("click", getCurrentPosition);

let fahrenheitLink = document.querySelector("#fahrenheit-link");
fahrenheitLink.addEventListener("click", displayFahrenheitTemp);

let celsiusLink = document.querySelector("#celsius-link");
celsiusLink.addEventListener("click", displayCelsiusTemp);

search("Madrid");
