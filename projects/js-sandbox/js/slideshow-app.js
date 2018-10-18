let slideShowEl = document.querySelector('#slideShow');

let slides = ["Extremely old", "Retired and broke", "A general drain on society",
 "Immobile", "Unpleasant to be around"];

let bgColour = ["green", "orange", "blue", "teal", "pink", "lightgreen"];

function displaySlide(slide, slideColour) {
    setInterval(function () {
        slideShowEl.innerHTML = slide;
        document.body.style.transition = "all 2s";
        document.body.style.backgroundColor = slideColour;
        slide = slides[Math.floor(Math.random() * slides.length)];
        slideColour = bgColour[Math.floor(Math.random() * bgColour.length)];
    }, 3000)
}

let slide = slides[Math.floor(Math.random() * slides.length)];
let slideColour = bgColour[Math.floor(Math.random() * bgColour.length)];

displaySlide(slide, slideColour);

