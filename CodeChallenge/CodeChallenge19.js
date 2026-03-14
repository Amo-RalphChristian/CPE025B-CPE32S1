function getWeather(cities, info = 'all') {
  // Make sure cities is an array so we can easily loop through it
  let cityArray = Array.isArray(cities) ? cities : [cities];
  let promises = [];

  for (let i = 0; i < cityArray.length; i++) {
    let city = cityArray[i];
    let url = `http://localhost:3000/weather?city=${city}`;
    
    if (info !== 'all') {
      url += `&info=${info}`;
    }

    let fetchPromise = fetch(url)
      .then(function(response) {
        return response.json();
      })
      .then(function(data) {
        console.log(`CITY: ${data.city}`);
        
        if (data.weather) {
          if (data.weather.wind) {
            console.log(`WIND: ${data.weather.wind.speed} m/s, ${data.weather.wind.deg} deg`);
            if (data.weather.wind.speed > 15) {
              console.log("WARNING! Wind speed over 15 m/s");
            }
          }
          if (data.weather.clouds !== undefined) {
            console.log(`CLOUDS: ${data.weather.clouds} %`);
          }
          if (data.weather.temp !== undefined) {
            console.log(`TEMP: ${data.weather.temp} C`);
            if (data.weather.temp < -20) {
              console.log("WARNING! Temperature below -20 degrees");
            }
          }
          if (data.weather.precipitation !== undefined) {
            console.log(`PRECIPITATION: ${data.weather.precipitation} %`);
          }
        }
        console.log(""); // Empty line for better readability
      })
      .catch(function(error) {
        // Fallback just in case the server is offline or fails
        console.log(`Error fetching data for ${city}: ${error.message}`);
      });

    promises.push(fetchPromise);
  }

  // Return all promises so we can track when everything finishes
  return Promise.all(promises);
}

// Test code provided in the scenario
let weather1 = getWeather('Berlin', 'wind');

let weather2 = getWeather(['Oslo', 'Yakutsk'], 'all');