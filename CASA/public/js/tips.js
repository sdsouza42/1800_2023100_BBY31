//Global variable pointing to the current user's Firestore document
var currentUser;   

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

      // add event listener to bookmark icon
      document.getElementById("saveTipButtonIcon").onclick = () => saveBookmark(firebaseTipID);

      // make bookmark icon appear black if already saved
      currentUser.get().then(userDoc => {
        //get the user name
        var bookmarks = userDoc.data().bookmarks;
        if (bookmarks.includes(firebaseTipID)) {
           document.getElementById('save-' + docID).innerText = 'bookmark';
        }
  })
}
displayTip();

console.log(firebase.auth()); // Check if firebase.auth() returns a valid object
console.log(db.collection("user")); // Check if db.collection("user") returns a valid object

// Get the user ID and database
function doAll() {
    firebase.auth().onAuthStateChanged(user => {
        if (user) {
            currentUser = db.collection("user").doc(user.uid); //global
            console.log(currentUser);
            console.log("user.uid: " + user.uid);

            insertNameFromFirestore();
            // displayCardsDynamically("hikes");
        } else {
            // No user is signed in.
            console.log("No user is signed in");
            window.location.href = "/html/login.html";
        }
    });
}
doAll();

// save tip to savelist
function saveBookmark(firebaseTipID) {
    currentUser.set({
            bookmarks: firebase.firestore.FieldValue.arrayUnion(firebaseTipID)
        }, {
            merge: true
        })
        .then(function () {
            console.log("bookmark has been saved for: " + currentUser);
            var iconID = 'save-' + hikeDocID;
            //console.log(iconID);
			//this is to change the icon of the hike that was saved to "filled"
            document.getElementById(iconID).innerText = 'bookmark';
        });
}