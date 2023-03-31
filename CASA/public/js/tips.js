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

    //   doc.querySelector('i').onclick = () => saveBookmark(docID);
}
displayTip();


//Function that calls everything needed for the main page  
function doAll() {
    firebase.auth().onAuthStateChanged(user => {
        if (user) {
            currentUser = db.collection("user").doc(user.uid); //global
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

// Get savedTips
function insertNameFromFirestore() {
    currentUser.get().then(userDoc => {
        //get the user name
        var bookmarks = userDoc.data().bookmarks;
        console.log("bookmarks: " + bookmarks);
        // $("#name-goes-here").text(user_Name); //jquery
        // document.getElementByID("name-goes-here").innetText=user_Name;
    })
}
// Comment out the next line (we will call this function from doAll())
// insertNameFromFirestore();

function saveBookmark(hikeDocID) {
    currentUser.set({
            bookmarks: firebase.firestore.FieldValue.arrayUnion(hikeDocID)
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