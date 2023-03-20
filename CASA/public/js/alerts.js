// populate alerts landing page with the relevant alerts
function displayAlert() {
  // let params = new URL( window.location.href ); //get URL of search bar
  // let ID = params.searchParams.get( "docID" ); //get value for key "id"
  // console.log( ID );

  db.collection( "Alerts" )
      .doc( "g5EynSwzNbBGrrWftFaL" )
      .get()
      .then( doc => {
          alertTitle = doc.data().title;
          alertImage = doc.data().image;
          
          // only populate title, and image
          document.getElementById( "alertTitle" ).innerHTML = alertTitle;
          document.getElementById( "alertImage" ).innerHTML = alertImage;
      } );
      console.log("displayAlert ran successfully.");
}
displayAlert();






