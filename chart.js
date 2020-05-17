const chart = document.querySelector(".js-chart");


if(chart){
    draw(50, '#8b22ff');
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
    }, 1000);
}