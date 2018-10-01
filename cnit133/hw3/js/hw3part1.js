// What I learned:
// 1. Using type="number" min="0" max="100" was good because it hints the user to not input anything but valid integers, however if the user decides to type manually into the box
//    past the range I specified, I'll need to check it with JavaScript
// 2. Even if type="number", input is still considered a String

function calculateGrade() {
    //Take table inputs and convert them to a number(float)
    var hwAvg     = parseFloat(document.getElementById("hwAvg").value); 
    var midExam   = parseFloat(document.getElementById("midExam").value);
    var finalExam = parseFloat(document.getElementById("finalExam").value);
    var ACR       = parseFloat(document.getElementById("ACR").value);

    //After grabbing the values as a num(float), calculate the finalAverage by using Formula
    var finalAverage =(.5*hwAvg)+(.2*midExam)+(.2*finalExam)+(.1*ACR); 

    //Display grade once innerHTML method added.
    var displayGrade = document.getElementById('finalAvg');

    //Make sure table inputs are in the range 0-100 and it is a valid number(not some letters)
    if (isNaN(finalAverage) || hwAvg < 0 || hwAvg > 100 || midExam < 0 || midExam > 100 || finalExam < 0 || finalExam > 100 || ACR < 0 || ACR > 100) {
        displayGrade.innerHTML = "Enter valid numbers from 0-100 only and make sure to fill in all inputs! "
    }else if(finalAverage >= 90 && finalAverage <= 100){
        displayGrade.innerHTML = "Score is: " + finalAverage + " Student earned an 'A'";
    }else if(finalAverage >= 80 && finalAverage <= 89){
        displayGrade.innerHTML = "Score is: " + finalAverage + " Student earned a 'B'";
    }else if(finalAverage >= 70 && finalAverage <= 79){
        displayGrade.innerHTML = "Score is: " + finalAverage + " Student earned a 'C'";
    }else if(finalAverage >= 60 && finalAverage <= 69){
        displayGrade.innerHTML = "Score is: " + finalAverage + " Student earned a 'D'. Student must retake the course";
    }else{displayGrade.innerHTML = "Score is: " + finalAverage + " Student earned an 'F'. Student must retake the course";}
}

$(document).ready(function(){
    $("#toggle").click(function(){
        $("#content").slideToggle("slow");
    });
});