// Replace YOUR_API_KEY with your actual API key
const apiKey = "YOUR_API_KEY";
// Replace CITY_NAME with the city for which you want weather information
const apiUrl = `https://api.openweathermap.org/data/2.5/weather?q=CITY_NAME&appid=${apiKey}`;

fetch(apiUrl)
    .then(response => response.json())
    .then(data => {
        const weatherInfo = document.getElementById("weather-info");
        const temp = data.main.temp;
        const humidity = data.main.humidity;
        const windSpeed = data.wind.speed;
        weatherInfo.innerHTML = `
            <p>Temperature: ${temp} &#8451;</p>
            <p>Humidity: ${humidity}%</p>
            <p>Wind Speed: ${windSpeed} m/s</p>
        `;
    })
    .catch(error => console.error(error));
