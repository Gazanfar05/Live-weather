const apiKey = "d3ce55e13c73e606a514a7afeadadd19";
const weatherInfo = document.getElementById("weather-info");
const errorMessage = document.getElementById("error-message");
const loading = document.getElementById("loading");

async function getWeather() {
    const city = document.getElementById("city").value.trim();
    const weatherInfo = document.getElementById("weather-info");
    const errorMessage = document.getElementById("error-message");
    const loading = document.getElementById("loading");
  
    if (!city) {
      errorMessage.textContent = "Bruh, type a city 😐";
      errorMessage.classList.add("show");
      weatherInfo.classList.remove("show");
      weatherInfo.innerHTML = "";
      return;
    }
  
    loading.style.display = "block";
    errorMessage.textContent = "";
    errorMessage.classList.remove("show");
    weatherInfo.innerHTML = "";
    weatherInfo.classList.remove("show");
  
    try {
      const response = await fetch(
        `https://api.openweathermap.org/data/2.5/weather?q=${city}&appid=${apiKey}&units=metric`
      );
      const data = await response.json();
  
      if (data.cod !== 200) {
        errorMessage.textContent = data.message;
        errorMessage.classList.add("show");
      } else {
        const iconCode = data.weather[0].icon;
        const iconUrl = `https://openweathermap.org/img/wn/${iconCode}@2x.png`;
  
        // 🌤️ Dynamic Background Based on Weather
        const weatherMain = data.weather[0].main.toLowerCase();
        document.body.className = ""; // remove previous weather class
  
        if (weatherMain.includes("clear")) {
          document.body.classList.add("clear");
        } else if (weatherMain.includes("cloud")) {
          document.body.classList.add("clouds");
        } else if (weatherMain.includes("rain")) {
          document.body.classList.add("rain");
        } else if (weatherMain.includes("snow")) {
          document.body.classList.add("snow");
        } else if (weatherMain.includes("thunderstorm")) {
          document.body.classList.add("thunderstorm");
        } else if (weatherMain.includes("drizzle")) {
          document.body.classList.add("drizzle");
        } else if (
          weatherMain.includes("mist") ||
          weatherMain.includes("fog") ||
          weatherMain.includes("haze")
        ) {
          document.body.classList.add("mist");
        } else {
          document.body.classList.add("clouds"); // fallback default
        }
  
        weatherInfo.innerHTML = `
          <h2>${data.name}, ${data.sys.country}</h2>
          <img src="${iconUrl}" alt="${data.weather[0].description}">
          <p><strong>${data.weather[0].main}</strong> - ${data.weather[0].description}</p>
          <p>🌡️ Temp: ${data.main.temp} °C</p>
          <p>💨 Wind: ${data.wind.speed} m/s</p>
          <p>💧 Humidity: ${data.main.humidity}%</p>
        `;
        weatherInfo.classList.add("show");
      }
    } catch (error) {
      errorMessage.textContent = "Something went wrong. Blame the weather gods 😔";
      errorMessage.classList.add("show");
    } finally {
      loading.style.display = "none";
    }
  }
  function updateBackground(weatherCondition) {
    const body = document.body;
    
    body.classList.remove("clear", "clouds", "rain", "snow", "thunderstorm", "drizzle", "mist");

    switch (weatherCondition) {
        case "Clear":
            body.classList.add("clear");
            break;
        case "Clouds":
            body.classList.add("clouds");
            break;
        case "Rain":
            body.classList.add("rain");
            break;
        case "Snow":
            body.classList.add("snow");
            break;
        case "Thunderstorm":
            body.classList.add("thunderstorm");
            break;
        case "Drizzle":
            body.classList.add("drizzle");
            break;
        case "Mist":
        case "Fog":
            body.classList.add("mist");
            break;
        default:
            body.style.backgroundImage = "url('https://images.unsplash.com/photo-1502082553048-f009c37129b9')";
            break;
    }
}
if (data.cod !== 200) {
    errorMessage.textContent = data.message;
    errorMessage.classList.add("show");
} else {
    const weatherCondition = data.weather[0].main;  // Get the main weather condition
    updateBackground(weatherCondition);  // Change background based on condition

    const iconCode = data.weather[0].icon;
    const iconUrl = `https://openweathermap.org/img/wn/${iconCode}@2x.png`;

    weatherInfo.innerHTML = `
        <h2>${data.name}, ${data.sys.country}</h2>
        <img src="${iconUrl}" alt="${data.weather[0].description}">
        <p><strong>${data.weather[0].main}</strong> - ${data.weather[0].description}</p>
        <p>🌡️ Temp: ${data.main.temp} °C</p>
        <p>💨 Wind: ${data.wind.speed} m/s</p>
        <p>💧 Humidity: ${data.main.humidity}%</p>
    `;
    weatherInfo.classList.add("show");
}