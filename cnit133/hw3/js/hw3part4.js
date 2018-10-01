function mult(){
    var number1 = parseInt(document.getElementById("numberOne").value); 
    var number2 = parseInt(document.getElementById("numberTwo").value); 
    var number3 = parseInt(document.getElementById("numberThree").value); 

    if (isNaN(number3)){
        document.getElementById('NaN').innerHTML = "Please input a numeric value";
    }
    else if (number1*number2 === number3){
    	document.getElementById("outcome").innerHTML = ("");
		var response = confirm("Very Good! Continue?"); 
		if(response == true) playAgain()
	}
	else{
		tryAgain()
	}
} 

function playAgain(){
	document.getElementById("numberThree").value ="";
	document.getElementById("numberThree").focus();
	window.location.reload();
}

function tryAgain(){
	document.getElementById("outcome").innerHTML = ("No. Please try again.");
	document.getElementById("numberThree").value ="";
	document.getElementById("numberThree").focus();
}
// https://www.w3schools.com/js/js_random.asp
function randomNums(){
	document.getElementById("numberOne").value = Math.floor(Math.random() * 10);
	document.getElementById("numberTwo").value = Math.floor(Math.random() * 10);
};