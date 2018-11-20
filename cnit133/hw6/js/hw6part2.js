function search() {
  var textBlock = document.getElementById("textB").value;
  var searchCharacter = document.getElementById("ser").value;
  var textLength = textBlock.length;
  var count = 0;

  for(var i = 0; i < textLength; i ++) {
      if (textBlock.charAt(i) == searchCharacter){
          count ++;
      }
  }

  if (count > 0) {
      document.forms["ra"].elements["r"].value = ("The character: " + searchCharacter + " occurred " + count + " times."); 
  } else {
    
      // assemble HTML to pump into new window:
      var myText = "<html>\n";
          myText += "<head>\n";
          myText += "<title>Popup Window</title>\n";
          myText += "</head>\n";
          myText += "<body>\n";
          myText += "<div align='center'>\n";
          myText += "<p><b>Search character " + searchCharacter + " not found in text string!</b></p>\n";
          myText += "<input type='button' value='Close Window' onclick='window.close()'>\n";
          myText += "</div>\n";
          myText += "</body>\n";
          myText += "</html>";

      // open window
      var errWindow = window.open("", "new_window", "top=10, left=10, width=300, height=100");
      errWindow.focus();

      // pump html into to this new opened window
      errWindow.document.write(myText);

      // tell browser that errWindow document is finished loading
      errWindow.document.close();
  }
} 