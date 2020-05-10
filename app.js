const today = document.querySelector(".js-today");

function drawToday(){
    const now = new Date();
    const week = ["일", "월", "화", "수", "목", "금", "토", "일"];
    const month = now.getMonth()+1;
    const date = now.getDate();
    const day = now.getDay();
    
    today.innerText = `${month}월 ${date}일 ${week[day]}: 오늘의 할 일`
}

function init(){
    drawToday();
}

init()