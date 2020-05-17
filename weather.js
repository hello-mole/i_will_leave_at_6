const weather = document.querySelector(".js-weather");
const headWeather = document.querySelector(".js-headWeather")

const COORDS = 'coords';
const ICON_CL = 'weatherIcon';
const PLACE_CL = 'place';
const API_KEY = "2b3a694d2b1e39629613a0a3743e40d5";

function getWeather(lat, lon){
    fetch(`https://api.openweathermap.org/data/2.5/weather?lat=${lat}&lon=${lon}&appid=${API_KEY}&units=metric&lang=kr`
    ).then(function(response){
        return response.json()
    }).then(function(json){
        const spanPlace = document.createElement("span");
        const span1 = document.createElement("span");
        const span2 = document.createElement("span");
        const temperature = json.main.temp;
        const place = json.name;
        const condition = json.weather[0].description;
        const iconcode = json.weather[0].icon; 
        const img = document.createElement("img");
        img.classList.add(ICON_CL);
        spanPlace.classList.add(PLACE_CL);
        img.src = `weather_icons/${iconcode}.svg`;
        spanPlace.innerText = `         @${place}`;
        span1.innerText = `${condition}`;
        span2.innerText = `  ${Math.round(temperature)}°C`
        weather.append(img, span1, span2);
        headWeather.appendChild(spanPlace);
    })
}

function saveCoords(coordsObj){
    localStorage.setItem(COORDS, JSON.stringify(coordsObj));
}

function handleGeoSucces(position){
    const latitude = position.coords.latitude;
    const longitude = position.coords.longitude;
    const coordsObj = {
        latitude,
        longitude
    };
    saveCoords(coordsObj);
    getWeather(latitude, longitude);
}

function handleGeoError(){
    console.log("Can't access geo loaction");
}

function askForCoords(){
    navigator.geolocation.getCurrentPosition(handleGeoSucces, handleGeoError)
}

function loadCoords(){
    const loadedCoords = localStorage.getItem(COORDS);
    if(loadedCoords === null){
        askForCoords();
    } else {
        const parsedCoords = JSON.parse(loadedCoords);
        getWeather(parsedCoords.latitude, parsedCoords.longitude);
    }
}

function init(){
    loadCoords();
    setInterval(function(){
        while(weather.hasChildNodes()){
            weather.removeChild(weather.firstChild);
        };
        headWeather.innerHTML = "날씨";
        loadCoords();}
        , 60000);
}

init();