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
registerActivities.addEventListener('change', (e)=> {
    let finalPrice = 0;
    for(i=0; i< activityOptionCost.length; i++){
        // console.log(parseInt(activityOptionCost[i].getAttribute("data-cost")))
        if(activityOptionCost[i].checked){
           finalPrice = finalPrice + parseInt(activityOptionCost[i].getAttribute("data-cost"))
        }
    }
    totalCost.innerText= "Total: $" + finalPrice
})
