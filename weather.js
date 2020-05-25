const weather = document.querySelector(".js-weather");
const headWeather = document.querySelector(".js-headWeather");
const sixWeather = document.querySelector(".js-sixPmWeather");

const COORDS = 'coords';
const ICON_CL = 'weatherIcon';
const PLACE_CL = 'place';
const REFRESH_CL = 'refresh';
const API_KEY = "2b3a694d2b1e39629613a0a3743e40d5";

function refreshWeather(event){
    while(weather.hasChildNodes()){
        weather.removeChild(weather.firstChild);
    };
    headWeather.innerHTML = "날씨";
    loadCoords();
}

function getWeather(lat, lon){
    fetch(`https://api.openweathermap.org/data/2.5/weather?lat=${lat}&lon=${lon}&appid=${API_KEY}&units=metric&lang=kr`
    ).then(function(response){
        return response.json()
    }).then(function(json){
        const spanPlace = document.createElement("span");
        const span1 = document.createElement("span");
        const span2 = document.createElement("span");
        const refresh = document.createElement("span");
        const temperature = json.main.temp;
        const place = json.name;
        const condition = json.weather[0].description;
        const iconcode = json.weather[0].icon; 
        const img = document.createElement("img");
        // 시간
        const weathertime = new Date();
        const hour = weathertime.getHours();
        // 
        img.classList.add(ICON_CL);
        spanPlace.classList.add(PLACE_CL);
        refresh.classList.add(PLACE_CL, REFRESH_CL);
        img.src = `weather_icons/${iconcode}.svg`;
        spanPlace.innerText = `         @${place} ${hour}시 기준 `;
        span1.innerText = `${condition}`;
        span2.innerText = `  ${Math.round(temperature)}°C`
        refresh.innerText = `🔄새로고침`;
        weather.append(img, span1, span2);
        headWeather.append(spanPlace, refresh);
        refresh.addEventListener("click", refreshWeather);
    })
}

function sixPmWeather(lat, lon){
    fetch(`https://api.openweathermap.org/data/2.5/forecast?lat=${lat}&lon=${lon}&appid=${API_KEY}&units=metric&lang=kr`
    ).then(function(response2){
        return response2.json()
    }).then(function(json2){
        const now2 = new Date();
        const year2 = now2.getFullYear();
        const month2 = now2.getMonth()+1;
        const date2 = now2.getDate();
        const maintime = `${year2}-${month2 > 9 ? month2 : '0' + month2}-${date2}`;
        const time = `${year2}-${month2 > 9 ? month2 : '0' + month2}-${date2} 09:00:00`;
        console.log(time);
        const list = json2.list;
        const find = list.find(weather => weather.dt_txt === time);
        const x = find.weather[0];
        console.log(x);
        if(x.icon == "10d"|| x.icon == "10n" || x.icon == "9n" || x.icon == "9d"){
            sixWeather.innerText = `퇴근날씨는 ${Math.round(find.main.temp)}°C, ${x.description} (${maintime} 오후 6시)\n 우산 🌂꼭 챙기세요!`
            sixWeather.classList.add("raining");
        } else {
            sixWeather.innerText = `퇴근날씨는 ${Math.round(find.main.temp)}°C, ${x.description} (${maintime} 오후 6시)`

        }
    })
};

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
    sixPmWeather(latitude, longitude);
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
        let currentLat = parsedCoords.latitude;
        let currentLog = parsedCoords.longitude;
        getWeather(currentLat, currentLog);
        sixPmWeather(currentLat, currentLog);
    }
}

function init(){
    loadCoords();
}

init();