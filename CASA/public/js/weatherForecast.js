const apikey = "81572cf71c6ecc82b6b56e2063b640fe";
const url = `https://api.openweathermap.org/data/2.5/forecast?q=Vancouver&units=metric&appid=${apikey}`;

fetch(url)
  .then(response => response.json())
  .then(data => {
    const forecast = data.list;
    const now = new Date();
    let dayCounter = 0;
    // Iterate through each day of the week and find the next forecast entry for that day
    for (let i = 1; i <= 7; i++) {
      const nextDayForecast = forecast.find(entry => {
        const entryDate = new Date(entry.dt_txt);
        return entryDate.getDate() === now.getDate() + i && entryDate.getHours() === 12;
      });
      // If we found a forecast entry for the day, update the corresponding table cells with the day and date
      if (nextDayForecast) {
        const date = new Date(nextDayForecast.dt_txt);
        const day = date.toLocaleDateString('en-US', {weekday: 'short'});
        const month = date.toLocaleDateString('en-US', {month: 'short'});
        const dayOfMonth = date.toLocaleDateString('en-US', {day: 'numeric'});
        const forecast = nextDayForecast.weather[0].description;
        const icon = `https://openweathermap.org/img/wn/${nextDayForecast.weather[0].icon}.png`;
        document.getElementById(`day${dayCounter + 1}-date`).textContent = `${day}, ${month} ${dayOfMonth}`;
        document.getElementById(`day${dayCounter + 1}`).innerHTML = `<img src="${icon}" alt="${forecast}"><br>${forecast}`;
        document.getElementById(`day${dayCounter + 1}`).setAttribute('title', forecast);
        document.getElementById(`day${dayCounter + 1}`).setAttribute('aria-label', `${day}'s weather forecast is ${forecast}`);
        dayCounter++;
      }
    }
  })
  .catch(error => console.error(error));

console.log("Weather forecast API loaded successfully.");


// fetch('https://api.openweathermap.org/data/2.5/forecast?q=Vancouver&units=metric&appid=81572cf71c6ecc82b6b56e2063b640fe')
//   .then(response => response.json())
//   .then(data => {
//     // Process the weather data and update the HTML
//     const forecast = data.list.filter(item => item.dt_txt.includes('12:00:00'));
//     const table = document.createElement('table');
//     const tbody = document.createElement('tbody');
//     forecast.forEach(item => {
//       const tr = document.createElement('tr');
//       const dateTd = document.createElement('td');
//       const tempTd = document.createElement('td');
//       const conditionsTd = document.createElement('td');
//       dateTd.innerText = new Date(item.dt * 1000).toLocaleDateString();
//       tempTd.innerText = `${item.main.temp}°C`;
//       conditionsTd.innerText = item.weather[0].description;
//       tr.appendChild(dateTd);
//       tr.appendChild(tempTd);
//       tr.appendChild(conditionsTd);
//       tbody.appendChild(tr);
//     });
//     table.appendChild(tbody);
//     document.getElementById('forecast-container').appendChild(table);
//     console.log("Weather API ran successfully.")
//   });



// // Replace YOUR_API_KEY with your actual API key
// const apiKey = "YOUR_API_KEY";
// // Replace CITY_NAME with the city for which you want weather information
// const apiUrl = `https://api.openweathermap.org/data/2.5/weather?q=CITY_NAME&appid=${apiKey}`;

// fetch(apiUrl)
//     .then(response => response.json())
//     .then(data => {
//         const weatherInfo = document.getElementById("weather-info");
//         const temp = data.main.temp;
//         const humidity = data.main.humidity;
//         const windSpeed = data.wind.speed;
//         weatherInfo.innerHTML = `
//             <p>Temperature: ${temp} &#8451;</p>
//             <p>Humidity: ${humidity}%</p>
//             <p>Wind Speed: ${windSpeed} m/s</p>
//         `; 
//     })
//     .catch(error => console.error(error));


// const apiKey = 'YOUR_API_KEY';
// const apiUrl = `https://dd.weather.gc.ca/citypage_weather/v1/forecast7days/${citycode}_metric.json?appkey=${apiKey}`;

// // bc-74 is citycode for YVR

// fetch(apiUrl)
// 	.then(response => response.json())
// 	.then(data => {
// 		const weatherContainer = document.getElementById('forecast-container');
// 		const forecast = data.forecasts;

// 		let html = '';

// 		forecast.forEach(day => {
// 			html += `
// 				<div>
// 					<h3>${day.date}</h3>
// 					<p>${day.temperature} &#8451;</p> //&#8451 = celcius 
// 					<p>${day.short_desc}</p>
// 				</div>
// 			`;
// 		});

// 		weatherContainer.innerHTML = html;
// 	})
// 	.catch(error => console.error(error));
