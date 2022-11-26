function toTitleCase(str) {
    return str.toLowerCase().split(' ').map(function (word) {
      return (word.charAt(0).toUpperCase() + word.slice(1));
    }).join(' ');
}

async function display(){
    await getWeather("Bucharest");
}


async function getWeather(locationParam){
    const response = await fetch(`https://api.openweathermap.org/data/2.5/weather?q=${locationParam}&units=metric&APPID=c370e65603251074e39ca6661fa2c7fb`, {mode: 'cors'});
    const weatherData = await response.json();

    const longitude = Math.round(weatherData.coord.lon);
    const latitude = Math.round(weatherData.coord.lat);
    const location = weatherData.name;
    const weather = weatherData.weather[0].main;
    const weatherDescription = toTitleCase(weatherData.weather[0].description);
    const temperature = Math.round(weatherData.main.temp);
    const realFeel = Math.round(weatherData.main.feels_like);
    const humidity = weatherData.main.humidity;
    const windSpeed = Math.round(weatherData.wind.speed); //m/s

    const allData = longitude + " " + latitude + " " + location + " " + weather + " " + weatherDescription + " " + temperature + " " + realFeel + " " + humidity + " " + windSpeed;
    
    const content = document.querySelector(".content");
    const column1 = document.querySelector(".column1");

    content.innerHTML = ` <div class="column1">
    <span class = "location">${location}</span>  <br>
    <span class = "lat-long"> lat: ${latitude}° long: ${longitude}°</span>
    <div class = "temperature">${temperature} °C</div>
    <div class="description">${weatherDescription}</div>
    </div>
    <div class="column2">
        <span class="material-symbols-outlined">
            device_thermostat
            </span>RealFeel: ${realFeel} <br>
        <span class="material-symbols-outlined">
            humidity_high
            </span> Humidity: ${humidity}% <br>
        <span class="material-symbols-outlined">
            air
            </span>  Windspeed: ${windSpeed}m/s <br>
    </div>
    <div class="column3">
        <img src="" alt="">
    </div>

    <div class="column4">
        <input type="text" class = "input" placeholder="search location">
    </div>`

    getGif(weatherDescription);

    const input = document.querySelector(".input");
    
    input.addEventListener('keydown', async (e)=>{
        if(e && e.key === "Enter"){
            console.log(input);
            await getWeather(input.value);
        }
    })

}

async function getGif(weather){
    const response = await fetch(`https://api.giphy.com/v1/gifs/translate?api_key=e9x3z6TFSB8g58RCkqVbl3MqLtgIFbrc&s=${weather}`);
    const urle = await response.json();
    const gif = document.querySelector("img");
    gif.src = urle.data.images.original.url;
}

display();
