const focusName= (document.querySelector('input[type="text"]')).focus() // focuses name input field as soon as the page is loaded. 
const jobRole= document.getElementById("other-job-role") // seellect the other job role input element and sets it under to not be displayed. 
jobRole.style.display = "none"
const selectJob= document.querySelector('select[id="title"]') 
selectJob.addEventListener('change', event => { //event listener to display the other job role input element if other is the choice picked in the jobs options. 
   const titleChoice= event.target.value
   if(titleChoice === "other" ){
    jobRole.style.display= "block"
   } else{
    jobRole.style.display = "none"
   }
 })

const selectColor = document.getElementById("shirt-colors") 
selectColor.style.display = "none" //disables the color selection element.
const colorOptions = document.querySelectorAll("option[data-theme]")
const selectDesign= document.querySelector("#design")
selectDesign.addEventListener('change', (e)=> { //event listener to show color selection if there is a change in design selection element and show different color options based on design picked.
    selectColor.style.display = "block"
    for(let i=0; i<colorOptions.length; i++){
        if(selectDesign.value !== colorOptions[i].getAttribute("data-theme")){
            colorOptions[i].hidden = true;
            colorOptions[i].disabled= true;
        }else{
            colorOptions[i].hidden = false;
            colorOptions[i].disabled = false;
        }
    }
})

const registerActivities = document.getElementById("activities")
const activityOptionCost= document.querySelectorAll('input[data-cost]')
const totalCost = document.getElementById("activities-cost")
const checkbox= document.querySelectorAll('input[type="checkbox"]')
const checkboxLabel= document.querySelectorAll('.activities label');
registerActivities.addEventListener('change', (e)=> { //event listener to add total cost amount of activity picked.
    let finalPrice= 0;
    for(i=0; i< activityOptionCost.length; i++){
        const checkedActivity = e.target
        const checkedActivityDate= checkedActivity.getAttribute('data-day-and-time')
        if(activityOptionCost[i].checked){ //if statement to check if the date of activity picked is a match to any of the other activity dates and disable the event not picked that is at the same time.
            checkbox.forEach((activityDate) => {
                const dateCheck = activityDate.getAttribute('data-day-and-time')
                if(activityDate !== checkedActivity && dateCheck === checkedActivityDate){
                    activityDate.disabled= true;
                    activityDate.parentNode.classList.add('disabled')
                }
            });
           finalPrice = finalPrice + parseInt(activityOptionCost[i].getAttribute("data-cost")) // adds up the price of all the picked activities.

        } else if(!checkedActivity.checked){ //if the previously conflicting event is not checked then the activity previously disabled can be available again.
            checkbox.forEach((activityDate) => {
                const dateCheck = activityDate.getAttribute('data-day-and-time')
                if(activityDate !== checkedActivity && dateCheck === checkedActivityDate){
                    activityDate.disabled= false;
                    activityDate.parentNode.classList.remove('disabled')
                }
            });
        }

    }
    totalCost.innerText= "Total: $" + finalPrice //displays the actual total cost of activities. 
})

function checkboxFocus(){ // function that allows the tab feature on the checkboxes to be visible using focus/blur event listener.
    for( let i=0; i < checkbox.length; i++){
        checkbox[i].addEventListener('focus', (e) => {
            checkboxLabel[i].classList.add('focus')
        })
        checkbox[i].addEventListener('blur', (e)=> {
            checkboxLabel[i].classList.remove('focus')
        })
    }
}
checkboxFocus();

const selectPaymentMethod= document.querySelector('select[id="payment"]')
selectPaymentMethod.value= document.querySelector('option[value="credit-card"]').value //sets the credit card payment option as default selection when page loads. 
creditCardMethod= document.getElementById("credit-card")
paypalMethod= document.getElementById("paypal")
paypalMethod.style.display="none"
bitcoinMethod=document.getElementById("bitcoin")
bitcoinMethod.style.display="none"
selectPaymentMethod.addEventListener('change', ()=> { //event listener to showcase loop through the different payment options and show specific feautures depending on the payment method chosen.
    for(i=0; i<selectPaymentMethod.length; i++){
        if(selectPaymentMethod.value === "paypal" ){ // checks if paypal is picked as payment option and shows paypal details and does not display other payment method details. 
            paypalMethod.style.display="block"
            creditCardMethod.style.display= "none"
            bitcoinMethod.style.display="none"
        } else if(selectPaymentMethod.value === "bitcoin"){
            bitcoinMethod.style.display="block"
            creditCardMethod.style.display= "none"
            paypalMethod.style.display="none"
        } else {
            creditCardMethod.style.display= "block"
            paypalMethod.style.display="none"
            bitcoinMethod.style.display="none"
        }
    }    
})


const form = document.querySelector("form")
const nameInput= document.querySelector('input[type="text"]')
const emailInput= document.querySelector('input[type="email"]')
const registerCheck = document.querySelector('.activity')
console.log(registerCheck)
const errorMessage= document.querySelector('#activities-hint')
const emailErrorMessage= document.querySelector('#email-hint')
console.log(errorMessage)
const nameValidator= () => nameInput == "";
const emailValidator= () => /^[^@]+@[^@.]+\.[a-z]+$/i.test(emailInput.value); //validation regex for email input. 
const cardNumberInput= document.querySelector('input[id="cc-num"]')
const creditCardValidator = () =>  /^\d{13,16}$/.test(cardNumberInput.value); //validation regex for credit card number input.
const zipCodeInput= document.querySelector('input[id="zip"]')
const zipCodeValidator= () => /^([0-9]{5})$/.test(zipCodeInput.value); //validation regex for zip code input. 
const cvvInput= document.querySelector('input[id="cvv"]')
const cvvValidator= () => /^([0-9]{3})$/.test(cvvInput.value)    //validation regex for cvv input. 
const emailLabel= emailInput.closest('label')   

function emailValidation(emailInput, emailErrorMessage, emailLabel){ //function to check that email input matches the required criteria and if not show appropriate error message. 
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
form.addEventListener('submit', (e)=> { //event listener for submiting the whole form , with multiple validation for the required fields, to check if the requirements are not met the form cannot be submitted and appropriate erros are displayed on each field. 
    const validator = (elementInput, validation) => {
        if(validation()){
            elementInput.closest('label').className = 'valid';
            elementInput.nextElementSibling.style.display= "none";
        } else {
            e.preventDefault();
            elementInput.closest('label').className= 'not-valid'
            elementInput.nextElementSibling.style.display= 'block';
        }
    }
    validator(nameInput, nameValidator);
    validator(zipCodeInput, zipCodeValidator);
    validator(cvvInput, cvvValidator); 
    emailValidation(emailInput, emailErrorMessage, emailLabel);
    if(selectPaymentMethod.value === 'credit-card'){
        validator(cardNumberInput, creditCardValidator)
    }
    if(totalCost.innerHTML === "Total: $0"){
        e.preventDefault();
        registerCheck.className= 'not-valid'
        errorMessage.style.display= 'block';
    }else{
        e.preventDefault();
        registerCheck.className= 'valid'
        errorMessage.style.display= 'none';
    }
});

emailInput.addEventListener('keyup', ()=>{ //event listener to check and showcase email input validation requirement in real time as user is inputing information. 
    emailValidation(emailInput, emailErrorMessage, emailLabel)
})


