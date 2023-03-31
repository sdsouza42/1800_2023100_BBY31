import { initializeApp } from "https://www.gstatic.com/firebasejs/9.17.2/firebase-app.js";
import { getAuth, onAuthStateChanged } from "https://www.gstatic.com/firebasejs/9.17.2/firebase-auth.js";
import { getFirestore, doc, getDoc } from "https://www.gstatic.com/firebasejs/9.17.2/firebase-firestore.js";
import { getStorage, ref, uploadBytes, getDownloadURL } from "https://www.gstatic.com/firebasejs/9.17.2/firebase-storage.js";
import { updateDoc } from "https://www.gstatic.com/firebasejs/9.17.2/firebase-firestore.js";


document.addEventListener("DOMContentLoaded", main);

function main() {
  // Firebase configuration and initialization code
  var firebaseConfig = {
    apiKey: "AIzaSyCQK3647aw-XLuvxojTJFOPFrzpNuZEuX0",
    authDomain: "comp1800-bby31.firebaseapp.com",
    databaseURL: "https://comp1800-bby31-default-rtdb.firebaseio.com",
    projectId: "comp1800-bby31",
    storageBucket: "comp1800-bby31.appspot.com",
    messagingSenderId: "657744075183",
    appId: "1:657744075183:web:6ea5731184f333e509375a"
  };
  initializeApp(firebaseConfig);

  //////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
  //////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
  //////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
  // This part is for pulling data from Cloud Firestore, extremly IMPORTANT, IMPORTANT, IMPORTANT, IMPORTANT, IMPORTANT, IMPORTANT
  // AGAIN, DO NOT MOVE OR ADJUST THIS CODE WITHOUT MY PERMISSION
  
  // Get a reference to the currently authenticated user
  const auth = getAuth();

  onAuthStateChanged(auth, (user) => {
    if (user) {
      // Get references to the HTML elements where you want to display the user's information
      var nameElement = document.getElementById("name");
      var emailElement = document.getElementById("email");
      var roleElement = document.getElementById("role");

      // Set the text of the HTML elements to show the user's information
      nameElement.textContent = user.displayName;
      emailElement.textContent = user.email;

      user.getIdTokenResult().then((idTokenResult) => {
        const userType = idTokenResult.claims.type;
        roleElement.textContent = userType;

        const db = getFirestore();
        const userRef = doc(db, 'user', user.uid);
        
        getDoc(userRef).then((docSnapshot) => {
          if (docSnapshot.exists()) {
            const data = docSnapshot.data();
            if (data && data.name) {
              nameElement.textContent = data.name;
            } else {
              nameElement.textContent = user.displayName;
            }            
            document.getElementById("email").textContent = data.email || user.email;
            document.getElementById("role").textContent = data.userType || userType;
          } else {
            console.log("No such data!");
          }
        }).catch((error) => {
          console.log("Error getting document:", error);
        });
      });
      getProfilePic();
    } else {
      // If no user is signed in, redirect to the login page
      window.location.replace("login.html");
    }
  });

//The end of the User data, IMPORTANT, IMPORTANT, IMPORTANT, IMPORTANT, IMPORTANT, IMPORTANT, IMPORTANT, IMPORTANT, IMPORTANT, IMPORTANT
//IMPORTANT, IMPORTANT, IMPORTANT, IMPORTANT, IMPORTANT, IMPORTANT, IMPORTANT, IMPORTANT, IMPORTANT, IMPORTANT, IMPORTANT, IMPORTANT
/////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
/////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
/////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////




/////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
/////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
/////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
//profile name change IMPORTANT, IMPORTANT, IMPORTANT, IMPORTANT, IMPORTANT, IMPORTANT
// AGAIN, DO NOT MOVE OR ADJUST THIS CODE WITHOUT MY PERMISSION

const changeNameButton = document.getElementById("changeNameButton");
changeNameButton.addEventListener("click", function() {
  // Prompt the user for a new name
  const newName = prompt("Enter your new name:");

  // Check if the user entered a new name
  if (newName && newName.trim()) {
    // Update the user's name in the Firestore database
    updateUserName(newName);
  }

  function updateUserName(newName) {
    const currentUser = auth.currentUser;
    const db = getFirestore();
    const userRef = doc(db, 'user', currentUser.uid);
  
    // Update the user's name in the Firestore database
    updateDoc(userRef, { name: newName })
      .then(() => {
        console.log("User name updated successfully");
        // Update the user's name displayed on the page
        document.getElementById("name").textContent = newName;
      })
      .catch((error) => {
        console.error("Error updating user name:", error);
      });
  }
  
});




//the end of profile name change
/////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
/////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
/////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////



/////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
/////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
/////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
//profile img upload IMPORTANT, IMPORTANT, IMPORTANT, IMPORTANT, IMPORTANT, IMPORTANT
// AGAIN, DO NOT MOVE OR ADJUST THIS CODE WITHOUT MY PERMISSION

// Get a reference to the profile picture div
const profilePic = document.getElementById("profilePic");

// Add an event listener to the profile picture div
profilePic.addEventListener("click", function() {
  // Open the file upload dialog box
  document.getElementById("fileInput").click();
});

// Get a reference to the Firebase Storage instance
const storage = getStorage();

// Get a reference to the file input element
const fileInput = document.getElementById("fileInput");

// Add an event listener to the file input element
fileInput.addEventListener("change", function(event) {
  // Get the currently authenticated user
  const currentUser = auth.currentUser;

  // Get the selected file
  const file = event.target.files[0];

  // Create a reference to the file in Firebase Storage
  const storageRef = ref(storage, 'profile/' + currentUser.uid);

  // Upload the file to Firebase Storage
  uploadBytes(storageRef, file).then((snapshot) => {
    console.log('Uploaded a blob or file!');
    // Get the download URL of the uploaded file
    getDownloadURL(storageRef).then((url) => {
      // Update the profile picture on the page
      const img = document.createElement('img');
      img.src = url;
      img.className = 'rounded-circle img-fluid';
      img.style.width = '100px';
      // Remove all child elements of the profilePic div
      while (profilePic.firstChild) {
        profilePic.removeChild(profilePic.firstChild);
      }
      // Append the new img element
      profilePic.appendChild(img);

      // Update the navigation bar profile picture
      const navProfilePic = document.getElementById("navProfilePic");
      navProfilePic.src = url;
      localStorage.setItem("navProfilePic", url);
    });
  }).catch((error) => {
    console.error(error);
  });
});

// Function to get the profile picture and display it on the page
function getProfilePic() {
  const currentUser = auth.currentUser;
  const storageRef = ref(storage, 'profile/' + currentUser.uid);

  getDownloadURL(storageRef).then((url) => {
    const img = document.createElement('img');
    img.src = url;
    img.className = 'rounded-circle img-fluid';
    img.style.width = '100px';

    while (profilePic.firstChild) {
      profilePic.removeChild(profilePic.firstChild);
    }

    profilePic.appendChild(img);

    // Update the navigation bar profile picture
    const navProfilePic = document.getElementById("navProfilePic");
    navProfilePic.src = url;
    localStorage.setItem("navProfilePic", url);

  }).catch((error) => {
    console.error(error);
  });
}






//the end of profile img upload
/////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
/////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
/////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////






















  // Add event listeners for the button items
  // var weatherHistoryButton = document.querySelector(".profile_item1 input[type='button']");
  // weatherHistoryButton.addEventListener("click", function() {
  //   // Code to handle the "Weather History" button click event
  //   window.location.href = "/tradeReg.html";
  // });

  // var setLocationButton = document.querySelector(".profile_item2 input[type='button']");
  // setLocationButton.addEventListener("click", function() {
  //   // Code to handle the "Set Location" button click event
   
  // });

  // var signOutButton = document.querySelector(".profile_item3 input[type='button']");
  // signOutButton.addEventListener("click", function() {
  //   // Sign out the user and redirect to the login page
  //   auth.signOut().then(function() {
  //     window.location.replace("/login.html");
  //   }).catch(function(error) {
  //     console.error("Error signing out:", error);
  //   });
  // });
}