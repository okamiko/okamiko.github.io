function process(){	
//declare variables
var number1, number2, number3, number4, number5, negativeCount = 0, zeroCount = 0, positiveCount = 0;

//input 5 integers from form text boxes using getElementById 
number1 = document.getElementById("num1").value;
number2 = document.getElementById("num2").value;  
number3 = document.getElementById("num3").value; 
number4 = document.getElementById("num4").value;
number5 = document.getElementById("num5").value;

//convert numbers from strings to integers
n1 = parseInt(number1);
n2 = parseInt(number2);
n3 = parseInt(number3);
n4 = parseInt(number4);
n5 = parseInt(number5);

if (n1 < 0) negativeCount += 1;

if (n2 < 0) negativeCount += 1;

if (n3 < 0) negativeCount += 1;

if (n4 < 0) negativeCount += 1;

if (n5 < 0) negativeCount += 1;

if (n1 === 0 ) zeroCount +=1;

if (n2 === 0 ) zeroCount +=1;

if (n3 === 0 ) zeroCount +=1;

if (n4 === 0 ) zeroCount +=1;

if (n5 === 0 ) zeroCount +=1;

if (n1 > 0) positiveCount += 1;

if (n2 > 0) positiveCount += 1;
 
if (n3 > 0) positiveCount += 1;

if (n4 > 0) positiveCount += 1;

if (n5 > 0) positiveCount += 1;
   
//Display the entered numbers, and other results
document.getElementById("result").value = 
("The inputted numbers were " + n1 + ", " + n2 + ", " +  n3 + ", " + n4 + ", " + n5 +
"\nThere were " + negativeCount + " Integers that were negative."   + 
"\nThere were " + zeroCount     + " Integers that were equal to 0." + 
"\nThere were " + positiveCount + " Integers that were positive.")

$(document).ready(function(){
  $("button").click(function(){
    $("textarea").fadeTo("slow",0.25);
  });
});
}