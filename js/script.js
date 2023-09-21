const focusName= (document.querySelector('input[type="text"]')).focus()
const jobRole= document.getElementById("other-job-role")
jobRole.style.display = "none"
const selectJob= document.querySelector('select[id="title"]')
selectJob.addEventListener('change', event => {
   const titleChoice= event.target.value
   if(titleChoice === "other" ){
    jobRole.style.display= "block"
   } else{
    jobRole.style.display = "none"
   }
 })

const selectColor = document.getElementById("shirt-colors")
selectColor.style.display = "none"
const colorOptions = document.querySelectorAll("option[data-theme]")
const selectDesign= document.querySelector("#design")
selectDesign.addEventListener('change', (e)=> {
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
checkboxLabel = document.querySelectorAll('.activities label');
registerActivities.addEventListener('change', (e)=> {
    let finalPrice= 0;
    for(i=0; i< activityOptionCost.length; i++){
        const checkedActivity = e.target
        const checkedActivityDate= checkedActivity.getAttribute('data-day-and-time')
        if(activityOptionCost[i].checked){
            checkbox.forEach((activityDate) => {
                const dateCheck = activityDate.getAttribute('data-day-and-time')
                if(activityDate !== checkedActivity && dateCheck === checkedActivityDate){
                    activityDate.disabled= true;
                    activityDate.parentNode.classList.add('disabled')
                }
            });
           finalPrice = finalPrice + parseInt(activityOptionCost[i].getAttribute("data-cost")) 

        } else if(!checkedActivity.checked){
            checkbox.forEach((activityDate) => {
                const dateCheck = activityDate.getAttribute('data-day-and-time')
                if(activityDate !== checkedActivity && dateCheck === checkedActivityDate){
                    activityDate.disabled= false;
                    activityDate.parentNode.classList.remove('disabled')
                }
            });
        }

    }
    totalCost.innerText= "Total: $" + finalPrice
})

function checkboxFocus(){
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
selectPaymentMethod.value= document.querySelector('option[value="credit-card"]').value
creditCardMethod= document.getElementById("credit-card")
paypalMethod= document.getElementById("paypal")
paypalMethod.style.display="none"
bitcoinMethod=document.getElementById("bitcoin")
bitcoinMethod.style.display="none"
selectPaymentMethod.addEventListener('change', ()=> {
    for(i=0; i<selectPaymentMethod.length; i++){
        if(selectPaymentMethod.value === "paypal" ){
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

//7
const form = document.querySelector("form")
const nameInput= document.querySelector('input[type="text"]')
const emailInput= document.querySelector('input[type="email"]')
const registerCheck = document.querySelector('.activity')
console.log(registerCheck)
const errorMessage= document.querySelector('#activities-hint')
const emailErrorMessage= document.querySelector('#email-hint')
console.log(errorMessage)
const nameValidator= () => nameInput == "";
const emailValidator= () => /^[^@]+@[^@.]+\.[a-z]+$/i.test(emailInput.value);
const cardNumberInput= document.querySelector('input[id="cc-num"]')
const creditCardValidator = () =>  /^\d{13,16}$/.test(cardNumberInput.value);
const zipCodeInput= document.querySelector('input[id="zip"]')
const zipCodeValidator= () => /^([0-9]{5})$/.test(zipCodeInput.value);
const cvvInput= document.querySelector('input[id="cvv"]')
const cvvValidator= () => /^([0-9]{3})$/.test(cvvInput.value)
const emailLabel= emailInput.closest('label')   

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
form.addEventListener('submit', (e)=> {
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

emailInput.addEventListener('keyup', ()=>{
    emailValidation(emailInput, emailErrorMessage, emailLabel)
})


