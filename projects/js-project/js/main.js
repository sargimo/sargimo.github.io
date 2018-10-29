let classmatesEl = document.querySelector(".classmates");
let images;

let members = [{
        name: 'Ashleigh',
        id: 0,
        normalUrl: '<img src="../images/normalAsh.png" class="animalImg">', 
        animalUrl: '<img src="images/pigAsh.png" class="animalImg">',
        audio: "https://learn.parallax.com/sites/default/files/content/Reference/SoundLib/wahwah.wav"
    },
    {
        name: 'Geoff',
        id: 1,
        normalUrl: '<img src="images/normalAsh.png" class="animalImg">', 
        animalUrl: '<img src="images/pigAsh.png" class="animalImg">'
    },
    {
        name: 'Geoff',
        id: 1,
        normalUrl: '<img src="images/normalAsh.png" class="animalImg">', 
        animalUrl: '<img src="images/pigAsh.png" class="animalImg">'
    },
    {
        name: 'Geoff',
        id: 1,
        normalUrl: '<img src="images/normalAsh.png" class="animalImg">', 
        animalUrl: '<img src="images/pigAsh.png" class="animalImg">'
    },
    {
        name: 'Geoff',
        id: 1,
        normalUrl: '<img src="images/normalAsh.png" class="animalImg">', 
        animalUrl: '<img src="images/pigAsh.png" class="animalImg">'
    },
    {
        name: 'Geoff',
        id: 1,
        normalUrl: '<img src="images/normalAsh.png" class="animalImg">', 
        animalUrl: '<img src="images/pigAsh.png" class="animalImg">'
    }
];


function changeAnimals(evt){
    let audio = evt.target.querySelector('#audio');
    let data = evt.target.getAttribute("data-id");
    evt.target.removeChild(evt.target.childNodes[0]);    
    evt.target.innerHTML = members[data].animalUrl;
    audio.play();
}

function changeBackAnimals(evt){
    let data = evt.target.getAttribute("data-id");
    evt.target.removeChild(evt.target.childNodes[0]);
    evt.target.innerHTML = members[data].normalUrl;
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