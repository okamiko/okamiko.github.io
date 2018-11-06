function goToNewPage(myForm) {
    var myDestination = myForm.destinationList.options[myForm.destinationList.selectedIndex].value;
    window.location = myDestination;
}