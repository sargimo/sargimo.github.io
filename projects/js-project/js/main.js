let classmatesEl = document.querySelector(".classmates");
let images;
let members = [{
      name: 'Ashleigh',
      normalUrl: '<img src="../images/normalAsh.png" class="animalImg">',
      animalUrl: '<img src="images/pigAsh.png" class="animalImg">',
      audio: "audio/pig.wav"
  },
  {
      name: 'Geoff',
      normalUrl: '<img src="images/normalGeoff.png" class="animalImg">',
      animalUrl: '<img src="images/goatGeoff.png" class="animalImg">'
  },
  {
      name: 'Matt',
      normalUrl: '<img src="images/normalMatt.png" class="animalImg">',
      animalUrl: '<img src="images/chickenMatt.png" class="animalImg">',
      audio: "audio/chicken.wav"
  },
  {
      name: 'TJ',
      normalUrl: '<img src="images/normalTJ.png" class="animalImg">',
      animalUrl: '<img src="images/dogTJ.png" class="animalImg">',
      audio: "audio/dog.wav"
  },
  {
      name: 'Lyndon',
      normalUrl: '<img src="images/normalLyndon.png" class="animalImg">',
      animalUrl: '<img src="images/elephantLyndon.png" class="animalImg">',
      audio: "audio/elephant.wav"
  },
  {
      name: 'Holly',
      normalUrl: '<img src="images/normalHolly.png" class="animalImg">',
      animalUrl: '<img src="images/giraffeHolly.png" class="animalImg">',
      audio: "audio/giraffe.wav"
  },
  {
      name: 'Jeremy',
      normalUrl: '<img src="images/normalJeremy.png" class="animalImg">',
      animalUrl: '<img src="images/sheepJeremy.png" class="animalImg">',
      audio: "audio/sheep.wav"
  },
  {
      name: 'Richard',
      normalUrl: '<img src="images/normalRichard.png" class="animalImg">',
      animalUrl: '<img src="images/zebraRichard.png" class="animalImg">',
      audio: "audio/zebra.wav"
  }
];
function changeAnimals(evt){
  let audio = evt.target.querySelector('#audio');
  let data = evt.target.getAttribute("data-id");
  evt.target.querySelector('.animalImg').remove();
  evt.target.innerHTML += members[data].animalUrl;
  audio.play();
}
function changeBackAnimals(evt){
  let data = evt.target.getAttribute("data-id");
  evt.target.querySelector('.animalImg').remove();
  evt.target.innerHTML += members[data].normalUrl;
}
function addMouseFunctions(){
  for (let i = 0; i < images.length; i++){
      images[i].addEventListener('mouseenter', changeAnimals);
      images[i].addEventListener('mouseleave', changeBackAnimals);
  }
}
function displayMembers() {
  let membersString = "";
  for (var i=0; i < members.length; i++){
      let member = members[i];
      membersString += `<div data-id="${[i]}" class="animals">${member.normalUrl} <audio id="audio" src="${member.audio}"></audio></div>`;
  }
  classmatesEl.innerHTML = membersString;
  images = document.querySelectorAll(".animals");
}
function init(){
  displayMembers();
  addMouseFunctions();
}
init();