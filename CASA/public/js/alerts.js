// replace placeholder with relevant alerts

function displayAlert() {

//  loads the page with all cards regardless of tags
$(document).ready(function() {
    // get number of card.html files to put on page
    var numberOfCards = 0;
    $.ajax({
      url: '/cards/',
      async: false,
      success: function(data) {
        numberOfCards = $(data).find('a[href$=".html"]').length;
      }
    });
  
    // creates placeholders for cards
    let cardsPlaceholder = "";
    for (let n = 1; n <= numberOfCards; n++) {
      cardsPlaceholder += "<a id=\"card" + n + "\" class=\"card\"></a>"
    }
    document.getElementById("index_container").innerHTML = cardsPlaceholder;
  
    // subs in each cardx.html for the placeholder
    for (var i = 1; i <= numberOfCards; i++) {
      $.ajax({
        url: '/cards/card' + i + '.html',
        success: function(data) {
          $('#card' + this.index).html(data);
        },
        index: i
      });
    }
    console.log("cards.js ran successfully.");
  });
  
  
}
displayAlert();






