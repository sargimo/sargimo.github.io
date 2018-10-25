let images = document.querySelectorAll('img');
let countEl = document.querySelector('#count');
let count = 0;

function rotateImg(evt){
    evt.target.classList.add("rotated", "bordered");
    count += 1;
    countEl.innerHTML = count;
}

function unrotateImg(evt){
    evt.target.classList.remove("rotated", "bordered");
}

function init(){
    for (let i = 0; i < images.length; i++) {
        images[i].addEventListener('mouseenter', rotateImg);
        images[i].addEventListener('mouseleave', unrotateImg);
    }
}

init();