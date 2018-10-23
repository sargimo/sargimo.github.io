/**
 * Topics: Add event listeners and handlers for click, blur and submit events,
 * evt.preventDefault(), form handling, regular expressions, modifying DOM element properties.
 * Task: 
 * Make a simple app that has a form. The form has a button and a textbox. The
 * textbox is a hidden password textbox. There is also a hidden text message on the page.
 * The user will click on the button and then be presented with the password 
 * textbox. On the blur event of the textbox, the application will check to see 
 * if the inputted password is correct (it should match a certain pattern). 
 * If so, the message will be displayed.
 */

let getStartedForm = document.querySelector('#getStartedForm');
let getStartedBtn = document.querySelector('#getStartedBtn');
let passwordInput = document.querySelector('#passwordInput');
let message = document.querySelector('#message');
let secretPattern = /elgeofferton/;

getStartedForm.addEventListener('submit', (evt) => {
    evt.preventDefault();
    passwordInput.style.display = 'block';
    getStartedBtn.style.display = 'none';
    return false;
});

passwordInput.addEventListener('keypress', (evt) => {
    if (evt.keyCode == 13) {
        if (passwordInput.value.match(secretPattern)) {
            message.style.display = 'block';
            passwordInput.style.display = 'none';
        } else {
            alert('Wrong Password');
        }
    }
})