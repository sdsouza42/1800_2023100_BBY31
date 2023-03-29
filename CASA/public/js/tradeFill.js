//------------------------------------------------------------------------------
// Input parameter is a string representing the collection we are reading from
//------------------------------------------------------------------------------

db.collection(collection, selectedTags).get()
.then(allTrades => {
    allTrades.forEach(doc => {
        var tradeTags = doc.data().tradeTags;

        // Check if any of the selectedTags are present in the tradeTags
        var tagMatch = tradeTags.some(tag => selectedTags.includes(tag));

        // If there's a match or there are no selectedTags, create a new profile and append it
        if (selectedTags.length === 0 || tagMatch) {
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
            }
        });
    });

    let filtersString = urlParams.get('filters');
    let selectedFilters = filtersString ? JSON.parse(decodeURIComponent(filtersString)) : [];
    displayProfileDynamically("tradeUser", selectedFilters);

    