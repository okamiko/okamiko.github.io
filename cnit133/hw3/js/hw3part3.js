function toCelsius() {
    var F = parseFloat(document.getElementById("temperatureNumber").value);
    if (isNaN(F)) {
        document.getElementById('NaN').innerHTML = "Please input a numeric value"
    }
    else {
    	C = 5/9 * (F - 32) 
 		document.getElementById("result").value = ("The temperate is " + C + " degress Celsius");
    }
}

function toFahrenheit(){
  var C = parseFloat(document.getElementById("temperatureNumber").value);
    if (isNaN(C)) {
        document.getElementById('NaN').innerHTML = "Please input a numeric value"
    }
    else {
    	F = (9/5 * C) + 32
 		document.getElementById("result").value = ("The temperate is " + F + " degress Fahrenheit");
    }
}