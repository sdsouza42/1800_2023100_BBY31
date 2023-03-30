// get the tip ID previously stored from the corresponding alert
const firebaseTipID = localStorage.getItem('firebaseTipID');
console.log("Tip has loaded from: " + firebaseTipID);

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

// to remember user
function doAll() {
    firebase.auth().onAuthStateChanged(user => {
        if (user) {
            currentUser = db.collection("user").doc(user.uid); //global
            console.log("user.uid: " + user.uid);

            insertNameFromFirestore();
        } else {
            // No user is signed in.
            console.log("No user is signed in");
            window.location.href = "login.html";
        }
    }); 

    
}
doAll();

// Insert name function using the global variable "currentUser"
function insertNameFromFirestore() {
    currentUser.get().then(userDoc => {
        //get the user name
        var user_Name = userDoc.data().name;
        console.log(user_Name);
        $("#name-goes-here").text(user_Name); //jquery
        // document.getElementByID("name-goes-here").innetText=user_Name;
    })
}


// function to save a tip to the user's personal savelist
$("#tipSaveInput").onclick = () => saveBookmark(firebaseTipID);
// newcard.querySelector('i').id = 'save-' + docID; 

function saveBookmark(firebaseTipID) {
    console.log("save button clicked");
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
