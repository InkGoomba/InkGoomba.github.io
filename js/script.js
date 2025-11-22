const tabs = document.querySelectorAll(".tab");
let tabIdx = 0;

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