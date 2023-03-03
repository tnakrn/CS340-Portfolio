// Prevent default action for submitting update clothing item form
let updateClothingItemForm = document.getElementById("update-clothing-item-form");
updateClothingItemForm.addEventListener("submit", function(e) {
    e.preventDefault();
});

function updateClothingItem(clothingID, clothingDescription, garmentID){
    // Put our data we want to send in a javascript object
    let data = {
        clothingID: clothingID,
        clothingDescription: clothingDescription,
        garmentID: garmentID
    }

    // Setup our request
    var xhttp = new XMLHttpRequest();
    xhttp.open("PUT", "/update-clothing-item", true);
    xhttp.setRequestHeader("Content-type", "application/json");

    
    // Tell our request how to resolve
    xhttp.onreadystatechange = () => {
        if (xhttp.readyState == 4 && xhttp.status == 200) {
            // Add the new data to the table
            updateRow(xhttp.response, clothingID);

        }
        else if (xhttp.readyState == 4 && xhttp.status != 200) {
            alert("There was an error with the input.")
        }
    }

    // Send the request and wait for the response
    xhttp.send(JSON.stringify(data));

}

function updateRow(data, clothingID){
    let parsedData = JSON.parse(data);
    
    let table = document.getElementById("clothingitems-table");

    for (let i = 0, row; row = table.rows[i]; i++) {
    //iterate through rows
    //rows would be accessed using the "row" variable assigned in the for loop
        if (table.rows[i].getAttribute("data-value") == clothingID) {
                // Get the location of the row where we found the matching transaction ID
                let updateRowIndex = table.getElementsByTagName("tr")[i];

                // Get td of player value
                let tdDescription = updateRowIndex.getElementsByTagName("td")[2];
                let tdGarmentName = updateRowIndex.getElementsByTagName("td")[3];

                // Reassign player to our value we updated to
                tdDescription.innerText = parsedData[i-1].clothingDescription;
                tdGarmentName.innerText = parsedData[i-1].garmentName;
        }
    }
}