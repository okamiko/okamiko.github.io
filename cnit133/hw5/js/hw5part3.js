var stateArray =  [ 
                    ["AL", "ALABAMA", "Montgomery", "4,779,736"],                     
                    ["AK", "ALASKA", "Juneau", "710,231"],  
                    ["AZ", "ARIZONA", "Phoenix", "6,392,017"],
                    ["AR", "ARKANSAS", "Little Rock", "2,915,918"],    
                    ["CA", "CALIFORNIA", "Sacramento", "37,253,956"],    
                    ["CO", "COLORADO", "Denver", "5,029,196"]
                  ];    

function ButtonPressed(){   
    var searchKey = document.forms["SearchForm"].elements["inputStateVal"].value;  //get searchkey from form input box
    searchKey = searchKey.toUpperCase();     //change search key to upper case
    
    var found = false;
    for (var row = 0; row < stateArray.length; row++){
     if ((stateArray[row][0] == searchKey) || (stateArray[row][1] == searchKey)){
      document.forms["SearchForm"].elements["name"].value = stateArray[row][1];
      document.forms["SearchForm"].elements["capital"].value = stateArray[row][2];
      document.forms["SearchForm"].elements["population"].value = stateArray[row][3];  
      row = stateArray.length;   
      found = true;
     }
    }
  if (found == false){
   document.forms["SearchForm"].elements["name"].value= "State not found!"; 
  }
}