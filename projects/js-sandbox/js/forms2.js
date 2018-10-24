/**
 * <!-- Create a form that has inputs for first name, last name, email address, 
 * telephone number and website url. The first name, last name and email address 
 * fields will be required fields so the user will be shown a message if one of
 * these fields is empty. The application will also check the email address, 
 * telephone number and website url fields for correct format and show a 
 * meaningful message if the input doesn't follow this format. -->
 */

 let inputEmail = document.querySelector('#inputEmail');
 let inputTel = document.querySelector('#inputTel');
 let inputUrl = document.querySelector('#inputUrl');
 let emailErrMsg = document.querySelector('#email-err-msg');
 let telErrMsg = document.querySelector('#tel-err-msg');
 let urlErrMsg = document.querySelector('#url-err-msg');

 function validate(){
     let email = validateEmail(inputEmail.value);
     let url = validateUrl(inputUrl.value);
     let tel = validateTel(inputTel.value);

    return email && url && tel;
 } 

 function validateUrl(url){
     var i = /^(http[s]?:\/\/){0,1}(www\.){0,1}[a-zA-Z0-9\.\-]+\.[a-zA-Z]{2,5}[\.]{0,1}/;
    if (i.test(url) === false) {
        urlErrMsg.style.display = 'grid';
        return false;
    }
    urlErrMsg.style.display = 'none';
    return true;
 }

 function validateEmail(email){
    var i = /^(([^<>()\[\]\\.,;:\s@"]+(\.[^<>()\[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;
    if (i.test(String(email).toLowerCase()) === false){
        emailErrMsg.style.display = 'grid';
        return false;
    } 
    emailErrMsg.style.display = 'none';
    return true;
 }

 function validateTel(tel){
    var i = /^\d+$/;
    if (i.test(tel) === false){
        telErrMsg.style.display = 'grid';
        return false;
    } 
    telErrMsg.style.display = 'none';
    return true;
}

inputEmail.addEventListener('blur', (evt) => {
    validateEmail(evt.target.value);
});

inputTel.addEventListener('blur', (evt) => {
    validateTel(evt.target.value);
});

inputUrl.addEventListener('blur', (evt) => {
    validateUrl(evt.target.value);
});