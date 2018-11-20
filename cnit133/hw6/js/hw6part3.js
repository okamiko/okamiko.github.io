$(document).ready(function(){
  jQuery(function($){
     $("#phone").mask("(999) 999-9999");
  });
});

function splitNum() {
  if($("#split_num").valid()) {
    var phoneNumber = $('#phone').val();
    var tokens = phoneNumber.split( ' ' );
    var tokens2 = tokens[1].split( '-' );
    $('#area').val(tokens[0].substr(1,3));
    $('#first3').val(tokens2[0]);
    $('#last4').val(tokens2[1]);
    $('#full').val(tokens[0] + ' ' + tokens2[0] + '-' + tokens2[1]);
  }else{
    return false;
  }
}     