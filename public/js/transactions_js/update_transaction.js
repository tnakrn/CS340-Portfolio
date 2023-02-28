// Prevent default action for submitting update transaction
let updateTransactionForm = document.getElementById("update-transaction-form");
updateTransactionForm.addEventListener("submit", function(e) {
    e.preventDefault();
});

function updateTransaction(transactionID, playerID){
    // Put our data we want to send in a javascript object
    let data = {
        transactionID: transactionID,
        playerID: playerID,
    }

    // Setup our request
    var xhttp = new XMLHttpRequest();
    xhttp.open("PUT", "/update-transaction", true);
    xhttp.setRequestHeader("Content-type", "application/json");

    
    // Tell our request how to resolve
    xhttp.onreadystatechange = () => {
        if (xhttp.readyState == 4 && xhttp.status == 200) {
            // Add the new data to the table
            updateRow(xhttp.response, transactionID);

        }
        else if (xhttp.readyState == 4 && xhttp.status != 200) {
            alert("There was an error with the input.")
        }
    }

    // Send the request and wait for the response
    xhttp.send(JSON.stringify(data));

}

function updateRow(data, transactionID){
    let parsedData = JSON.parse(data);
    
    let table = document.getElementById("transaction-table");
    let selectTransaction = document.getElementById("input-transactionIDNew");

    for (let i = 0, row; row = table.rows[i]; i++) {
    //iterate through rows
    //rows would be accessed using the "row" variable assigned in the for loop
        if (table.rows[i].getAttribute("data-value") == transactionID) {
                // Get the location of the row where we found the matching transaction ID
                let updateRowIndex = table.getElementsByTagName("tr")[i];

                // Get td of player value
                let td = updateRowIndex.getElementsByTagName("td")[2];

                // Reassign player to our value we updated to
                td.innerText = parsedData[i-1].player;

                // Update the select menu with the new transaction date and player value pair
                let updateOption = selectTransaction.children[i-1];
                updateOption.removeChild(updateOption.firstChild);
                let updateOptionText = document.createTextNode(`${parsedData[i-1].transactionDate}, ${parsedData[i-1].player}`);
                updateOption.appendChild(updateOptionText);
        }
    }
}