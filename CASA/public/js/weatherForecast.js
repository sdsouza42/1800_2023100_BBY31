// weather forecast API
fetch("https://api.openweathermap.org/data/2.5/forecast?q=Vancouver&units=metric&appid=81572cf71c6ecc82b6b56e2063b640fe")
  // converts the response into a JSON object that can be more easily worked with in JavaScript
  .then(response => response.json())
  // specifies a callback function to be executed when the data is successfully retrieved. The retrieved data contains a list of forecast entries
  .then(data => {
    // assigns the forecast entries to a constant variable forecast for easier access
    const forecast = data.list;
    // creates a new Date object with the current date and time, which will be used to compare with the forecast entries to find the next forecast for each day
    const now = new Date();
    // initializes a counter variable that will be used to keep track of which day of the week we are currently processing
    let dayCounter = 0;
    // iterates through each day of the week (i.e., seven days) to find the next forecast entry for that day
    for (let i = 1; i <= 7; i++) {
      // uses the find() method to search through the forecast entries to find the next forecast entry for the current day of the week. 
      // The find() method takes a callback function that returns true when the next forecast entry for the current day is found.
      const nextDayForecast = forecast.find(entry => {
        const entryDate = new Date(entry.dt_txt);
        return entryDate.getDate() === now.getDate() + i && entryDate.getHours() === 12;
      });
      // If we found a forecast entry for the day, update the corresponding table cells with the day, date, and temperature
      if (nextDayForecast) {
        // creates a new Date object for the forecast entry's date and time
        const date = new Date(nextDayForecast.dt_txt);
        const day = date.toLocaleDateString('en-CA', {weekday: 'short'});
        const month = date.toLocaleDateString('en-CA', {month: 'short'});
        const dayOfMonth = date.toLocaleDateString('en-CA', {day: 'numeric'});
        const temperature = Math.round(nextDayForecast.main.temp);
        const forecast = nextDayForecast.weather[0].description;
        const icon = `https://openweathermap.org/img/wn/${nextDayForecast.weather[0].icon}.png`;
        // updates the table cell for the day of the week and date with the formatted date and time.
        document.getElementById(`day${dayCounter + 1}-date`).textContent = `${day}, ${month} ${dayOfMonth}`;
        // updates the table cell for the weather forecast with the weather icon image and the forecast description.
        document.getElementById(`day${dayCounter + 1}`).innerHTML = `<img src="${icon}" alt="${forecast}"><br>${forecast}<br>${temperature} °C`;
        // adds a title attribute to the table cell for the weather forecast with the forecast description, which will be displayed as a tooltip when the user hovers over the cell
        document.getElementById(`day${dayCounter + 1}`).setAttribute('title', forecast);
        document.getElementById(`day${dayCounter + 1}`).setAttribute('aria-label', `${day}'s weather forecast is ${forecast}, with a temperature of ${temperature} degrees Celsius`);
        dayCounter++;
      }
    }
  })
  .catch(error => console.error(error));
// console.log("Weather forecast API loaded successfully.");


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
