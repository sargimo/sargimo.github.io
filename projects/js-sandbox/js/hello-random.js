//DOM elements
let subjectEl = document.querySelector('#subjectContainer');

//other global variables
let subjects = [{
   name: 'World',
   colour: 'green'
}, {
   name: 'Dolly',
   colour: 'orange'
}];

/**
* Display the subject.
* @param {Object} subject
*/
function displaySubject(subject) {
   setTimeout(function () {
       subjectEl.innerHTML = `<i>${subject.name}</i>`;
       subjectEl.style.color = subject.colour;
   }, 2000);
}

//controller
let subject = subjects[Math.floor(Math.random() * subjects.length)];
displaySubject(subject);