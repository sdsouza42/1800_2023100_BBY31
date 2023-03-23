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
      // If we found a forecast entry for the day
      if (nextDayForecast) {

        // ALL THE CONDITIONS TO CHECK TO TRIGGER ALERTS

        // creates a new Date object for the forecast entry's date and time
        const temperature = Math.round(nextDayForecast.main.temp);      
        
        // Check if the temperature is below 0 degrees celsius trigger adding "alertFreeze" string to alertTriggers list
        if (temperature < 0 || true) {  // added OR true statement so it populates for demo
          alertTriggers.push("alertFreeze");
        }

        // Check if the temperature is above 30 degrees celsius to trigger adding "alertHeat" string to alertTriggers list
        if (temperature > 30 || true) {  // added OR true statement so it populates for demo
          alertTriggers.push("alertHeat");
        }

        
        // Check if we are close to winter
        const monthToday = new Date().getMonth();
        if (monthToday > 8 || true) {  // added OR true statement so it populates for demo
          alertTriggers.push("alertWinter");
        }

      }
    }
  })
  .catch(error => console.error(error));



// determine number of alerts needed to display = number of placeholders need to create
setTimeout(function() {  // delay function to give time for API to populate triggers
    let alertsPlaceholder = "";
    for (let alert of alertTriggers) {
        // after iterating through list of alertTriggers, add each one to the placeholder html
        alertsPlaceholder += `<div id="${alert}Placeholder" class="alertPlaceholder"></div>`; 
    }

    // load individual placeholders inside main weatherAlertPlaceholder
    document.getElementById("weatherAlertPlaceholder").innerHTML = alertsPlaceholder;
    // $("#weatherAlertPlaceholder").html(alertsPlaceholder);
}, 400)


// replace each placeholder with the actual alert
setTimeout(function() {  // delay function to give time for placeholders to load in

    // Loop through each placeholder element
    for (let alert of alertTriggers) {
        $.ajax({
            url: '/html/alerts/' + alert + '.html',
            success: function(data) {
              $('#'+alert+'Placeholder').html(data);
            }
          });   
    }
}, 800)

// if there are no triggers, then display a none display
setTimeout(function() {  // delay function to give time for placeholders to load in
    if (alertTriggers.length == 0) {
        $.ajax({
            url: '/html/alerts/alertNone.html',
            success: function(data) {
                document.getElementById("weatherAlertPlaceholder").innerHTML = data;
            }
        });
    }
}, 800)

