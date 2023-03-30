const registrationForm = document.getElementById("registration-form");
registrationForm.addEventListener("submit", async (e) => {
  e.preventDefault();

  const bIDNum = parseInt(document.getElementById("bIDNum").value) || null;
  const bName = document.getElementById("bName").value;
  const nNum = parseInt(document.getElementById("nNum").value);
  const distance = document.getElementById("distance").value;
  const email = document.getElementById("email").value;
  const name = document.getElementById("name").value;
  // const tradePicture = document.getElementById("tradePicture").files[0];
  const tradeTags = Array.from(document.querySelectorAll('input[type="checkbox"]:checked')).map(checkbox => checkbox.value);


  try {
    // const tradePictureURL = await uploadImage(tradePicture);
    
    const docRef = await db.collection("tradeUser").add({
      bIDNum,
      bName,
      bNum,
      distance,
      email,
      Name,
      // tradePicture,
      tradeTags,
      tradeVerfied: bIDNum !== null,
    });

    console.log("Document written with ID: ", docRef.id);
  } catch (error) {
    console.error("Error adding document: ", error);
  }
});


// async function uploadImage(file) {
//     const storageRef = storage.ref();
//     const imagesRef = storageRef.child("tradeProfile/" + file.name);
//     const snapshot = await imagesRef.put(file);
//     const downloadURL = await snapshot.ref.getDownloadURL();
//     return downloadURL;
//   }
  