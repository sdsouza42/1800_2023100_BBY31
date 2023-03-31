// use API to git list of triggers such as temperature and time of year
// two types of alertTriggers: 1. weather API forecast event based. 2. time/date of year based

const alertTriggers = [];  // populate this with strings of triggers

// weather forecast API -> get data of the next 7 days
fetch("https://api.openweathermap.org/data/2.5/forecast?q=Vancouver&units=metric&appid=81572cf71c6ecc82b6b56e2063b640fe")
  // converts the response into a JSON object that can be more easily worked with in JavaScript
  .then(response => response.json())
  // specifies a callback function to be executed when the data is successfully retrieved. The retrieved data contains a list of forecast entries
  .then(data => {
    // assigns the forecast entries to a constant variable forecast for easier access
    const forecast = data.list;

    // creates a new Date object with the current date and time, which will be used to compare with the forecast entries to find the next forecast for each day
    const now = new Date();
    // console.log("now: " + now);

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

      console.log(nextDayForecast);

      // If we found a forecast entry for the day
      if (nextDayForecast) {

        // ALL THE CONDITIONS TO CHECK TO TRIGGER ALERTS

        // creates a new Date object for the forecast entry's date and time
        const temperature = Math.round(nextDayForecast.main.temp);      
        // console.log("Temperature: " + temperature);
        
            // if the temperature forecast is below 0C trigger adding "alertFreeze" string to alertTriggers list
            if (temperature < 0 || true) {  // added OR true statement so it populates for demo
            alertTriggers.push("alertFreeze");
            }

            // if the temperature forecast is above 30C trigger adding "alertHeat" string to alertTriggers list
            if (temperature > 30 || true) {  // added OR true statement so it populates for demo
            alertTriggers.push("alertHeat");
            }

        const pop = forecast.pop;
        // console.log("pop: " + pop);
        const rain = forecast.rain ? forecast.rain["3h"] : 0;    
        // console.log("rain: " + rain);
        // if forecast includes heavy rain fall trigger adding "alertRain" string to alertTriggers list 
        if (pop > 70 || rain > 10 || true) {  // added OR true statement so it populates for demo
            alertTriggers.push("alertRain");
            }

        const wind = forecast.wind;
        console.log(wind);
        // if forecast includes strong winds fall trigger adding "alertWind" string to alertTriggers list 
        if (wind && wind.speed > 10 || true) {  // added OR true statement so it populates for demo
            alertTriggers.push("alertWind");
            }
        
        // Check if we are close to winter
        // const monthToday = new Date().getMonth();
        // if (monthToday > 8 || true) {  // added OR true statement so it populates for demo
        //   alertTriggers.push("alertWinter");
        // }

      }
    }
    createAlertsPlaceholders() // calls next function
  })
  .catch(error => console.error(error));



// determine number of alerts needed to display = number of placeholders need to create
function createAlertsPlaceholders() {
    let alertsPlaceholder = "";
    for (let alert of alertTriggers) {
        // after iterating through list of alertTriggers, add each one to the placeholder html
        alertsPlaceholder += `<div id="${alert}Placeholder" class="alertPlaceholder"></div>`; 
    }

    // load individual placeholders inside main weatherAlertPlaceholder
    document.getElementById("weatherAlertPlaceholder").innerHTML = alertsPlaceholder;
    
    replaceAlertsPlaceholders() // calls next function
}


// replace each placeholder with the actual alert
function replaceAlertsPlaceholders() {
    // Loop through each placeholder element
    for (let alert of alertTriggers) {
        $.ajax({
            url: '/html/alerts/' + alert + '.html',
            success: function(data) {
              $('#'+alert+'Placeholder').html(data);
            }
          });   
    }
    prepTipsPage(); // calls next function
}

// if there are no triggers, then display a none display
function diplayNone() {
    if (alertTriggers.length == 0) {
        $.ajax({
            url: '/html/alerts/alertNone.html',
            success: function(data) {
                document.getElementById("weatherAlertPlaceholder").innerHTML = data;
            }
        });
    }
}

// add event listeners to the tip buttons
function prepTipsPage() {
  // Get all the buttons with class="tip"
  const tipButtons = document.querySelectorAll('button.buttonForTip');

  // Add an event listener to each tip button
  tipButtons.forEach(button => {
    button.addEventListener('click', function() {
      
      // Get the ID of the button's parent element
      const buttonId = button.parentNode.id;

      // Set the URL for the redirect
      const url = `/html/tips.html`;

      // Push the button ID to local storage
      localStorage.setItem('buttonId', buttonId);

      // Redirect to the new URL
      window.location.href = url;
    });
  });
}


