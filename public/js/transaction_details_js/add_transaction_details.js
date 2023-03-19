// Citation for the following code:
// Date: 03/20/2023
// Adapted from CS340 Starter App code
// This is based on CS340 Starter App, but we have our some of code formatted differently (functions,
// parameters, how we are getting our data)
// Source URL: https://github.com/osu-cs340-ecampus/nodejs-starter-app

// Prevent default action for submitting add transaction
let addTransactionDetailForm = document.getElementById("add-transactiondetail-form");
addTransactionDetailForm.addEventListener("submit", function (e) {
    e.preventDefault();
});

function addTransactionDetails(transactionID, ingredientID, ingredientQty) {
    // Put our data we want to send in a javascript object
    let data = {
        inputTransactionID: transactionID,
        inputIngredientID: ingredientID,
        inputIngredientQty: ingredientQty
    }

    // Setup our request
    var xhttp = new XMLHttpRequest();
    xhttp.open("POST", "/add-transaction-details-form", true);
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
    let currentTable = document.getElementById("transactiondetails-table");

    // Get a reference to the new row from the database query (last object)
    let parsedData = JSON.parse(data);
    let newRowData = parsedData[parsedData.length - 1]

    // Create a row and 4 cells
    let transactionDetailsIDInt = parseInt(newRowData.transactionDetailsID);
    let row = document.createElement("TR");
    row.setAttribute("data-value", `${transactionDetailsIDInt}`);
    let idCell = document.createElement("TD");
    let transactionDetailsCell = document.createElement("TD");
    let ingredientNameCell = document.createElement("TD");
    let ingredientQtyCell = document.createElement("TD");

    // Fill the cells with correct data
    idCell.innerText = newRowData.transactionDetailsID;
    transactionDetailsCell.innerText = newRowData.transactionDetails;
    ingredientNameCell.innerText = newRowData.ingredientName;
    ingredientQtyCell.innerText = newRowData.ingredientQty;

    // Add the cells to the row 
    row.appendChild(idCell);
    row.appendChild(transactionDetailsCell);
    row.appendChild(ingredientNameCell);
    row.appendChild(ingredientQtyCell)

    // Add the row to the table
    currentTable.appendChild(row);
}