# Interactive-form-Project 3
Techdegree Project 3

//Real-time Error Message feature on email field

/*

emailInput.addEventListener('keyup', ()=>{
    emailValidation(emailInput, emailErrorMessage, emailLabel)
})
*/

//Conditional Error Message feauture on email field 

/*
function emailValidation(emailInput, emailErrorMessage, emailLabel){
    if(emailInput.value === ''){
        emailErrorMessage.textContent= "Email input box cannot be empty"
        emailErrorMessage.style.display= "block";
        emailLabel.className = 'not-valid';
    } else if(!emailValidator()){
        emailErrorMessage.textContent= "Email address must be formatted correctly"
        emailErrorMessage.style.display= "block";
        emailLabel.className = 'not-valid';
    } else{
        emailErrorMessage.style.display= "none";
        emailLabel.className = 'valid';
    }
}

*/