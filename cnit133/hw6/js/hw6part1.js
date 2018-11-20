function roundNumber(){
  var errMsg = "Invalid input";

if (isNaN(document.getElementById("number").value) || (document.getElementById("number").value) == "" ){
    document.getElementById("errOut").innerHTML = errMsg;
  }
else{
  var num = parseFloat(document.getElementById("number").value);
  document.myForm.output.value =  "The entered number is " + num +
   "\n rounded to the nearest integer: " + 
      roundToIntegerRound( num ) +
   "\n square root of the number rounded to nearest integer: " + 
      roundToIntegerSqrt( num ) +
   "\n rounded to the nearest tenth: " + 
      roundToTenthsTofixed( num ) +
   "\n rounded to the nearest hundredth: " + 
      roundToHundredthsFloor( num ) +
   "\n rounded to the nearest thousandths : " + 
      roundToThousandthsRound( num );
    }
}

function roundToIntegerRound(number){
  return(Math.round(number));
}

function roundToIntegerSqrt(number){
  return(Math.round(Math.sqrt(number)));
}

function roundToTenthsTofixed(number){
  return(number.toFixed(1));
}

function roundToHundredthsFloor(number){
  return(Math.floor( number * 100 + .5) / 100);
}

function roundToThousandthsRound(number){
  return(Math.round(1000 * number) / 1000);
}

function res(){    
  document.getElementById("errOut").innerHTML="";
  document.getElementById("number").focus();
}