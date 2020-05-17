const chart = document.querySelector(".js-chart");
const persent = document.querySelector(".js-percent");

let NUM = 0;

function howMuch(){
    const saved = localStorage.getItem(TODOS_LS);
    const parsed = JSON.parse(saved);
    const all = parsed.length;
    const real = parsed.filter(done => done.status == true);
    const doneNum = real.length;
    console.log(all, doneNum);
    NUM = Math.round((doneNum/all)*100);
}

function draw(max, colorname){
    setTimeout(function(){
        let i = 1;
        const func1 = setInterval(function(){
            if(i < max+1){
                chart.style.background = `conic-gradient(${colorname} 0% ${i}%, #ffffff ${i}% 100%)`
                i++;
            } else {
                clearInterval(func1)
            }
        }, 10);
        persent.innerText = `${NUM}%`;
    }, 1000)

}

if(chart){
    howMuch();
    draw(NUM, '#8b22ff');
}