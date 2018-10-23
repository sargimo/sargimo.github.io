let slideShowEl = document.querySelector('#slideShow');

let slides = ["Extremely old", "Retired and broke", "A general drain on society",
 "Immobile", "Unpleasant to be around"];

let bgColour = ["green", "orange", "blue", "teal", "pink", "lightgreen"];

let intervalCheck = 1;

function displaySlide(slide, slideColour) {
        slideShowEl.innerHTML = slide;
        // document.body.style.transition = "all 2s";
        document.body.style.backgroundColor = slideColour;
        slide = slides[Math.floor(Math.random() * slides.length)];
        slideColour = bgColour[Math.floor(Math.random() * bgColour.length)];
}

let slide = slides[Math.floor(Math.random() * slides.length)];
let slideColour = bgColour[Math.floor(Math.random() * bgColour.length)];

slideShowEl.addEventListener('click', function (){
    if (intervalCheck == 1) {
        intervalCheck = intervalCheck - 1;    
        clearInterval(displaySlide);
        setInterval(function () {
            displaySlide(slide, slideColour);
        }, 200);
    } else if (intervalCheck == 0) {
        intervalCheck = intervalCheck + 1;
        clearInterval(displaySlide);
        setInterval(function () {
            displaySlide(slide, slideColour);
        }, 3000);
    }
});

displaySlide(slide, slideColour);

