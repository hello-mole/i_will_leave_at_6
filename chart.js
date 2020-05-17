const chart = document.querySelector(".js-chart");
const persent = document.querySelector(".js-percent");

const NUM = 50;

if(chart){
    draw(NUM, '#8b22ff');
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