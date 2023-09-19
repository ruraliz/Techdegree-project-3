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
const checkbox= document.querySelector('input[text="checkbox"]')
let finalPrice = 0;
registerActivities.addEventListener('change', (e)=> {
    for(i=0; i< activityOptionCost.length; i++){
        if(activityOptionCost[i].checked){
           finalPrice = finalPrice + parseInt(activityOptionCost[i].getAttribute("data-cost"))
        }
    }
    totalCost.innerText= "Total: $" + finalPrice
})

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
console.log(errorMessage)
const nameValidator= () => nameInput == "";
const emailValidator= () => /^[^@]+@[^@.]+\.[a-z]+$/i.test(emailInput.value);
const CardNumberInput= document.querySelector('input[id="cc-num"]')
const creditCardValidator = () => /^\d{13,16}$/.test(CardNumberInput.value);
const zipCodeInput= document.querySelector('input[id="zip"]')
const zipCodeValidator= () => /^([0-9]{5})$/.test(zipCodeInput.value);
const cvvInput= document.querySelector('input[id="cvv"]')
const cvvValidator= () => /^([0-9]{3})$/.test(cvvInput.value)
form.addEventListener('submit', (e)=> {
    const validator = (elementInput, validation) => {
        if(validation()){
            elementInput.closest('label').className = 'valid';
            elementInput.nextElementSibling.style.display= "none";
        } else {
            e.preventDefault();
            elementInput.closest('label').className= 'error'
            elementInput.nextElementSibling.style.display= 'block';
        }
    }
    validator(nameInput, nameValidator);
    validator(emailInput, emailValidator);
    validator(zipCodeInput, zipCodeValidator);
    validator(cvvInput, cvvValidator);
    if(selectPaymentMethod.value === 'credit-card'){
        validator(CardNumberInput, creditCardValidator)
        }

    if(finalPrice == 0){
        e.preventDefault();
        registerCheck.className= 'error'
        errorMessage.style.display= 'block';
    }else{
        e.preventDefault();
        registerCheck.className= 'valid'
        errorMessage.style.display= 'none';
    }
});
