document.addEventListener("DOMContentLoaded", function () {  //wait till document has loaded to run the script
    if (document.body.classList.contains("Home-page")) {  //check if current page is the home page
        document.getElementById("submitBtn").addEventListener("click", getWeather); //used for the clicking the submit buttton
    } else {
        displayWeatherData();  //if current page is not the home page show weather data
    }
});

function getWeather() {
    const cityInput = document.getElementById("cityInput").value.trim(); //give the cityb name entered by the user a variable and trim any spaces
    
    
    fetch("sample.json")    //fetching frm json file
        .then(response => response.json())  //change response from raw JSON format to JS object
        .then(data => {   //.then used 
            //find the city in  the data that matches the user input
            const cityData = data.find(city => city.cityName.toLowerCase() === cityInput.toLowerCase());


            if (cityData) { //if the city is found
                localStorage.setItem("weatherData", JSON.stringify(cityData));
                window.location.href = "TemperaturePage.html"; // go to temperature page
            } 
        })
        
}

function displayWeatherData() {
    const weatherData = JSON.parse(localStorage.getItem("weatherData")); //gettin the weather data frm local storage
 

    if (document.body.classList.contains("Temp-Page")) {       //check if current page is temperature page
        let tempElement = document.getElementById("TemperaturePage");  //get the element with the id TemperaturePage to show the temperature
        tempElement.textContent = `Temperature: ${weatherData.temperatureCelsius}°C`;  //display the temperature
        tempElement.style.color = weatherData.temperatureCelsius > 20 ? "white" : "black"; //if temp is more than 20 change text to white other make it black
    }

    if (document.body.classList.contains("Humid-Page")) {     //check if current page is humdity page
        let humidityElement = document.getElementById("HumidityData"); //get the element with the id HumidityData to show the humidity
        humidityElement.textContent = `Humidity: ${weatherData.humidity*100}%`;  //display the humidity
        humidityElement.style.color = weatherData.humidity > 0.6 ? "yellow" : "black";  //if humidity is more than 60% change text to yellow otherwise make it black
    }
    if (document.body.classList.contains("UV-page")) {    //check if currewnt page is UV index page
        let uvElement = document.getElementById("UvData");  //get the element with the id UvData to show the UV index
        uvElement.textContent = `UV Index: ${weatherData.uvIndex}`;  //display the UV index
        uvElement.style.color = weatherData.uvIndex > 5 ? "red" : "black";  //if UV index is more than 5 chnage text to red otherwise make it black
    }
    if (document.body.classList.contains("Wind-Page")) {   //check if currrent page is wind page
        let windElement = document.getElementById("WindData");   //get the element with the id WindData to show the wind speed
        windElement.textContent = `Wind Speed: ${weatherData.windSpeed}`;  //displau the wind speed
        windElement.style.color = parseInt(weatherData.windSpeed) > 20 ? "darkgray" : "black";  //if windspeed is more than 20 cange text to darkgrey otherwise make it black
    }
}

