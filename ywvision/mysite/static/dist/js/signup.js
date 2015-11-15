//make it only applicable to first submisson.
//although this would be re-enabled after form submission and page got refreshed.
$('#signup_form').one('submit', function(event){
	var has_error = true;
	console.log("Jquery validation");
   	$(this).find( '.help-block' ).each(function () {
   		console.log($(this).text());
      	if ( !$(this).text() ) { has_error = false;}
      	else { has_error = true; } 
   	});

   	if ( has_error ) { 
   		$('#signup_form').submit();
   	}
   	else{
   		event.preventDefault();
    	$('#verificationModal').modal('show');
    	console.log("form submitted!");  // sanity check
   	}
    
});


function create_post() {
    console.log("create post is working!"); // sanity check
    console.log($('#post-text').val());
    var $form = $(this);
    $.ajax({ 
             type: 'post',
             url: '/signup', 
             context: $form, // context will be "this" in your handlers
             success: function() { // your success handler
             },
             error: function() { // your error handler
             },
             complete: function() { 
                // make sure that you are no longer handling the submit event; clear handler
                this.off('submit');
                // actually submit the form
                this.submit();
             }
         });
};

$('#id_verificationSubmit').click(function() {	
  	console.log("verificationSubmit is working!"); // sanity check
    var mobileRegex = /^[89]\d{7}$/;
    var mobile = $('#id_mobile').val();
    console.log(mobile);
    if (mobileRegex.test(mobile)) {
        //verify if number is already in our database
        $.get( "/api/checkmobile", { format: 'json', username: mobile} )
        .success(function( data ) {
          if(data==''){
            console.log("Mobile is valid and not in db. Proceed with mobile verification.");
            $('#id_mobile').prop('disabled', true);
            $('#id_mobile').css('border-color','');
            $('#id_mobile').css('box-shadow','');
            $('#id_mobileVerification_error').css('display','none');            
            $('#id_verificationSubmit').css('display','none');            
            $('#label_id_mobile').html("Mobile");            
            //set countime for 3 minutes verification code expire
            var counter = 10;       
            $('#id_sendCodeSubmit').prop('disabled', true);     
            var interval = setInterval(function() {
                counter--;
                $('#id_sendCodeSubmit').html("Remaining "+ counter + " sec");
                if (counter == 0) {
                    // verification code expires and enable re-send function      
                    $('#id_sendCodeSubmit').prop('disabled', false);                   
                    $('#id_verificationCode_info').html('Your code expired. ');
                    $('#id_sendCodeSubmit').html('Send another verification code.'); 
                    clearInterval(interval);
                }
            }, 1000);
            $('.block_verficationCode').css('display','block');
          }
          else{
            //the mobile is in the database, prompt to login
            $('#id_mobile').css('border-color','#a94442');
            $('#id_mobile').css('box-shadow','box-shadow: inset 0 1px 1px rgba(0, 0, 0, .075);');
            $('#id_mobileVerification_error').css('display','block');
            $('#id_mobileVerification_error').html("This mobile has already been registered. Please log in.")
          }
          
        })
        .fail(function() {
          //todo: move to a gneric sever failure page.
          $('#id_mobile').css('border-color','#a94442');
          $('#id_mobile').css('box-shadow','box-shadow: inset 0 1px 1px rgba(0, 0, 0, .075);');
          $('#id_mobileVerification_error').css('display','block');
          $('#id_mobileVerification_error').html("Error : Server Communication failure. Please contact site admin : ywvision@hotmail.com")
        });
        
        //todo: add in database checking for existing customers.
    }
    else{
      $('#id_mobile').css('border-color','#a94442');
      $('#id_mobile').css('box-shadow','box-shadow: inset 0 1px 1px rgba(0, 0, 0, .075);');
      $('#id_mobileVerification_error').css('display','block');
      $('#id_mobileVerification_error').html("*Error: Invalide Singaore Mobile Number. <br>(8 digits starting with 8 or 9)")
    }

});


$('#id_verificationCodeSubmit').click(function() {    
  var mobile = $('#id_mobile').val();
  alert(mobile);
  $('#id_username').val(mobile);
  //$('#id_username').setAttribute('value', mobile);
  $('#id_username').prop('readonly', true);
  $('#signUpForm').css('display','block');
  $('#mobileVerification').css('display','none'); 
});

$('#id_sendCodeSubmit').click(function() {  
  //set countime for 3 minutes verification code expire
  $('#id_verificationCode_info').html('*We have sent a 6-digit verification code to you mobile which is valid for the next 3 minutes.');
  console.log("Verification resent.")
  $('#id_sendCodeSubmit').html('Remaining 180 sec'); 
  var counter = 10;       
  $('#id_sendCodeSubmit').prop('disabled', true);     
  var interval = setInterval(function() {
      counter--;
      $('#id_sendCodeSubmit').html("Remaining "+ counter + " sec");
      if (counter == 0) {
          // verification code expires and enable re-send function                    
          $('#id_verificationCode_info').html('Your code expired. ');
          $('#id_sendCodeSubmit').prop('disabled', false);
          $('#id_sendCodeSubmit').html('Send another verification code.'); 
          clearInterval(interval);
      }
  }, 1000);
  $('.block_verficationCode').css('display','block');
});


$( document ).ready(function() {
  var mobile = $('#id_username').val();
  if(mobile!=''){
    $('#signUpForm').css('display','block');
    $('#mobileVerification').css('display','none');
    $('#id_username').prop('readonly', true);
  }
});