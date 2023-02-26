function updateTransaction(transactionID, playerID){
    // Put our data we want to send in a javascript object
    let data = {
        transactionID: transactionID,
        playerID: playerID,
    }
    
    // Setup our AJAX request
    var xhttp = new XMLHttpRequest();
    xhttp.open("PUT", "/update-transaction", true);
    xhttp.setRequestHeader("Content-type", "application/json");

    // Tell our AJAX request how to resolve
    xhttp.onreadystatechange = () => {
        if (xhttp.readyState == 4 && xhttp.status == 200) {

            // Add the new data to the table
            updateRow(xhttp.response, inputTransactionIDValue);

        }
        else if (xhttp.readyState == 4 && xhttp.status != 200) {
            console.log("There was an error with the input.")
        }
    }

    // Send the request and wait for the response
    xhttp.send(JSON.stringify(data));

}


function updateRow(data, transactionID){
    let parsedData = JSON.parse(data);
    
    let table = document.getElementById("transaction-table");

    for (let i = 0, row; row = table.rows[i]; i++) {
    //iterate through rows
    //rows would be accessed using the "row" variable assigned in the for loop
        if (table.rows[i].getAttribute("data-value") == transactionID) {

                // Get the location of the row where we found the matching transaction ID
                let updateRowIndex = table.getElementsByTagName("tr")[i];

                // Get td of playerID value
                let td = updateRowIndex.getElementsByTagName("td")[2];

                // Reassign playerID to our value we updated to
                td.innerHTML = parsedData[1].name; 
        }
    }
}
