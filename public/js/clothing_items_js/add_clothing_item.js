// Prevent default action for submitting add transaction
let addClothingItemForm = document.getElementById("add-clothingitem-form");
addClothingItemForm.addEventListener("submit", function (e) {
    e.preventDefault();
});

function addClothingItem(clothingName, clothingDescription, garmentID) {
    // Put our data we want to send in a javascript object
    let data = {
        inputClothingName: clothingName,
        inputClothingDescription: clothingDescription,
        inputGarmentID: garmentID
    }

    // Setup our request
    var xhttp = new XMLHttpRequest();
    xhttp.open("POST", "/add-clothing-item-form", true);
    xhttp.setRequestHeader("Content-type", "application/json");

    // Tell our request how to resolve
    xhttp.onreadystatechange = () => {
        if (xhttp.readyState == 4 && xhttp.status == 200) {
            // Add the new data to the table
            addRowToTable(xhttp.response);
        }
        else if (xhttp.readyState == 4 && xhttp.status != 200) {
            alert("There was an error with the input.")
        }
    }
    // Send the request and wait for the response
    xhttp.send(JSON.stringify(data));
}

// Creates a single row in the transactions table
function addRowToTable(data) {

    // Get a reference to the current table on the page and clear it out.
    let currentTable = document.getElementById("clothingitems-table");

    // Get a reference to the new row from the database query (last object)
    let parsedData = JSON.parse(data);
    let newRowData = parsedData[parsedData.length - 1]

    // Create a row and cells
    let clothingIDInt = parseInt(newRowData.clothingID);
    let row = document.createElement("TR");
    row.setAttribute("data-value", `${clothingIDInt}`);
    let idCell = document.createElement("TD");
    let clothingNameCell = document.createElement("TD");
    let clothingDescriptionCell = document.createElement("TD");
    let garmentNameCell = document.createElement("TD");

    // Fill the cells with correct data
    idCell.innerText = newRowData.clothingID;
    clothingNameCell.innerText = newRowData.clothingName;
    clothingDescriptionCell.innerText = newRowData.clothingDescription;
    garmentNameCell.innerText = newRowData.garmentName;

    // Add the cells to the row 
    row.appendChild(idCell);
    row.appendChild(clothingNameCell);
    row.appendChild(clothingDescriptionCell);
    row.appendChild(garmentNameCell)

    // Add the row to the table
    currentTable.appendChild(row);

    // Add an option to the update transaction select menu
    let selectTransaction = document.getElementById("input-clothingNameNew");
    let newOption = document.createElement("OPTION");
    newOption.setAttribute("value", `${clothingIDInt}`);
    let newOptionText = document.createTextNode(`${newRowData.clothingName}`);
    newOption.appendChild(newOptionText);
    selectTransaction.appendChild(newOption);

}