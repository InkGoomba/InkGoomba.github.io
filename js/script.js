const tabs = document.querySelectorAll(".tab");
const traceCanvas = document.getElementById("myCanvas");
let tabIdx = 0;

initializeCanvas();
tabs.forEach(hoverFunc);

function hoverFunc(tab){
    tab.addEventListener('click', () => {
        tab.classList.add('open');
        collapseOtherTabs(tab);
        tabIdx = Array.prototype.indexOf.call(tabs, tab);
    })
}

function collapseOtherTabs(openTab){
    for(let i=0; i<tabs.length; i++){
        if(tabs[i] != openTab && tabs[i].classList.contains('open')){
            tabs[i].classList.remove('open');
        }
    }
}

window.addEventListener('wheel', e => {
    if (e.deltaY > 0 && tabIdx < tabs.length) {
        tabIdx += 1;
        tabs[tabIdx].classList.add('open');
        collapseOtherTabs(tabs[tabIdx]);
    } 
    else if (e.deltaY < 0 && tabIdx > 0) {
        tabIdx -= 1;
        tabs[tabIdx].classList.add('open');
        collapseOtherTabs(tabs[tabIdx]);
    }
}, { passive: true });

function startTraces(){
    let x = Math.floor(Math.random() * traceCanvas.width);
    let y = Math.floor(Math.random() * traceCanvas.height);
    let stepsLeft = Math.floor((Math.random() * 10) + 2);

    function nextSegment(){
        if (stepsLeft <= 0) return;
        const dir = Math.floor(Math.random() * 8);
        const length = Math.floor((Math.random() * 300) + 10);
        let remaining = length;
        stepLoop(dir, remaining);
    }

    function stepLoop(dir, remaining){
        if (remaining <= 0){
            stepsLeft--;
            nextSegment();
            return;
        }

        // compute next endpoint for one step (10px)
        let nx = x, ny = y;
        if (dir === 0){
            nx = x + 1;
        }
        else if (dir === 1){
            ny = y + 1;
        }
        else if (dir === 2){
            nx = x - 1;
        }
        else if (dir === 3){
            ny = y - 1;
        }
        else if (dir === 4){
            nx = x + 1;
            ny = y - 1;
        }
        else if (dir === 5){
            nx = x + 1;
            ny = y + 1;
        }
        else if (dir === 6){
            nx = x - 1;
            ny = y + 1;
        }
        else if (dir === 7){
            nx = x - 1;
            ny = y - 1;
        } 

        drawTrace(x, y, nx, ny);
        x = nx; y = ny;

        window.requestAnimationFrame(() => stepLoop(dir, remaining - 1));
    }
  nextSegment();
}

function drawTrace(x,y,x1,y1){
    let ctx = traceCanvas.getContext("2d");
    ctx.strokeStyle = "#00aeb6";
    ctx.beginPath();
    ctx.moveTo(x,y);
    ctx.lineTo(x1,y1);
    ctx.stroke();
}

async function runTracesLoop() {
    while (true) {
        await startTraces();
        await new Promise(r => setTimeout(r, 200));
    }
}

function initializeCanvas(){
    window.devicePixelRatio = 2;
    traceCanvas.style.width = 100 + "%";
    traceCanvas.style.height = 100 + "%";

    traceCanvas.width = Math.floor(window.devicePixelRatio * window.innerWidth);
    traceCanvas.height = Math.floor(window.devicePixelRatio * window.innerHeight);
    runTracesLoop();
}
