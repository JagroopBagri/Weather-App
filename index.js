// Weather App 

// Main function
function startApp(){
    // DOM variables

    // search bar 
    const searchBar = document.querySelector('#location');
    // search button
    const searchButton = document.querySelector('.searchButton');
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
    // day 2 name div
    const day2NameDiv = document.querySelector(".day2-date");
    // day 3 name div
    const day3NameDiv = document.querySelector(".day3-date");
    // day 4 name div
    const day4NameDiv = document.querySelector(".day4-date");
    // todays weather icon
    const mainWeatherIcon = document.querySelector(".todays-weather-icon");
    // tomorrows weather icon
    const tomWeatherIcon = document.querySelector(".day1image");
    // day2 weather icon
    const day2WeatherIcon = document.querySelector(".day2image");
    // day3 weather icon
    const day3WeatherIcon = document.querySelector(".day3image");
    // day4 weather icon
    const day4WeatherIcon = document.querySelector(".day4image");
    // fahrenheit div
    const fahrenheitDiv = document.querySelector('.fahrenheit');
    // celsius div
    const celsiusDiv = document.querySelector('.celsius');
    // retrieve location from localStorage
    let storedInput = localStorage.getItem('location');
    // retrieve temp format from localstorage
    let storedConversion = localStorage.getItem('conversion');
    // variable that shows user selection for imperial vs metric data
    let imperial;
    if(storedConversion){
        imperial = storedConversion;
    }
    else{
        imperial = 'true';
    }

    // function that retrieves weather data and appends it to the DOM in imperial format
    const getAndAppendWeatherInfoImperial = async function(){
   
        // Attempt to fetch data 
        try{
            storedInput = localStorage.getItem('location');
            // make location last stored input
            if(storedInput && searchBar.value === ''){
                searchBar.value = storedInput;
            }
            // check to see if searchbar has a value
            else if(searchBar.value === '' || searchBar.value === undefined){
                searchBar.value = "San Francisco";
            }
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

            // save location to local storage
            localStorage.setItem('location', searchBar.value);

            // probability of precipitation
            const probablityOfRain = forecastData.daily[0].pop;
            // append probability of precipitation
            chanceOfRainDiv.textContent = Math.round(probablityOfRain * 100) + '%';
            console.log(weatherData);


            // main weather description 
            const mainWeatherDescription = weatherData.weather[0].main;
            const mainDetailedDescriptionID = weatherData.weather[0].id;

            //Change location name to proper capitalization in case the user didn't
            let words = searchBar.value.split(" ");
            // get capitalized location from IIFE
            let capitalizedLocation = (function(){
                let location = '';
                words.forEach(word => {
                let w = ' '+ word[0].toUpperCase() + word.substr(1);
                location += w;
                })
                return location;
            })();
            // function that appends weather description
            const appendCurrentWeatherDescription = function(){
                let description = "it's clear.";
                if(mainWeatherDescription === "Clear"){
                    description = "the sky is clear.";
                }
                else if (mainDetailedDescriptionID  === 801 || mainDetailedDescriptionID  === 802){
                    description = "the sky is slightly cloudy.";
                }
                else if (mainDetailedDescriptionID  === 803){
                    description = "the sky is cloudy.";
                }
                else if (mainDetailedDescriptionID  === 804){
                    description = "the sky is overcast.";
                }
                else if (mainWeatherDescription === "Rain"){
                    description = "it's raining.";
                }
                else if (mainWeatherDescription === "Mist"){
                    description = "it's misty.";
                }
                else if (mainWeatherDescription === "Drizzle"){
                    description = "there's light rain.";
                }
                else if (mainWeatherDescription === "Thunderstorm"){
                    description = "there's a thunderstorm.";
                }
                else if (mainWeatherDescription === "Snow"){
                    description = "it's snowing.";
                }
            // append weather description
            todaysDescriptionDiv.textContent = `Currently in${capitalizedLocation}, ${description}`;
            };
            // invoke appendCurrentWeatherDesciption function
            appendCurrentWeatherDescription();

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
            const windSpeed = Math.round(weatherData.wind.speed * 10)/ 10;
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

            // function to get current day name
            let getDay = function(num){
                let currentDate = new Date();
                let currentDay = currentDate.getDate();
                let x = currentDate.setDate(currentDay + num);
                let y = new Date(x).getDay();
                let daysOfTheWeek = ['SUN', 'MON', 'TUE', 'WED', 'THU', 'FRI', 'SAT'];
                return daysOfTheWeek[y];
            }
            // append forecast day names
            day2NameDiv.textContent = getDay(2);
            day3NameDiv.textContent = getDay(3);
            day4NameDiv.textContent = getDay(4);
            
            // retrieve time information in order to display correct icons
            // get sunrise hour
            let sunriseTime = (new Date(forecastData.current.sunrise * 1000)).toLocaleString("en-US", {timeZone: forecastData.timezone, hour: 'numeric', hour12: false});
            // get sunset hour
            let sunsetTime = (new Date(forecastData.current.sunset * 1000)).toLocaleString("en-US", {timeZone: forecastData.timezone, hour: 'numeric', hour12: false});
            // current time in location timezone
            let currentLocationTime = new Date().toLocaleString("en-US", {timeZone: forecastData.timezone, hour: 'numeric', hour12: false});
            // variable that displays whether it is night time or day time
            let dayTime = true;
            // function that updates whether it is day time or night time variable
            const checkDayOrNight = function(){
                if(currentLocationTime > sunriseTime && currentLocationTime < sunsetTime){
                    dayTime = true;
                }
                else{
                    dayTime = false;
                }
                return dayTime;
            };
            // invoke check day or night time function
            checkDayOrNight();

            // retrieve current weather condition id number
            const currentWeatherConditionID = forecastData.current.weather[0].id;
            // function that appends correct weather icon to current day
            const appendMainIcon = function(){
                if (currentWeatherConditionID > 199 && currentWeatherConditionID < 234){
                    mainWeatherIcon.src = "images/storm.png";
                }
                else if (currentWeatherConditionID > 299 && currentWeatherConditionID < 322){
                    mainWeatherIcon.src = "images/rain.png";
                }
                else if (currentWeatherConditionID === 502 || currentWeatherConditionID === 503 || currentWeatherConditionID === 504){
                    mainWeatherIcon.src = "images/downpour.png";
                }
                else if (currentWeatherConditionID > 499 && currentWeatherConditionID < 532){
                    mainWeatherIcon.src = "images/rain.png";
                }
                else if (currentWeatherConditionID > 599 && currentWeatherConditionID < 623){
                    mainWeatherIcon.src = "images/snow.png";
                }
                else if (currentWeatherConditionID  === 804){
                    mainWeatherIcon.src = "images/overcast.png";
                }
                else if (currentWeatherConditionID > 800){
                    if(dayTime){
                        mainWeatherIcon.src = "images/day-cloudy.png";
                    }
                    else{
                        mainWeatherIcon.src = "images/night-cloudy.png";
                        }
                }
                else{
                    if(dayTime){
                        mainWeatherIcon.src = "images/sunny.png";
                        }
                        else{
                        mainWeatherIcon.src = "images/night.png";
                        }
                }
            };
            // invoke appendMainIcon function
            appendMainIcon();

            // retrieve tomorrows weather condition id number
            const tomWeatherConditionID = forecastData.daily[1].weather[0].id;
            // function that appends correct weather icon to next day
            const appendTomIcon = function(){
                if (tomWeatherConditionID > 199 && tomWeatherConditionID < 234){
                    tomWeatherIcon.src = "images/storm.png";
                }
                else if (tomWeatherConditionID > 299 && tomWeatherConditionID < 322){
                    tomWeatherIcon.src = "images/rain.png";
                }
                else if (tomWeatherConditionID === 502 || tomWeatherConditionID === 503 || tomWeatherConditionID === 504){
                    tomWeatherIcon.src = "images/downpour.png";
                }
                else if (tomWeatherConditionID > 499 && tomWeatherConditionID < 532){
                    tomWeatherIcon.src = "images/rain.png";
                }
                else if (tomWeatherConditionID > 599 && tomWeatherConditionID < 623){
                    tomWeatherIcon.src = "images/snow.png";
                }
                else if (tomWeatherConditionID === 804){
                    tomWeatherIcon.src = "images/overcast.png";
                }
                else if (tomWeatherConditionID > 800){
                        tomWeatherIcon.src = "images/day-cloudy.png";
                }
                else{
                        tomWeatherIcon.src = "images/sunny.png";
                }
            };
            // invoke appendTomIcon function
            appendTomIcon();

            // retrieve day2 weather condition id number
            const day2WeatherConditionID = forecastData.daily[2].weather[0].id;
            // function that appends correct weather icon to next day
            const appendDay2Icon = function(){
                if (day2WeatherConditionID > 199 && day2WeatherConditionID < 234){
                    day2WeatherIcon.src = "images/storm.png";
                }
                else if (day2WeatherConditionID > 299 && day2WeatherConditionID < 322){
                    day2WeatherIcon.src = "images/rain.png";
                }
                else if (day2WeatherConditionID === 502 || day2WeatherConditionID === 503 || day2WeatherConditionID === 504){
                    day2WeatherIcon.src = "images/downpour.png";
                }
                else if (day2WeatherConditionID > 499 && day2WeatherConditionID < 532){
                    day2WeatherIcon.src = "images/rain.png";
                }
                else if (day2WeatherConditionID > 599 && day2WeatherConditionID < 623){
                    day2WeatherIcon.src = "images/snow.png";
                }
                else if (day2WeatherConditionID === 804){
                    day2WeatherIcon.src = "images/overcast.png";
                }
                else if (day2WeatherConditionID > 800){
                    day2WeatherIcon.src = "images/day-cloudy.png";
                }
                else{
                    day2WeatherIcon.src = "images/sunny.png";
                }
            };
            // invoke appendDay2Icon function
            appendDay2Icon();   

            // retrieve day3 weather condition id number
            const day3WeatherConditionID = forecastData.daily[3].weather[0].id;
            // function that appends correct weather icon to next day
            const appendDay3Icon = function(){
                if (day3WeatherConditionID > 199 && day3WeatherConditionID < 234){
                    day3WeatherIcon.src = "images/storm.png";
                }
                else if (day3WeatherConditionID > 299 && day3WeatherConditionID < 322){
                    day3WeatherIcon.src = "images/rain.png";
                }
                else if (day3WeatherConditionID === 502 || day3WeatherConditionID === 503 || day3WeatherConditionID === 504){
                    day3WeatherIcon.src = "images/downpour.png";
                }
                else if (day3WeatherConditionID > 499 && day3WeatherConditionID < 532){
                    day3WeatherIcon.src = "images/rain.png";
                }
                else if (day3WeatherConditionID > 599 && day3WeatherConditionID < 623){
                    day3WeatherIcon.src = "images/snow.png";
                }
                else if (day3WeatherConditionID === 804){
                    day3WeatherIcon.src = "images/overcast.png";
                }
                else if (day3WeatherConditionID > 800){
                    day3WeatherIcon.src = "images/day-cloudy.png";
                }
                else{
                    day3WeatherIcon.src = "images/sunny.png";
                }
            };
            // invoke appendDay3Icon function
            appendDay3Icon();   

            // retrieve day4 weather condition id number
            const day4WeatherConditionID = forecastData.daily[4].weather[0].id;
            // function that appends correct weather icon to next day
            const appendDay4Icon = function(){
                if (day4WeatherConditionID > 199 && day4WeatherConditionID < 234){
                    day4WeatherIcon.src = "images/storm.png";
                }
                else if (day4WeatherConditionID > 299 && day4WeatherConditionID < 322){
                    day4WeatherIcon.src = "images/rain.png";
                }
                else if (day4WeatherConditionID === 502 || day4WeatherConditionID === 503 || day4WeatherConditionID === 504){
                    day4WeatherIcon.src = "images/downpour.png";
                }
                else if (day4WeatherConditionID > 499 && day4WeatherConditionID < 532){
                    day4WeatherIcon.src = "images/rain.png";
                }
                else if (day4WeatherConditionID > 599 && day4WeatherConditionID < 623){
                    day4WeatherIcon.src = "images/snow.png";
                }
                else if (day4WeatherConditionID === 804){
                    day4WeatherIcon.src = "images/overcast.png";
                }
                else if (day4WeatherConditionID > 800){
                    day4WeatherIcon.src = "images/day-cloudy.png";

                }
                else{
                    day4WeatherIcon.src = "images/sunny.png";
                }
            };
            // invoke appendDay4Icon function
            appendDay4Icon();   

            //clear searchbar
            searchBar.value = '';

        // if any error occurs along the way then log the error
        } catch(error){
            alert('Location not found. Search must be in the form of "City", "City, State" or "City, Country".');
            console.error(error);
        }
    };

    // function that retrieves weather data and appends it to the DOM in imperial format
    const getAndAppendWeatherInfoMetric = async function(){
   
        // Attempt to fetch data 
        try{
            storedInput = localStorage.getItem('location');
            // make location last stored input
            if(storedInput && searchBar.value === ''){
                searchBar.value = storedInput;
            }
            // check to see if searchbar has a value
            else if(searchBar.value === '' || searchBar.value === undefined){
                searchBar.value = "San Francisco";
            }
            // retrieve data from API
            const response = await fetch(`https://api.openweathermap.org/data/2.5/weather?q=${searchBar.value}&units=metric&appid=dbb4032d6b4dd101b94f20c0de6f3e12`, {mode: "cors"});
            // convert data to JSON format
            const weatherData = await response.json();
            // longitude of location
            const longitude = weatherData.coord.lon;
            const latitude = weatherData.coord.lat;
            // retrieve 5 day forecast weather data
            const forecastResponse = await fetch(`https://api.openweathermap.org/data/2.5/onecall?lat=${latitude}&lon=${longitude}&exclude=minutely,hourly&units=metric&appid=dbb4032d6b4dd101b94f20c0de6f3e12`, {mode: "cors"});
            // convert forecast response to JSON
            const forecastData = await forecastResponse.json();

            // save location to local storage
            localStorage.setItem('location', searchBar.value);

            // probability of precipitation
            const probablityOfRain = forecastData.daily[0].pop;
            // append probability of precipitation
            chanceOfRainDiv.textContent = Math.round(probablityOfRain * 100) + '%';
            console.log(weatherData);


            // main weather description 
            const mainWeatherDescription = weatherData.weather[0].main;
            const mainDetailedDescriptionID = weatherData.weather[0].id;

            //Change location name to proper capitalization in case the user didn't
            let words = searchBar.value.split(" ");
            // get capitalized location from IIFE
            let capitalizedLocation = (function(){
                let location = '';
                words.forEach(word => {
                let w = ' '+ word[0].toUpperCase() + word.substr(1);
                location += w;
                })
                return location;
            })();
            // function that appends weather description
            const appendCurrentWeatherDescription = function(){
                let description = "it's clear.";
                if(mainWeatherDescription === "Clear"){
                    description = "the sky is clear.";
                }
                else if (mainDetailedDescriptionID  === 801 || mainDetailedDescriptionID  === 802){
                    description = "the sky is slightly cloudy.";
                }
                else if (mainDetailedDescriptionID  === 803){
                    description = "the sky is cloudy.";
                }
                else if (mainDetailedDescriptionID  === 804){
                    description = "the sky is overcast.";
                }
                else if (mainWeatherDescription === "Rain"){
                    description = "it's raining.";
                }
                else if (mainWeatherDescription === "Mist"){
                    description = "it's misty.";
                }
                else if (mainWeatherDescription === "Drizzle"){
                    description = "there's light rain.";
                }
                else if (mainWeatherDescription === "Thunderstorm"){
                    description = "there's a thunderstorm.";
                }
                else if (mainWeatherDescription === "Snow"){
                    description = "it's snowing.";
                }
            // append weather description
            todaysDescriptionDiv.textContent = `Currently in${capitalizedLocation}, ${description}`;
            };
            // invoke appendCurrentWeatherDesciption function
            appendCurrentWeatherDescription();

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
            const windSpeed = Math.round(weatherData.wind.speed * 10)/10;
            // append wind speed
            windDataDiv.textContent = windSpeed + " m/s";
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

            // function to get current day name
            let getDay = function(num){
                let currentDate = new Date();
                let currentDay = currentDate.getDate();
                let x = currentDate.setDate(currentDay + num);
                let y = new Date(x).getDay();
                let daysOfTheWeek = ['SUN', 'MON', 'TUE', 'WED', 'THU', 'FRI', 'SAT'];
                return daysOfTheWeek[y];
            }
            // append forecast day names
            day2NameDiv.textContent = getDay(2);
            day3NameDiv.textContent = getDay(3);
            day4NameDiv.textContent = getDay(4);
            
            // retrieve time information in order to display correct icons
            // get sunrise hour
            let sunriseTime = (new Date(forecastData.current.sunrise * 1000)).toLocaleString("en-US", {timeZone: forecastData.timezone, hour: 'numeric', hour12: false});
            // get sunset hour
            let sunsetTime = (new Date(forecastData.current.sunset * 1000)).toLocaleString("en-US", {timeZone: forecastData.timezone, hour: 'numeric', hour12: false});
            // current time in location timezone
            let currentLocationTime = new Date().toLocaleString("en-US", {timeZone: forecastData.timezone, hour: 'numeric', hour12: false});
            // variable that displays whether it is night time or day time
            let dayTime = true;
            // function that updates whether it is day time or night time variable
            const checkDayOrNight = function(){
                if(currentLocationTime > sunriseTime && currentLocationTime < sunsetTime){
                    dayTime = true;
                }
                else{
                    dayTime = false;
                }
                return dayTime;
            };
            // invoke check day or night time function
            checkDayOrNight();

            // retrieve current weather condition id number
            const currentWeatherConditionID = forecastData.current.weather[0].id;
            // function that appends correct weather icon to current day
            const appendMainIcon = function(){
                if (currentWeatherConditionID > 199 && currentWeatherConditionID < 234){
                    mainWeatherIcon.src = "images/storm.png";
                }
                else if (currentWeatherConditionID > 299 && currentWeatherConditionID < 322){
                    mainWeatherIcon.src = "images/rain.png";
                }
                else if (currentWeatherConditionID === 502 || currentWeatherConditionID === 503 || currentWeatherConditionID === 504){
                    mainWeatherIcon.src = "images/downpour.png";
                }
                else if (currentWeatherConditionID > 499 && currentWeatherConditionID < 532){
                    mainWeatherIcon.src = "images/rain.png";
                }
                else if (currentWeatherConditionID > 599 && currentWeatherConditionID < 623){
                    mainWeatherIcon.src = "images/snow.png";
                }
                else if (currentWeatherConditionID  === 804){
                    mainWeatherIcon.src = "images/overcast.png";
                }
                else if (currentWeatherConditionID > 800){
                    if(dayTime){
                        mainWeatherIcon.src = "images/day-cloudy.png";
                    }
                    else{
                        mainWeatherIcon.src = "images/night-cloudy.png";
                        }
                }
                else{
                    if(dayTime){
                        mainWeatherIcon.src = "images/sunny.png";
                        }
                        else{
                        mainWeatherIcon.src = "images/night.png";
                        }
                }
            };
            // invoke appendMainIcon function
            appendMainIcon();

            // retrieve tomorrows weather condition id number
            const tomWeatherConditionID = forecastData.daily[1].weather[0].id;
            // function that appends correct weather icon to next day
            const appendTomIcon = function(){
                if (tomWeatherConditionID > 199 && tomWeatherConditionID < 234){
                    tomWeatherIcon.src = "images/storm.png";
                }
                else if (tomWeatherConditionID > 299 && tomWeatherConditionID < 322){
                    tomWeatherIcon.src = "images/rain.png";
                }
                else if (tomWeatherConditionID === 502 || tomWeatherConditionID === 503 || tomWeatherConditionID === 504){
                    tomWeatherIcon.src = "images/downpour.png";
                }
                else if (tomWeatherConditionID > 499 && tomWeatherConditionID < 532){
                    tomWeatherIcon.src = "images/rain.png";
                }
                else if (tomWeatherConditionID > 599 && tomWeatherConditionID < 623){
                    tomWeatherIcon.src = "images/snow.png";
                }
                else if (tomWeatherConditionID === 804){
                    tomWeatherIcon.src = "images/overcast.png";
                }
                else if (tomWeatherConditionID > 800){
                        tomWeatherIcon.src = "images/day-cloudy.png";
                }
                else{
                        tomWeatherIcon.src = "images/sunny.png";
                }
            };
            // invoke appendTomIcon function
            appendTomIcon();

            // retrieve day2 weather condition id number
            const day2WeatherConditionID = forecastData.daily[2].weather[0].id;
            // function that appends correct weather icon to next day
            const appendDay2Icon = function(){
                if (day2WeatherConditionID > 199 && day2WeatherConditionID < 234){
                    day2WeatherIcon.src = "images/storm.png";
                }
                else if (day2WeatherConditionID > 299 && day2WeatherConditionID < 322){
                    day2WeatherIcon.src = "images/rain.png";
                }
                else if (day2WeatherConditionID === 502 || day2WeatherConditionID === 503 || day2WeatherConditionID === 504){
                    day2WeatherIcon.src = "images/downpour.png";
                }
                else if (day2WeatherConditionID > 499 && day2WeatherConditionID < 532){
                    day2WeatherIcon.src = "images/rain.png";
                }
                else if (day2WeatherConditionID > 599 && day2WeatherConditionID < 623){
                    day2WeatherIcon.src = "images/snow.png";
                }
                else if (day2WeatherConditionID === 804){
                    day2WeatherIcon.src = "images/overcast.png";
                }
                else if (day2WeatherConditionID > 800){
                    day2WeatherIcon.src = "images/day-cloudy.png";
                }
                else{
                    day2WeatherIcon.src = "images/sunny.png";
                }
            };
            // invoke appendDay2Icon function
            appendDay2Icon();   

            // retrieve day3 weather condition id number
            const day3WeatherConditionID = forecastData.daily[3].weather[0].id;
            // function that appends correct weather icon to next day
            const appendDay3Icon = function(){
                if (day3WeatherConditionID > 199 && day3WeatherConditionID < 234){
                    day3WeatherIcon.src = "images/storm.png";
                }
                else if (day3WeatherConditionID > 299 && day3WeatherConditionID < 322){
                    day3WeatherIcon.src = "images/rain.png";
                }
                else if (day3WeatherConditionID === 502 || day3WeatherConditionID === 503 || day3WeatherConditionID === 504){
                    day3WeatherIcon.src = "images/downpour.png";
                }
                else if (day3WeatherConditionID > 499 && day3WeatherConditionID < 532){
                    day3WeatherIcon.src = "images/rain.png";
                }
                else if (day3WeatherConditionID > 599 && day3WeatherConditionID < 623){
                    day3WeatherIcon.src = "images/snow.png";
                }
                else if (day3WeatherConditionID === 804){
                    day3WeatherIcon.src = "images/overcast.png";
                }
                else if (day3WeatherConditionID > 800){
                    day3WeatherIcon.src = "images/day-cloudy.png";
                }
                else{
                    day3WeatherIcon.src = "images/sunny.png";
                }
            };
            // invoke appendDay3Icon function
            appendDay3Icon();   

            // retrieve day4 weather condition id number
            const day4WeatherConditionID = forecastData.daily[4].weather[0].id;
            // function that appends correct weather icon to next day
            const appendDay4Icon = function(){
                if (day4WeatherConditionID > 199 && day4WeatherConditionID < 234){
                    day4WeatherIcon.src = "images/storm.png";
                }
                else if (day4WeatherConditionID > 299 && day4WeatherConditionID < 322){
                    day4WeatherIcon.src = "images/rain.png";
                }
                else if (day4WeatherConditionID === 502 || day4WeatherConditionID === 503 || day4WeatherConditionID === 504){
                    day4WeatherIcon.src = "images/downpour.png";
                }
                else if (day4WeatherConditionID > 499 && day4WeatherConditionID < 532){
                    day4WeatherIcon.src = "images/rain.png";
                }
                else if (day4WeatherConditionID > 599 && day4WeatherConditionID < 623){
                    day4WeatherIcon.src = "images/snow.png";
                }
                else if (day4WeatherConditionID === 804){
                    day4WeatherIcon.src = "images/overcast.png";
                }
                else if (day4WeatherConditionID > 800){
                    day4WeatherIcon.src = "images/day-cloudy.png";

                }
                else{
                    day4WeatherIcon.src = "images/sunny.png";
                }
            };
            // invoke appendDay4Icon function
            appendDay4Icon();   

            //clear searchbar
            searchBar.value = '';

        // if any error occurs along the way then log the error
        } catch(error){
            alert('Location not found. Search must be in the form of "City", "City, State" or "City, Country".');
            console.error(error);
        }
    };

    if(imperial === 'true'){
    getAndAppendWeatherInfoImperial();
    }
    else if(imperial === 'false'){
    getAndAppendWeatherInfoMetric();
    }

    // Add event listener to search button
    searchButton.addEventListener('click', function(){
        if(imperial === 'true'){
            getAndAppendWeatherInfoImperial();
            }
        else if(imperial === 'false'){
            getAndAppendWeatherInfoMetric();
            }
    });
    // add event listener to enter key being pressed
    searchBar.addEventListener('keypress', event => {
        if (event.key === "Enter"){
            event.preventDefault();
            searchButton.click();
        }
    })

    // add event listener to fahrenheit div
    fahrenheitDiv.addEventListener('click', function(){
        if(imperial === 'true'){
            return;
        }
        else{
            imperial = 'true';
            // save format to local storage
            localStorage.setItem('conversion', imperial);
            storedConversion = localStorage.getItem('conversion');
            getAndAppendWeatherInfoImperial();
        }
    })
    // add event listener to celsius div
    celsiusDiv.addEventListener('click', function(){
        if(imperial === 'false'){
            return;
        }
        else{
            imperial = 'false';
            // save format to local storage
            localStorage.setItem('conversion', imperial);
            storedConversion = localStorage.getItem('conversion');
            getAndAppendWeatherInfoMetric();

        }
    })
}
startApp();
