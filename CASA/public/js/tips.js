// get the tip ID previously stored from the corresponding alert
const firebaseTipID = localStorage.getItem('firebaseTipID');
// console.log(firebaseTipID);

// populate page with the relevant tip from tips collections
function displayTip() {

  db.collection( "Tips" )
      .doc( firebaseTipID )
      .get()
      .then( doc => {
          weatherForThisTip = doc.data().weather;
          tipForThisWeather = doc.data().info;
          
          $("#weatherForThisTip").html(weatherForThisTip);
          $("#tipForThisWeather").html(tipForThisWeather);
      } );
}
displayTip();


// function to save a tip to the user's personal savelist
$("#tipSaveButton").onclick = () => saveBookmark(firebaseTipID);
// newcard.querySelector('i').id = 'save-' + docID; 

function saveBookmark(firebaseTipID) {
    currentUser.set({
            bookmarks: firebase.firestore.FieldValue.arrayUnion(firebaseTipID)
        }, {
            merge: true
        })
        .then(function () {
            console.log("tip has been saved for: " + currentUser);
            // var iconID = 'save-' + hikeDocID;
            //this is to change the icon of the hike that was saved to "filled"
            // document.getElementById(tipSaveInput).innerText = 'bookmark';
        });
}


// function to remove this tip if the savelist if already there


// change button displayer depending on whether the tip is already saved or not
