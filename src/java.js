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
  let apiKey = "ac209dae1f283fb332a5bb7f50b0f468";
  let apiUrl = `https://api.openweathermap.org/data/2.5/weather?q=${cityInput.value}&appid=${apiKey}&units=metric`;

  axios.get(apiUrl).then(showTemperature);
}

let form = document.querySelector("#search-form");
form.addEventListener("submit", search);

function showTemperature(response) {
  let temperature = Math.round(response.data.main.temp);
  let temperatureElement = document.querySelector("#temp");
  temperatureElement.innerHTML = `${temperature}`;
  let windSpeed = Math.round(response.data.wind.speed);
  let windElement = document.querySelector("#wSpeed");
  windElement.innerHTML = `Wind: ${windSpeed} m/sec`;
  let humidity = Math.round(response.data.main.humidity);
  let humidityElement = document.querySelector("#humidityT");
  humidityElement.innerHTML = `Humidity: ${humidity}%`;
  let descripton = (document.querySelector("#conditions").innerHTML =
    response.data.weather[0].main);

  let cityName = response.data.name;
  let span2 = document.querySelector("#place");

  span2.innerHTML = `${cityName}`;
}
