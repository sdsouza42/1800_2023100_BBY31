// @author Felix
// used to get weather API display on alerts.html

// weather forecast API
fetch("https://api.openweathermap.org/data/2.5/forecast?q=Vancouver&units=metric&appid=81572cf71c6ecc82b6b56e2063b640fe") //5day forecast, 16 day forecast need to pay
  // converts the response into a JSON object that can be more easily worked with in JavaScript
  .then(response => response.json())
  // specifies a callback function to be executed when the data is successfully retrieved. The retrieved data contains a list of forecast entries
  .then(data => {
    // assigns the forecast entries to a constant variable forecast for easier access
    const forecast = data.list;
    // console.log(forecast);
    // creates a new Date object with the current date and time, which will be used to compare with the forecast entries to find the next forecast for each day
    const now = new Date();
    // initializes a counter variable that will be used to keep track of which day of the week we are currently processing
    let dayCounter = 0;
    // iterates through each day of the week (i.e., seven days) to find the next forecast entry for that day
    for (let i = 0; i < 7; i++) {
      // uses the find() method to search through the forecast entries to find the next forecast entry for the current day of the week. 
      // The find() method takes a callback function that returns true when the next forecast entry for the current day is found.
      
      const nextDayForecast = forecast.find(entry => {
        const entryDate = new Date(entry.dt_txt);
        let day = now.getDate() + i;
        // console.log(day);

        // check if end of the month and need to adjust next dates
        const month = now.getMonth();
        // for months with 31 days, months start at 0
        if ([0, 2, 4, 6, 7, 9, 11].includes(month)) {
          switch(day) {
            case 32: day = 1; break;
            case 33: day = 2; break;
            case 34: day = 3; break;
            case 35: day = 4; break;
            case 36: day = 5; break;
            case 37: day = 6; break;
            case 38: day = 7; break;
          }
        }
        // for months with 30 days, months start at 0
        else if ([3, 5, 8, 10].includes(month)) {
          switch(day) {
            case 31: day = 1; break;
            case 32: day = 2; break;
            case 33: day = 3; break;
            case 34: day = 4; break;
            case 35: day = 5; break;
            case 36: day = 6; break;
            case 37: day = 7; break;
          }
        }
        // for february, currently not coded to handle leap years to save time
        else if (month == 2) {
          switch(day) {
            case 29: day = 1; break;
            case 30: day = 2; break;
            case 31: day = 3; break;
            case 32: day = 4; break;
            case 33: day = 5; break;
            case 34: day = 6; break;
            case 35: day = 7; break;
          }
        }

        // console.log("entryDate.getDate():" + entryDate.getDate() + " && " + "day:" + day);
        // console.log("entryDate.getHours():" + entryDate.getHours());
        // console.log((entryDate.getDate() === day) + " && " + (entryDate.getHours() === 12));
        // console.log(entryDate.getDate() === day + i && entryDate.getHours() === 12);

        return entryDate.getDate() === day && entryDate.getHours() === 12;
      });

      // console.log(nextDayForecast);

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
