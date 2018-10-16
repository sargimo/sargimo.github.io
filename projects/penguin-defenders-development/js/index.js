var burger = document.querySelector('.burger');
var nav = document.querySelector('#' + burger.dataset.target);
var header = document.querySelector('.headroom');

//Bulma responsive Nav
burger.addEventListener('click', function (){
  burger.classList.toggle('is-active');
  nav.classList.toggle('is-active');
});

//Headroom
var headroom = new Headroom(header, {
 offset: 105,
 tolerance: 5,
 classes: {
   initial: "animated",
   pinned: "slideInDown", //custom style slideDown
   unpinned: "slideOutUp" //custome style slideUp
 }
});
headroom.init();

//Bulma carousel kick off
carousels = bulmaCarousel.attach();

