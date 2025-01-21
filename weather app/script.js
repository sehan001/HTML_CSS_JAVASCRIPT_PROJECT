document.addEventListener("DOMContentLoaded", () => {
  const cityinput = document.getElementById("cityInput");
  const button = document.getElementById("btn");
  const API_KEY = "acd99c046f5152373a8e952421cd8681";
  const info = document.getElementById("info");
  const displayerror = document.getElementById("error");
  const cityName = document.getElementById("name");
  const cityTemperature = document.getElementById("temperature");
  const cityDescription = document.getElementById("description");

  button.addEventListener("click", async () => {
    const city = cityinput.value.trim();
    if (!city) return;
    try {
      const data = await getWeatherData(city);
      displayWeatherData(data);
    } catch (error) {
      error();
    }
    cityinput.value = "";
  });
  async function getWeatherData(city) {
    const url = `https://api.openweathermap.org/data/2.5/weather?q=${city}&units=metric&appid=${API_KEY}`;
    const response = await fetch(url);
    if (!response.ok) {
      throw new error("city not found");
    }
    info.classList.remove("hidden");
    const resultdata = response.json();
    return resultdata;
  }
  function displayWeatherData(data) {
    const { name, main, weather } = data;
    cityName.textContent = name;
    cityTemperature.textContent = main.temp;
    cityDescription.textContent = weather[0].description;
  }
  function error() {
    info.classList.add("hidden");
    displayerror.classList.remove("hidden");
    // Fix: Use classList.remove instead of remove
  }
});
