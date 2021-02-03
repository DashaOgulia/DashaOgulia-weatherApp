const api = {
    key:"5d066958a60d315387d9492393935c19",
    base: "http://api.openweathermap.org/data/2.5/"
}
const searchbox = document.querySelector('.search-box');
searchbox.addEventListener('keypress', setQuery);

function setQuery(e){
if (e.keyCode == 13){
    getResults(searchbox.value);
    console.log(searchbox.value);
}
}

function getResults(query){
    fetch(`${api.base}weather?q=${query}&units=metric&APPID=${api.key}`)
   
    .then(weather =>{
        return weather.json()
    }).then(displayResults);
}
function displayResults(weather){
    console.log(weather);
    let city = document.querySelector('.location .city');
    city.innerHTML = `${weather.name}, ${weather.sys.country}`;

    let now = new Date();
    let date = document.querySelector('.location .date');
    date.innerText = dateBuilder(now);

    let temp = document.querySelector('.current .temp')
    temp.innerHTML = `${Math.round(weather.main.temp)}<span>°C</span>`;

    let weather_el = document.querySelector(".current .weather");
    weather_el.innerText = weather.weather[0].main;

    let hillow = document.querySelector(".hi-low");
    hillow.innerText = `${Math.round(weather.main.temp_min)}C°C / ${Math.round(weather.main.temp_max)}°C`

    let humidity = document.querySelector(".humidity");
    humidity.innerText = `Humidity:${weather.main.humidity}%`

    let feelsLike = document.querySelector(".feels_like");
    feelsLike.innerText = `Feels like ${weather.main.feels_like} °C`

    let pressure = document.querySelector(".pressure");
    pressure.innerText = `Pressure: ${weather.main.pressure}hPa`

    let wind = document.querySelector(".wind");
    wind.innerText = `Wind: ${weather.wind.speed}km/h SSE`

    // const icon = `https://openweathermap.org/img/wn/${
    //     weather[0]["icon"]
    //   }@2x.png`;
}

function dateBuilder(d){
    let months = ["Junuary", "February", "Murch", "April", "May", "June", "July", "August", "September", "October", "November", "December"];
    let days = ["Sunday", "Monday", "Tuesday", "Wednesday", "Thursday", "Friday", "Saturday"];

    let day = days[d.getDay()];
    let date = d.getDate();
    let month  = months[d.getMonth()];
    let year = d.getFullYear();
    return `${day} ${date} ${month} ${year}`;
}