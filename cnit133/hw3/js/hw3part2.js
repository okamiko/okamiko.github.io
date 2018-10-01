function mesos() {
    // Step 0: Take table inputs and convert them to a number(of type int) because can't have decimals or strings for # of items sold
    var itemOne   = parseInt(document.getElementById("itemOne").value);
    var itemTwo   = parseInt(document.getElementById("itemTwo").value);
    var itemThree = parseInt(document.getElementById("itemThree").value);
    var itemFour  = parseInt(document.getElementById("itemFour").value);

    // Step 1: Make sure table inputs are in the range 0-infinity and it is a valid number(not some letters)
    if (isNaN(itemOne) || isNaN(itemTwo) || isNaN(itemThree) || isNaN(itemFour) || itemOne < 0 || itemTwo < 0 || itemThree < 0 || itemFour < 0) {
        document.getElementById('negativeNumber').innerHTML = "Inputs must be positive integers and input fields cannot be left blank"
    }
    else {
    	//assign the number of items sold to the bottom of the chart and if it made it here, input has already been validated to be a valid number
    	document.getElementById("item_1_sold").value = itemOne;
    	document.getElementById("item_2_sold").value = itemTwo;
    	document.getElementById("item_3_sold").value = itemThree;
    	document.getElementById("item_4_sold").value = itemFour;

	    var item_1_total = itemOne   * 239.99;
	    var item_2_total = itemTwo   * 129.75;
	    var item_3_total = itemThree * 99.95;
	    var item_4_total = itemFour  * 350.89;

	    document.getElementById("item_1_total").value = item_1_total.toFixed(2);
	    document.getElementById("item_2_total").value = item_2_total.toFixed(2);
	    document.getElementById("item_3_total").value = item_3_total.toFixed(2);
	    document.getElementById("item_4_total").value = item_4_total.toFixed(2);

	    var totalAmount = item_1_total+ item_2_total+ item_3_total+ item_4_total;
	    document.getElementById("item_total").value = totalAmount.toFixed(2);

	    salary = 200 + (totalAmount * .09);
	    document.getElementById("base_salary").value = salary.toFixed(2);
    }
}