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
      console.log("displayTip ran successfully.");
}
displayTip();




// save button adds this tip to the user-specific save list
function saveTip(){
  
  let Title = document.getElementById("title").value;
  let Level = document.getElementById("level").value;
  let Season = document.getElementById("season").value;
  let Description = document.getElementById("description").value;
  let Flooded = document.querySelector('input[name="flooded"]:checked').value;
  let Scrambled = document.querySelector('input[name="scrambled"]:checked').value;

  firebase.auth().onAuthStateChanged(user => {
      if (user) {
          var currentUser = db.collection("users").doc(user.uid)
          var userID = user.uid;
          //get the document for current user.
          currentUser.get()
              .then(userDoc => {
                  var userEmail = userDoc.data().email;
                  db.collection("reviews").add({
                      hikeDocID: hikeDocID,
                      userID: userID,
                      title: Title,
                      level: Level,
                      season: Season,
                      description: Description,
                      flooded: Flooded,
                      scrambled: Scrambled,
                      timestamp: firebase.firestore.FieldValue.serverTimestamp()
                  }).then(()=>{
                      window.location.href = "thanks.html"; //new line added
                  })
              })
     } else {
      }
  });
  console.log("Tip saved successfully.")
}

// unsave tip removing it from savelist

