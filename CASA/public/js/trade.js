//------------------------------------------------------------------------------
// Input parameter is a string representing the collection we are reading from
//------------------------------------------------------------------------------
function displayProfileDynamically(collection) {
    let profileTemplate = document.getElementById("tradeSelectTemplate");

    db.collection(collection).get()   //the collection called "tradeUser"
        .then(allTrades=> {
            //var i = 1;  //Optional: if you want to have a unique ID for each hike
            allTrades.forEach(doc => { //iterate thru each doc
                var name = doc.data().firstName + " " + doc.data().lastName;
                var tags = doc.data().tradeTags;  
                var verified = doc.data().tradeVerfied;
                var ratings = doc.data().tradeRatings;
                var distance = doc.data().distance;
                let newprofile = profileTemplate.content.cloneNode(true);
                //var selectVerified = newprofile.querySelector('.select-verified');
                //var docID = doc.id; // read the document id

                //update title and text and image
                newprofile.querySelector('.select-picture').src = '/img/TradeProfile.svg';
                newprofile.querySelector('.select-name').innerHTML = name;
                newprofile.querySelector('.select-tags').innerHTML = tags;
                newprofile.querySelector('.select-rating').src = '/img/Rating.svg';
                newprofile.querySelector('.select-distance').src = '/img/Distance.svg';
                newprofile.querySelector('.tradeRating').innerHTML = ratings;
                newprofile.querySelector('.tradeDistance').innerHTML = distance;
                
                const selectVerified = newprofile.querySelector('.select-verfied');
                if (selectVerified) {
                  // If the element exists, set its source or hide it based on the 'verified' value
                  if (verified) {
                    selectVerified.src = '/img/Verfied.svg';
                  } else {
                    selectVerified.style.display = 'none';
                  }
                } else {
                  // If the element doesn't exist, log an error message
                  console.error("Can't find .select-verified element in newprofile");
                }
                

                // newcard.querySelector('.card-length').innerHTML = hikeLength +"km";
                // newcard.querySelector('.card-text').innerHTML = details;
                // newcard.querySelector('.card-image').src = `./images/${hikeCode}.svg`; //Example: NV01.jpg

                //Activate the readmore button
                //newcard.querySelector('a').href = "eachHike.html?docID="+docID;

                //Optional: give unique ids to all elements for future use
                // newcard.querySelector('.card-title').setAttribute("id", "ctitle" + i);
                // newcard.querySelector('.card-text').setAttribute("id", "ctext" + i);
                // newcard.querySelector('.card-image').setAttribute("id", "cimage" + i);

                //attach to gallery, Example: "hikes-go-here"
                document.getElementById("tradeSelect").appendChild(newprofile);

                //i++;   //Optional: iterate variable to serve as unique ID
            })
        })
}

displayProfileDynamically("tradeUser");  //input param is the name of the collection


function selected(docID){
  db.collection("tradeUser").doc(docID).get().then(doc => {
    // Navigate to the new page and pass the document name as a query string parameter
    window.location.href = "TradeProfile.html?docName=" + doc.id;
});
}