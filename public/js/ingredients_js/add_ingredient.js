// Prevent default action for submitting add ingredient
let addIngredientForm = document.getElementById("add-ingredient-form");
addIngredientForm.addEventListener("submit", function (e) {
    e.preventDefault();
});

function addIngredient(ingredientName, ingredientDescription) {
    // Put our data we want to send in a javascript object
    let data = {
        inputIngredientName: ingredientName,
        inputIngredientDescription: ingredientDescription
    }

    // Setup our request
    var xhttp = new XMLHttpRequest();
    xhttp.open("POST", "/add-ingredient-form", true);
    xhttp.setRequestHeader("Content-type", "application/json");

    // Tell our request how to resolve
    xhttp.onreadystatechange = () => {
        if (xhttp.readyState == 4 && xhttp.status == 200) {
            // Add the new data to the table
            addRowToTable(xhttp.response);
        }
        else if (xhttp.status == 401) {
            // Show an alert if the user tries to enter a non-unique Garment Set name
            alert("Please submit a unique Ingredient name.");
        }
        else if (xhttp.readyState == 4 && xhttp.status != 200) {
            alert("There was an error with the input.");
        }
    }
    // Send the request and wait for the response
    xhttp.send(JSON.stringify(data));
}

// Creates a single row in the transactions table
function addRowToTable(data) {

    // Get a reference to the current table on the page and clear it out.
    let currentTable = document.getElementById("ingredients-table");

    // Get a reference to the new row from the database query (last object)
    let parsedData = JSON.parse(data);
    let newRowData = parsedData[parsedData.length - 1]

    // Create a row and cells
    let row = document.createElement("TR");
    let ingredientIDInt = parseInt(newRowData.ingredientID);
    row.setAttribute("data-value", `${ingredientIDInt}`);
    let idCell = document.createElement("TD");
    let ingredientNameCell = document.createElement("TD");
    let ingredientDescriptionCell = document.createElement("TD");

    // Fill the cells with correct data
    idCell.innerText = newRowData.ingredientID;
    ingredientNameCell.innerText = newRowData.ingredientName;
    ingredientDescriptionCell.innerText = newRowData.ingredientDescription;

    // Add the cells to the row 
    row.appendChild(idCell);
    row.appendChild(ingredientNameCell);
    row.appendChild(ingredientDescriptionCell);

    // Add the row to the table
    currentTable.appendChild(row);

}