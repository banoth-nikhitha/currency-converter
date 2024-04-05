// const base_url="https://cdn.jsdelivr.net/npm/@fawazahmed0/currency-api@latest/v1/currencies";
// const base_url="https://cdn.jsdelivr.net/npm/@fawazahmed0/currency-api@latest/v1/currencies";
// const base_url="https://cdn.jsdelivr.net/npm/@fawazahmed0/currency-api@latest/v1/currencies";
const dropdowns=document.querySelectorAll(".dropdown select")//selecting the dropdown list items
// const apiUrl = `${base_url}/currencies/${fromCurr}/${toCurr}.json`;
const msg = document.querySelector(".msg");

for(let select of dropdowns)
{
    //accesing country list
  for(  Currcode in countryList)
  {
    // console.log(code,countryList[code]);
    let newoption=document.createElement("option");
    newoption.innerHTML=Currcode;
    newoption.value=Currcode;
    select.append(newoption);
    //selecting left as usd
    if(select.name=="from"&&Currcode=="USD")
    {
        newoption.selected="selected";
    }
    //selecting right as inr
    else if(select.name=="to"&&Currcode=="INR")
    {
        newoption.selected="selected";
    }
    select.addEventListener("change",(evt)=>
    {
      updateflag(evt.target);
    })
  }
}
const updateExchangeRate=async()=>
{
  let amount=document.querySelector(".amount input");
  //printing amount value like 100
  let amtvalue=amount.value;
  // console.log(amtvalue);
  //instead of -ve value and empty amount we have set it as 1
  if(amtvalue==""||amtvalue<1)
  {
    amtvalue=1;
    amount.value="1";
  }
  //calling api for exchanging rates
  // console.log(fromCurr.value,toCurr.value);
  // const URL=`${base_url}/${fromCurr.value.toLowerCase()}.json`//this url will gives the exchange rate
const fromCurr=document.querySelector(".from select").value;
const toCurr=document.querySelector(".to select").value;
  var myHeaders = new Headers();
myHeaders.append("apikey", "bU3jI1nZg63LRA7dXGOXDm0ugLzsJYJa");

var requestOptions = {
  method: 'GET',
  redirect: 'follow',
  headers: myHeaders
};

const url = `https://api.apilayer.com/exchangerates_data/convert?to=${toCurr}&from=${fromCurr}&amount=${amtvalue}`;

fetch(url, requestOptions)
  .then(response => response.json()) // Parse response as JSON
  .then(data => {
    // Check if the API request was successful
    if (data.success) {
      let rate = data.info.rate; // Get the conversion rate from the API response
      let finalamount = amtvalue * rate;
      // Display the result
      msg.innerText = `${amtvalue} ${fromCurr} = ${finalamount} ${toCurr}`;
    } else {
      // Print an error message if the conversion failed
      msg.innerText = 'Conversion failed. Please try again later.';
    }
  })
  .catch(error => console.log('Error:', error));
};
//if we change country code then flag also have to change so for that below is the code
const updateflag=(element)=>
{
  // console.log(element); it gives the elemnt which is effect by event handler
  let Currcode=element.value;
  // console.log(Currcode);//it gives the currency code values like inr usd etc
  let countrycode=countryList[Currcode];//its gives op as country code that is IN for india Eu for europe
//link for the flags will be
let  newsrc=`https://flagsapi.com/${countrycode}/flat/64.png`;
//adding flag imges
//here element is select and the img is present upside line of select so we have to choose parent container of the slect that is select-container
let img=element.parentElement.querySelector("img");
img.src=newsrc;//changing image src as link of the flags src
}
window.addEventListener("load",()=>
{
  updateExchangeRate();
});
//for exchange rate like 100 inr to usd
const bnt=document.querySelector(" form button");
bnt.addEventListener("click",(evt)=>
{
  evt.preventDefault();//after form submision there will be some default behaviour like page refresh so to prevent this automatic behaviour we will use prevent default .then there is no change after submision of the form
  //accesing amount
 updateExchangeRate();
});

