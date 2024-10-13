const BASE_URL = "https://cdn.jsdelivr.net/npm/@fawazahmed0/currency-api@latest/v1/currencies";

const dropdowns = document.querySelectorAll(".dropdown select");
const btn = document.querySelector("button");
const fromCurr = document.querySelector(".from select");
const toCurr = document.querySelector(".to select");
const msg = document.querySelector("form .msg");

window.addEventListener("load", function(){
    updateExchangeRate();
})

for (let select of dropdowns){
    for (currCode in countryList){
        let newOption = document.createElement("option");
        newOption.innerText = currCode;
        newOption.value = currCode;
        if(select.name === "from" && currCode === "USD"){
            newOption.selected = "selected";
        }
        if(select.name === "to" && currCode === "INR"){
            newOption.selected = "selected";
        }
        select.append(newOption);
    }

    select.addEventListener("change", (evt) => {
        updateFlag(evt.target);
    })
}

const updateFlag = function(element){
    let currCode = element.value; //INR
    let countryCode = countryList[currCode]; //IN
    let newSrc = `https://flagsapi.com/${countryCode}/flat/64.png`; //IN flag access
    let img = element.parentElement.querySelector("img"); 
    img.src = newSrc;
}

btn.addEventListener("click", function(evt){
    evt.preventDefault();
    updateExchangeRate();
});

const updateExchangeRate = async function(){
    let amount = document.querySelector(".amount input");
    let amtVal = amount.value;
    if(amtVal === "" || amtVal < 1){
        amtVal = 1;
        amount.value = "1";
    }
    // console.log(amtVal);
    
    // console.log(fromCurr.value.toLowerCase(), toCurr.value.toLowerCase());
    const URL = `${BASE_URL}/${fromCurr.value.toLowerCase()}.json`;

    let response= await fetch(URL); 
    // console.log(response);
    let data = await response.json();
    // console.log(data);
    let rate = data[fromCurr.value.toLowerCase()][toCurr.value.toLowerCase()];
    console.log(rate);

    let FinalAmount = amtVal * rate;

    msg.innerText = `${amtVal} ${fromCurr.value} = ${FinalAmount} ${toCurr.value}`;
}