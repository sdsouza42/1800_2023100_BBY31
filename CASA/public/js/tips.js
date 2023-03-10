// populate page with the relevant tip from tips collections
function displayTip() {
  // let params = new URL( window.location.href ); //get URL of search bar
  // let ID = params.searchParams.get( "docID" ); //get value for key "id"
  // console.log( ID );

  db.collection( "Tips" )
      .doc( "QZft0ZW41tZLyWdp6Zr0" )
      .get()
      .then( doc => {
          weatherForThisTip = doc.data().weather;
          tipForThisWeather = doc.data().info;
          
          // only populate title, and image
          document.getElementById( "weatherForThisTip" ).innerHTML = weatherForThisTip;
          document.getElementById( "tipForThisWeather" ).innerHTML = tipForThisWeather;
      } );
      console.log("displayTip ran properly");
}
displayTip();




// save button adds this tip to the user-specific save list

