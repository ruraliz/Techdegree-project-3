# Interactive-form-Project 3
Techdegree Project 3

## Real-time Error Message feature on email field

##### event listener to check and showcase email input validation requirement in real time as user is inputing information. 
```js

emailInput.addEventListener('keyup', ()=>{
    emailValidation(emailInput, emailErrorMessage, emailLabel)
})
```

## Conditional Error Message feauture on email field 
### function checkes that email input matches the required criteria and if not show appropriate error message.
##### if the email field is empty an error message saying "email input box cannot be empty" will be displayed. 
##### if the email entered does not match the format set by the validator, the error message displayed will be "Email address must be formatted correctly"
```js
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

```