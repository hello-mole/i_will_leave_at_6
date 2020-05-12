const today = document.querySelector(".js-today");
const footer = document.querySelector("footer");

function drawLisence(){
    footer.innerText = "우리 모두 칼퇴해요!"
    // footer.innerText = "This work is licensed under the Creative Commons Attribution-ShareAlike 4.0 International License. To view a copy of this license, visit http://creativecommons.org/licenses/by-sa/4.0/."
}

function drawToday(){
    const now = new Date();
    const week = ["일", "월", "화", "수", "목", "금", "토", "일"];
    const month = now.getMonth()+1;
    const date = now.getDate();
    const day = now.getDay();
    const hours = now.getHours();
    const minutes = now.getMinutes();
    const sec = now.getSeconds();
    today.innerText = `${month}월 ${date}일 ${week[day]}: 오늘의 할 일`
    setInterval(function(){
        if(minutes == 9 && sec == 0){
            console.log(hours,minutes,sec)
            drawToday();}
    }, 1000);
}

function init(){
    drawToday();
    drawLisence();
}

init()