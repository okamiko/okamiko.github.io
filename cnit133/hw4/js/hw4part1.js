//Calculate the product and sum of every third integer from 5 to 20 inclusive.
//Display results, with some text.
var i, sum = 0,	prod = 1;
for (i = 5; i <= 20; i+=3) { 
	prod = prod * i;
    sum = sum + i;
}

//Calculate the product and sum of every fourth integer from 3 to 31 inclusive.
//Display results, with some text.
var j = 3, prod_while = 1, sum_while = 0;
while (j <= 31) {
  	prod_while  = prod_while * j;
  	sum_while = sum_while + j;
    j=j+4;
}

document.getElementById('sum-text-for').innerHTML = 'The sum of every third integer from 5 to 20 inclusive is ' + sum + '.';
document.getElementById('sum-num-for').innerHTML = ('5 + 8 + 11 + 14 + 17 + 20 = '+ sum);

document.getElementById('prod-text-for').innerHTML = 'The product of every third integer from 5 to 20 inclusive is ' + prod.toLocaleString() + '.';
document.getElementById('prod-num-for').innerHTML = '5 * 8 * 11 * 14 * 17 * 20 = '+ prod.toLocaleString();

document.getElementById('sum-text-while').innerHTML = 'The sum of every fourth integer from 3 to 31 inclusive is ' + sum_while + '.';
document.getElementById('sum-num-while').innerHTML = '3 + 7 + 11 + 15 + 19 + 23 + 27 + 31 = '+ sum_while;

document.getElementById('prod-text-while').innerHTML = 'The product of every fourth integer from 3 to 31 inclusive is ' + prod_while.toLocaleString() + '.';
document.getElementById('prod-num-while').innerHTML = '3 * 7 * 11 * 15 * 19 * 23 * 27 * 31 = '+ prod_while.toLocaleString();

$(function(){
	$("#draggable").draggable();
});