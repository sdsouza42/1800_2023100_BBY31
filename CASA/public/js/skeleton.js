$(document).ready(function() {
    $.ajax({
      url: 'html/topNavBar.html',
      success: function(data) {
        $('#topNavPlaceholder').html(data);
      }
    });
    $.ajax({
        url: 'html/bottomNavBar.html',
        success: function(data) {
          $('#footerPlaceholder').html(data);
        }
      });
  });



  
