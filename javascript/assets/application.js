$(function() {

  /*-----------------------------------------------------------------------------------*/
  /*  Anchor Link
  /*-----------------------------------------------------------------------------------*/
  $('a[href*=#]:not([href=#])').click(function() {
    if (location.pathname.replace(/^\//,'') == this.pathname.replace(/^\//,'') 
      || location.hostname == this.hostname) {

      var target = $(this.hash);
    target = target.length ? target : $('[name=' + this.hash.slice(1) +']');
    if (target.length) {
      $('html,body').animate({
        scrollTop: target.offset().top
      }, 1000);
        return false;
      }
    }
  });

  /*-----------------------------------------------------------------------------------*/
  /*  Tooltips
  /*-----------------------------------------------------------------------------------*/
  $('.tooltip-side-nav').tooltip();

});

function validateEmail(email) {
    var re = /^(([^<>()[\]\\.,;:\s@"]+(\.[^<>()[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;
    return re.test(email);
}

function subscribe(){
  
  email = $('#subscriberEmail').val();
  valid = validateEmail(email);

  if(valid){
    response = "";
    $.ajax({
        url: "https://docs.google.com/forms/d/1esSf9NagqT2hD6nwXhf4kvSqZikWD4h_nD4lRFgchAA/formResponse",
        data: { "entry_639244297": email },
        type: "POST",
        dataType: "xml",
        statusCode: {
            0: function () {
                response = 0;  //cannot see response because of CORS stuff that I cannot set on github.io page
            },
            200: function () {
                response = 200; // -- || --
            }
        }
    });

    $('#subscription-status').html('Thank you for your interest!'); //nevermind assume it's okay
  } else {
    $('#subscription-status').html('-.- that is not your email address, is it?');
  }
}
  