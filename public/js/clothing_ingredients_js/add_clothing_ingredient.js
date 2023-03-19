// Citation for the following code:
// Date: 03/20/2023
// Adapted from CS340 Starter App code
// This is based on CS340 Starter App, but we have our some of code formatted differently (functions,
// parameters, how we are getting our data)
// Source URL: https://github.com/osu-cs340-ecampus/nodejs-starter-app

// Prevent default action for submitting 
let addClothingIngredientForm = document.getElementById("add-clothingingredient-form");
addClothingIngredientForm.addEventListener("submit", function (e) {
    e.preventDefault();
});

function addClothingIngredient(clothingID, ingredientID, ingredientQty) {
    // Put our data we want to send in a javascript object
    let data = {
        inputClothingID: clothingID,
        inputIngredientID: ingredientID,
        inputIngredientQty: ingredientQty
    }

    // Setup our request
    var xhttp = new XMLHttpRequest();
    xhttp.open("POST", "/add-clothing-ingredient-form", true);
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
    let currentTable = document.getElementById("clothingingredients-table");

    // Get a reference to the new row from the database query (last object)
    let parsedData = JSON.parse(data);
    let newRowData = parsedData[parsedData.length - 1]

    // Create a row and cells
    let clothingIngredientsIDInt = parseInt(newRowData.clothingIngredientsID);
    let row = document.createElement("TR");
    row.setAttribute("data-value", `${clothingIngredientsIDInt}`);
    let idCell = document.createElement("TD");
    let clothingNameCell = document.createElement("TD");
    let ingredientNameCell = document.createElement("TD");
    let ingredientQtyCell = document.createElement("TD");

    // Fill the cells with correct data
    idCell.innerText = newRowData.clothingIngredientsID;
    clothingNameCell.innerText = newRowData.clothingName;
    ingredientNameCell.innerText = newRowData.ingredientName;
    ingredientQtyCell.innerText = newRowData.ingredientQty;

    // Add the cells to the row 
    row.appendChild(idCell);
    row.appendChild(clothingNameCell);
    row.appendChild(ingredientNameCell);
    row.appendChild(ingredientQtyCell)

    // Add the row to the table
    currentTable.appendChild(row);
}