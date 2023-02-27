// Prevent default action for submitting add garment set
let addGarmentSetForm = document.getElementById("add-garmentset-form");
addGarmentSetForm.addEventListener("submit", function(e) {
    e.preventDefault();
});

function addGarmentSet(garmentName, garmentDescription) {
    // Put our data we want to send in a javascript object
    let data = {
        inputGarmentName: garmentName,
        inputGarmentDescription: garmentDescription
    }
    
    // Setup our AJAX request
    var xhttp = new XMLHttpRequest();
    xhttp.open("POST", "/add-garment-set-form", true);
    xhttp.setRequestHeader("Content-type", "application/json");

    // Tell our AJAX request how to resolve
    xhttp.onreadystatechange = () => {
        if (xhttp.readyState == 4 && xhttp.status == 200) {

            // Add the new data to the table
            addRowToTable(xhttp.response);
        }
        else if (xhttp.readyState == 4 && xhttp.status != 200) {
            console.log("There was an error with the input.")
        }
    }
    // Send the request and wait for the response
    xhttp.send(JSON.stringify(data));
}

// Creates a single row in the transactions table
function addRowToTable(data) {

    // Get a reference to the current table on the page and clear it out.
    let currentTable = document.getElementById("garmentsets-table");

    // Get a reference to the new row from the database query (last object)
    let parsedData = JSON.parse(data);
    let newRowData = parsedData[parsedData.length - 1]

    // Create a row and 4 cells
    let row = document.createElement("TR");
    let garmentIDInt = parseInt(newRowData.garmentID);
    row.setAttribute("data-value", `${garmentIDInt}`);
    let idCell = document.createElement("TD");
    let garmentNameCell = document.createElement("TD");
    let garmentDescriptionCell = document.createElement("TD");

    // Fill the cells with correct data
    idCell.innerText = newRowData.garmentID;
    garmentNameCell.innerText = newRowData.garmentName;
    garmentDescriptionCell.innerText = newRowData.garmentDescription;

    // Add the cells to the row 
    row.appendChild(idCell);
    row.appendChild(garmentNameCell);
    row.appendChild(garmentDescriptionCell);
    
    // Add the row to the table
    currentTable.appendChild(row);

}