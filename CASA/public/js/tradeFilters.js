function applyFilters() {
    let selectedTags = [];

    // Get all filter checkboxes
    let checkboxes = document.querySelectorAll(".form-check-input");

    // Iterate through the checkboxes and add the selected tags to the array
    checkboxes.forEach(checkbox => {
        if (checkbox.checked) {
            selectedTags.push(checkbox.value);
        }
    });

    // If no tags are selected, show an alert and return early
    if (selectedTags.length === 0) {
        alert("Please select at least one filter.");
        return;
    }

    // Convert the array to a JSON string
    let filtersString = JSON.stringify(selectedTags);

    // Encode the filtersString as a URI component and redirect to the main page
    window.location.href = `./TradeSelectFiltered.html?filters=${encodeURIComponent(filtersString)}`;
}

document.getElementById('applyFilters').addEventListener('click', applyFilters);
