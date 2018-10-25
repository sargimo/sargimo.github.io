/**
 * <!-- Create a form that has inputs for first name, last name, email address, 
 * telephone number and website url. The first name, last name and email address 
 * fields will be required fields so the user will be shown a message if one of
 * these fields is empty. The application will also check the email address, 
 * telephone number and website url fields for correct format and show a 
 * meaningful message if the input doesn't follow this format. -->
 */

 let inputEmail = document.querySelector('#inputEmail');
 let emailErrMsg = document.querySelector('#email-err-msg');
 
 let inputTel = document.querySelector('#inputTel');
 let telErrMsg = document.querySelector('#tel-err-msg');

 let inputUrl = document.querySelector('#inputUrl');
 let urlErrMsg = document.querySelector('#url-err-msg');
 
 let inputUsername = document.querySelector('#inputUsername');
 let usernameErrMsg = document.querySelector('#username-err-msg');
 let usernameDb = ["geofftown", "geoffhouse", "elgeofferton"];

 function validate(){
     let email = validateEmail();
     let url = validateUrl();
     let tel = validateTel();
     let username = validateUsername();

    return email && url && tel && username;
 } 

 function validateUrl(){
     let url = inputUrl.value;
     let i = /^(http[s]?:\/\/){0,1}(www\.){0,1}[a-zA-Z0-9\.\-]+\.[a-zA-Z]{2,5}[\.]{0,1}/;
    if (i.test(url) === false) {
        urlErrMsg.style.display = 'grid';
        return false;
    }
    urlErrMsg.style.display = 'none';
    return true;
 }

 function validateEmail(){
    let email = inputEmail.value;
    let i = /^(([^<>()\[\]\\.,;:\s@"]+(\.[^<>()\[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;
    if (i.test(String(email).toLowerCase()) === false){
        emailErrMsg.style.display = 'grid';
        return false;
    } 
    emailErrMsg.style.display = 'none';
    return true;
 }

 function validateTel(){
    let tel = inputTel.value;
    let i = /^\d+$/;
    if (i.test(tel) === false){
        telErrMsg.style.display = 'grid';
        return false;
    } 
    telErrMsg.style.display = 'none';
    return true;
}

function validateUsername(){
    let username = inputUsername.value.toLowerCase();
    if (usernameDb.indexOf(username, 0) >= 0) {
        usernameErrMsg.style.display = 'grid';
        return false;
    } 
    usernameErrMsg.style.display = 'none';
    return true;
}

function init(){
    inputEmail.addEventListener('blur', validateEmail);
    inputTel.addEventListener('blur', validateTel);
    inputUrl.addEventListener('blur', validateUrl);
    inputUsername.addEventListener('keyup', validateUsername);
}

init();