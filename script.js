coconst API_URL = "https://restcountries.com/v3.1/name/";
const WEATHER_API_KEY = "your_openweather_api_key";
const WEATHER_API_URL = "https://api.openweathermap.org/data/2.5/weather?q=";

async function searchCountry() {
  const query = document.getElementById("searchInput").value;
  const response = await fetch(`${API_URL}${query}`);
  const data = await response.json();
  displayCountries(data);
}

function displayCountries(countries) {
  const results = document.getElementById("results");
  results.innerHTML = "";
  countries.forEach(country => {
    const card = document.createElement("div");
    card.className = "card";
    card.innerHTML = `
      <h3>${country.name.common}</h3>
      <p>Capital: ${country.capital}</p>
      <p>Region: ${country.region}</p>
      <p>Population: ${country.population}</p>
      <button onclick="getWeather('${country.capital}', this)">More Details</button>
      <div class="weather-info"></div>
    `;
    results.appendChild(card);
  });
}

async function getWeather(city, button) {
  const response = await fetch(`${WEATHER_API_URL}${city}&appid=${WEATHER_API_KEY}&units=metric`);
  const data = await response.json();
  const weatherDiv = button.nextElementSibling;
  weatherDiv.innerHTML = `
    <p>Temperature: ${data.main.temp}°C</p>
    <p>Weather: ${data.weather[0].description}</p>
  `;
}
