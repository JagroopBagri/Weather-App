// Weather App 

// Main function
function startApp(){
    // search bar 
    const searchBar = document.querySelector('#location');
    // todays description div
    const todaysDescriptionDiv = document.querySelector('.brief-description');
    // todays temp div
    const todaysTempDiv = document.querySelector('.todays-temp');
    // min and max temp div
    const minMaxDiv = document.querySelector(".todays-min-max");
    // wind data div
    const windDataDiv = document.querySelector(".wind-data-text");
    // humidity level div
    const humidityDiv = document.querySelector(".humidity-data-text");
    // chance of rain div
    const chanceOfRainDiv = document.querySelector(".rain-data-text");
    // tomorrow min-max div
    const tomMinMaxDiv = document.querySelector(".day1-min-max");
    // day 2 min-max div
    const day2MinMaxDiv = document.querySelector(".day2-min-max");
    // day 3 min-max div
    const day3MinMaxDiv = document.querySelector(".day3-min-max");
    // day 4 min-max div
    const day4MinMaxDiv = document.querySelector(".day4-min-max");
    // function that retrieves weather data and appends it to the DOM
    const getAndAppendWeatherInfo = async function(){
        // Attempt to fetch data 
        try{
            // retrieve data from API
            const response = await fetch(`https://api.openweathermap.org/data/2.5/weather?q=${searchBar.value}&units=imperial&appid=dbb4032d6b4dd101b94f20c0de6f3e12`, {mode: "cors"});
            // convert data to JSON format
            const weatherData = await response.json();
            // longitude of location
            const longitude = weatherData.coord.lon;
            const latitude = weatherData.coord.lat;
            // retrieve 5 day forecast weather data
            const forecastResponse = await fetch(`https://api.openweathermap.org/data/2.5/onecall?lat=${latitude}&lon=${longitude}&exclude=minutely,hourly&units=imperial&appid=dbb4032d6b4dd101b94f20c0de6f3e12`, {mode: "cors"});
            // convert forecast response to JSON
            const forecastData = await forecastResponse.json();
            // probability of precipitation
            const probablityOfRain = forecastData.daily[0].pop;
            // append probability of precipitation
            chanceOfRainDiv.textContent = Math.round(probablityOfRain * 100) + '%';
            console.log(weatherData);
            // weather description
            const weatherDescription = weatherData.weather[0].description;
            // append weather description
            todaysDescriptionDiv.textContent = weatherDescription;
            // current temp
            const weatherTemp = weatherData.main.temp;
            // append current temp (round the temp and add degree symbol)
            todaysTempDiv.textContent = Math.round(weatherTemp) + "°";
            // min and max temp
            const minTemp = weatherData.main.temp_min;
            const maxTemp = weatherData.main.temp_max;
            // append min and max temps to DOM (round the temp and add degree symbol)
            minMaxDiv.textContent = Math.round(minTemp) + "°" + " / " + Math.round(maxTemp) + "°";
            // wind speed
            const windSpeed = Math.round(weatherData.wind.speed);
            // append wind speed
            windDataDiv.textContent = windSpeed + " mph";
            // humidity level
            const humidityLevel = weatherData.main.humidity;
            // append humidity
            humidityDiv.textContent = Math.round(humidityLevel) + "%";
            console.log(forecastData);
            
            // 4 day forecast 
        
            // tomorrows min-max
            const tomMinMax = Math.round(forecastData.daily[1].temp.min) + "°" + " / " + Math.round(forecastData.daily[1].temp.max) + "°";
            // append tomorrows min-max
            tomMinMaxDiv.textContent = tomMinMax;
            // day2 min-max
            const day2MinMax = Math.round(forecastData.daily[2].temp.min) + "°" + " / " + Math.round(forecastData.daily[2].temp.max) + "°";
            // append day2 min-max
            day2MinMaxDiv.textContent = day2MinMax;
            // day3 min-max
            const day3MinMax = Math.round(forecastData.daily[3].temp.min) + "°" + " / " + Math.round(forecastData.daily[3].temp.max) + "°";
            // append day3 min-max
            day3MinMaxDiv.textContent = day3MinMax;
            // day4 min-max
            const day4MinMax = Math.round(forecastData.daily[4].temp.min) + "°" + " / " + Math.round(forecastData.daily[4].temp.max) + "°";
            // append day4 min-max
            day4MinMaxDiv.textContent = day4MinMax;
        // if any error occurs along the way then log the error
        } catch(error){
            console.error(error);
        }
    };
    getAndAppendWeatherInfo();
}
startApp();
