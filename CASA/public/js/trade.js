//------------------------------------------------------------------------------
// Input parameter is a string representing the collection we are reading from
//------------------------------------------------------------------------------

function displayProfileDynamically(collection) {
    let profileTemplate = document.getElementById("tradeSelectTemplate");

    db.collection(collection).get()
        .then(allTrades => {
            allTrades.forEach(doc => {
                var name = doc.data().Name;
                var tags = doc.data().tradeTags;
                var bName = doc.data().bName;
                var nNum = doc.data().bNum;
                var distance = doc.data().distance;
                var email = doc.data().email;
                var verified = doc.data().tradeVerfied;

                let newprofile = profileTemplate.content.cloneNode(true);

                newprofile.querySelector('.select-picture').src = '../../public/img/TradeProfile.svg';
                newprofile.querySelector('.name-field').innerText = name;
                newprofile.querySelector('.trade-tags-field').innerText = tags.join(', ');
                newprofile.querySelector('.bname-field').innerText = bName;
                newprofile.querySelector('.nnum-field').innerText = nNum;
                newprofile.querySelector('.distance-field').innerText = distance;
                newprofile.querySelector('.email-field').innerText = email;

                const selectVerified = newprofile.querySelector('.verified-field');
                if (selectVerified) {
                  if (verified) {
                    selectVerified.src = '../../public/img/Verfied.svg';
                  } else {
                    selectVerified.style.display = 'none';
                  }
                } else {
                  console.error("Can't find .select-verified element in newprofile");
                }

                document.getElementById("tradeSelect").appendChild(newprofile);
            })
        })
}

displayProfileDynamically("tradeUser"); //input param is the name of the collection


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


