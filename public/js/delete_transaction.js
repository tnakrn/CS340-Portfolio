function deleteTransaction(transactionID) {
    // Put transactionID in a JSON object
    let data = {
        id: transactionID
    };

    // Set up the DELETE request
    var xhttp = new XMLHttpRequest();
    xhttp.open("DELETE", "/delete-transaction", true);
    xhttp.setRequestHeader("Content-type", "application/json");

    // Resolve
    xhttp.onreadystatechange = () => {
        if (xhttp.readyState == 4 && xhttp.status == 204) {

            // Remove the data from the table
            deleteRow(transactionID);

        }
        else if (xhttp.readyState == 4 && xhttp.status != 204) {
            console.log("There was an error with the input.")
        }
    }
    // Send the request and wait for the response
    xhttp.send(JSON.stringify(data));
}


function deleteRow(transactionID){

    let table = document.getElementById("transaction-table");
    for (let i = 0, row; row = table.rows[i]; i++) {
       // Iterate through rows
       // Delete row with matching transactionID
       if (table.rows[i].getAttribute("data-value") == transactionID) {
            table.deleteRow(i);
            break;
       }
    }
}