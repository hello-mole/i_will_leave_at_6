const weather = document.querySelector(".js-weather");

const COORDS = 'coords';
const ICON_CL = 'weatherIcon';
const JSICON_W_CL = 'js-iconWeather';
const JSTEXT_W_CL = 'js-textWeather';
const JSSPAN_CL = 'js-spanWeather';
const API_KEY = "2b3a694d2b1e39629613a0a3743e40d5";

function getWeather(lat, lon){
    fetch(`https://api.openweathermap.org/data/2.5/weather?lat=${lat}&lon=${lon}&appid=${API_KEY}&units=metric&lang=kr`
    ).then(function(response){
        return response.json()
    }).then(function(json){
        const divText = document.createElement("div");
        const divIcon = document.createElement("div");
        const span = document.createElement("span");
        const temperature = json.main.temp;
        const place = json.name;
        const condition = json.weather[0].description;
        const iconcode = json.weather[0].icon; 
        const img = document.createElement("img");
        img.classList.add(ICON_CL);
        span.classList.add(JSSPAN_CL);
        divText.classList.add(JSTEXT_W_CL);
        divIcon.classList.add(JSICON_W_CL);
        img.src = `weather_icons/${iconcode}.svg`;
        divText.innerText = `여기는 ${place}, 지금 ${Math.round(temperature)}°C`;
        span.innerText = `${condition}`;
        divIcon.append(img, span);
        weather.append(divIcon, divText);
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
        loadCoords();
        console.log("done")}
        , 60000);
}

init();