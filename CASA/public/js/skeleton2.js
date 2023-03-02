// need this to work on other pages temporarily due to path conflict with extra /html

$(document).ready(function() {
    $.ajax({
      url: '../html/navTop.html',
      success: function(data) {
        $('#navTopPlaceholder').html(data);
      }
    });
    $.ajax({
        url: '../html/navBottom.html',
        success: function(data) {
          $('#navBottomPlaceholder').html(data);
        }
      });
  });



  
