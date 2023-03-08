$(document).ready(function() {
  // inserts top NavBar  
  $.ajax({
      url: '/html/navTop.html',
      success: function(data) {
        $('#navTopPlaceholder').html(data);
        // replace page title with meta name value
        var pageTitle = $('meta').attr('name');
        $('#pageTitle').text(pageTitle);
      }
    });
  // inserts bottom NavBar
  $.ajax({
      url: '/html/navBottom.html',
      success: function(data) {
        $('#navBottomPlaceholder').html(data);
      }
    });      
  });

