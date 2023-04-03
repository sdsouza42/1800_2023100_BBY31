$(document).ready(function () {
  // inserts top NavBar
  $.ajax({
    url: "/html/navTop.html",
    success: function (data) {
      $("#navTopPlaceholder").html(data);
      // replace page title with meta name value
      var pageTitle = $("meta").attr("name");
      $("#pageTitle").text(pageTitle);

      // Update the navigation bar profile picture if available in localStorage
      var storedNavProfilePic = localStorage.getItem("navProfilePic");
      if (storedNavProfilePic) {
        const navProfilePic = document.getElementById("navProfilePic");
        navProfilePic.src = storedNavProfilePic;
      }
    },
  });
  // inserts bottom NavBar
  $.ajax({
    url: "/html/navBottom.html",
    success: function (data) {
      $("#navBottomPlaceholder").html(data);
    },
  });
});




