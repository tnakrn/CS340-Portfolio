// Prevent default action for submitting add transaction
let addTransactionForm = document.getElementById("add-transaction-form");
addTransactionForm.addEventListener("submit", function(e) {
    e.preventDefault();
});

function addTransaction(transactionDate, playerID) {
    // Put our data we want to send in a javascript object
    let data = {
        inputTransactionDate: transactionDate,
        inputPlayerID: playerID
    }
    
    // Setup our AJAX request
    var xhttp = new XMLHttpRequest();
    xhttp.open("POST", "/add-transaction-form", true);
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
    let currentTable = document.getElementById("transaction-table");

    // Get a reference to the new row from the database query (last object)
    let parsedData = JSON.parse(data);
    let newRow = parsedData[parsedData.length - 1]

    // Create a row and 4 cells'
    let transactionIDInt = parseInt(newRow.transactionID);
    let row = document.createElement("TR");
    row.setAttribute("data-value", `${transactionIDInt}`);
    let idCell = document.createElement("TD");
    let transactionDateCell = document.createElement("TD");
    let playerCell = document.createElement("TD");
    let deleteCell = document.createElement("TD");

    // Fill the cells with correct data
    idCell.innerText = newRow.transactionID;
    transactionDateCell.innerText = newRow.transactionDate;
    playerCell.innerText = newRow.player;
    deleteCell.innerHTML = `<button onclick='deleteTransaction(${transactionIDInt})'>Delete</button>`

    // Add the cells to the row 
    row.appendChild(idCell);
    row.appendChild(transactionDateCell);
    row.appendChild(playerCell);
    row.appendChild(deleteCell)
    
    // Add the row to the table
    currentTable.appendChild(row);

    // Add an option to the update transaction select menu
    let selectTransaction = document.getElementById("input-transactionIDNew");
    let newOption = document.createElement("OPTION");
    newOption.setAttribute("value", `${transactionIDInt}`);
    let newOptionText = document.createTextNode(`${newRow.transactionDate}, ${newRow.player}`);
    newOption.appendChild(newOptionText);
    selectTransaction.appendChild(newOption);

}