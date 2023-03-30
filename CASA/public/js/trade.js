//------------------------------------------------------------------------------
// Input parameter is a string representing the collection we are reading from
//------------------------------------------------------------------------------
//Profile creation
function displayProfileDynamically(collection) {
  let profileTemplate = document.getElementById("tradeSelectTemplate");

  db.collection(collection).get()
      .then(allTrades => {
          let profileCounter = 0; // Initialize the profileCounter
          allTrades.forEach(doc => {
              var name = doc.data().Name;
              var tags = doc.data().tradeTags;
              var bName = doc.data().bName;
              var nNum = doc.data().bNum;
              var distance = doc.data().distance;
              var email = doc.data().email;
              var verified = doc.data().tradeVerfied;

              let newprofile = profileTemplate.content.cloneNode(true);

              // Update the id attribute
              newprofile.querySelector('.row').id = `profile${profileCounter}`;

              newprofile.querySelector('.select-picture').src = '/img/TradeProfile.svg';
              newprofile.querySelector('.name-field').innerText = name;
              newprofile.querySelector('.trade-tags-field').innerText = tags.join(', ');
              newprofile.querySelector('.bname-field').innerText = bName;
              newprofile.querySelector('.nnum-field').innerText = nNum;
              newprofile.querySelector('.distance-field').innerText = distance;
              newprofile.querySelector('.email-field').innerText = email;

              const selectVerified = newprofile.querySelector('.verified-field');
              if (selectVerified) {
                if (verified) {
                  selectVerified.src = '/img/Verfied.svg';
                } else {
                  selectVerified.style.display = 'none';
                }
              } else {
                console.error("Can't find .select-verified element in newprofile");
              }

              document.getElementById("tradeSelect").appendChild(newprofile);

              profileCounter++; // Increment the profileCounter
          })
      })
}

displayProfileDynamically("tradeUser"); //input param is the name of the collection


//Filter display logic
document.addEventListener('DOMContentLoaded', function() {
  // Get the filter button and form elements
  var filterButton = document.querySelector('.btn-info');
  var form = document.querySelector('#filter-form');

  // Toggle the visibility of the form when the filter button is clicked
  filterButton.addEventListener('click', function(e) {
      e.preventDefault();
      form.style.display = form.style.display === 'none' ? '' : 'none';
  });
});

defaultButton.addEventListener('click', function(e) {
  e.preventDefault();
  var checkboxes = document.querySelectorAll('.form-check-input');
  checkboxes.forEach(function(checkbox) {
      checkbox.checked = true;
  });
});

// Filter being applied
document.addEventListener("DOMContentLoaded", function () {
  const applyFiltersButton = document.getElementById("applyFilters");
  const defaultButton = document.getElementById("defaultButton");

  function applyNewFilter() {
    // Get all the filter checkboxes
    const filterCheckboxes = document.querySelectorAll('.form-check-input');
    
    // Collect the selected filters
    const selectedFilters = [];
    console.log("being called");
    filterCheckboxes.forEach(checkbox => {
      console.log("being called");
      if (checkbox.checked) {
        selectedFilters.push(checkbox.value);
      }
    });
  
    // Iterate through all the profile elements
    const profileElements = document.querySelectorAll('.row[id^="profile"]');
    profileElements.forEach(profile => {
      const tradeTagsField = profile.querySelector('.trade-tags-field');
      const tradeTags = tradeTagsField.innerText.split(', ');
      const tradeTagsLowerCase = tradeTags.map(tag => tag.toLowerCase());
      const selectedFiltersLowerCase = selectedFilters.map(filter => filter.toLowerCase());
      // Check if any of the trade tags match the selected filters
      console.log(selectedFiltersLowerCase);
      console.log(tradeTagsLowerCase);
      let tagMatchFound = tradeTagsLowerCase.some(tag => selectedFiltersLowerCase.includes(tag));
      

  
      // Set the display to 'flex' if there's a match, otherwise set it to 'none'
      profile.style.display = tagMatchFound ? 'flex' : 'none';
    });
  }

  function resetFilters() {
    const checkboxes = document.querySelectorAll("input[type=checkbox]");
    const trades = document.querySelectorAll("#tradeSelect .row.mb-4");

    trades.forEach(trade => {
      trade.style.display = "flex";
    });

    checkboxes.forEach(checkbox => {
      checkbox.checked = true;
    });
  }

  // Add event listeners for the buttons
  applyFiltersButton.addEventListener('click', applyNewFilter);
  defaultButton.addEventListener('click', resetFilters);

}); // Add this closing curly brace and parenthesis





//Contact details
document.addEventListener('DOMContentLoaded', function () {
  document.addEventListener('click', function (event) {
      if (event.target.matches('.more-info-button') || event.target.closest('.more-info-button')) {
          var button = event.target.closest('.more-info-button');
          var moreInfoSection = button.closest('.row.mb-4').querySelector('#more-info');
          var arrowIcon = button.querySelector('svg');

          if (moreInfoSection.style.display === 'none') {
              moreInfoSection.style.display = 'flex';
              arrowIcon.outerHTML = `
                  <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" fill="currentColor" class="bi bi-arrow-up-short" viewBox="0 0 16 16">
                      <path fill-rule="evenodd" d="M8 12a.5.5 0 0 0 .5-.5V5.707l2.146 2.147a.5.5 0 0 0 .708-.708l-3-3a.5.5 0 0 0-.708 0l-3 3a.5.5 0 1 0 .708.708L7.5 5.707V11.5a.5.5 0 0 0 .5.5z"></path>
                  </svg>`;
          } else {
              moreInfoSection.style.display = 'none';
              arrowIcon.outerHTML = `
                  <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" fill="currentColor" class="bi bi-arrow-down-short" viewBox="0 0 16 16">
                      <path fill-rule="evenodd" d="M8 4a.5.5 0 0 1 .5.5v5.793l2.146-2.147a.5.5 0 0 1 .708.708l-3 3a.5.5 0 0 1-.708 0l-3-3a.5.5 0 1 1 .708-.708L7.5 10.293V4.5A.5.5 0 0 1 8 4z"></path>
                  </svg>`;
          }
      }
  });
});



