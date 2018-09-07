function process(){

var number1, number2, number3, n1, n2, n3, sum;
// grab value from form
number1 = document.forms["myform"].elements["num1"].value;
number2 = document.forms["myform"].elements["num2"].value;
number3 = document.forms["myform"].elements["num3"].value;
// change from string to integer
n1 = parseInt(number1);
n2 = parseInt(number2);
n3 = parseInt(number3);

sum      = n1 + n2 + n3;
average  = (n1 + n2 + n3) / 3;
product  = (n1*n2*n3);
smallest = (Math.min(n1,n2,n3));
largest  = (Math.max(n1,n2,n3));
alert('The sum of the numbers are ' 	+ sum + 
	'\nThe average of the numbers are ' + average + 
	'\nThe product of the numbers are ' + product +
	'\nThe smallest number is ' + smallest +
	'\nThe largest number is ' + largest);
}