// Citation for the following code:
// Date: 03/20/2023
// Adapted from CS340 Starter App code
// This is based on CS340 Starter App, but we have our some of code formatted differently (functions,
// parameters, how we are getting our data)
// Source URL: https://github.com/osu-cs340-ecampus/nodejs-starter-app

// Prevent default action for submitting add player
let addPlayerForm = document.getElementById("add-player-form");
addPlayerForm.addEventListener("submit", function (e) {
    e.preventDefault();
});

function addPlayer(userName, firstName, lastName, email, joinDate) {
    // Put our data we want to send in a javascript object
    let data = {
        inputUserName: userName,
        inputFirstName: firstName,
        inputLastName: lastName,
        inputEmail: email,
        inputJoinDate: joinDate
    }

    // Setup our request
    var xhttp = new XMLHttpRequest();
    xhttp.open("POST", "/add-player-form", true);
    xhttp.setRequestHeader("Content-type", "application/json");

    // Tell our request how to resolve
    xhttp.onreadystatechange = () => {
        if (xhttp.readyState == 4 && xhttp.status == 200) {
            // Add the new data to the table
            addRowToTable(xhttp.response);
        }
        else if (xhttp.status == 401) {
            // Show an alert if the user tries to enter a non-unique username
            alert("Please submit a unique username.");
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
    let currentTable = document.getElementById("players-table");

    // Get a reference to the new row from the database query (last object)
    let parsedData = JSON.parse(data);
    let newRowData = parsedData[parsedData.length - 1]

    // Create a row and cells
    let row = document.createElement("TR");
    let playerIDInt = parseInt(newRowData.playerID);
    row.setAttribute("data-value", `${playerIDInt}`);
    let idCell = document.createElement("TD");
    let userNameCell = document.createElement("TD");
    let firstNameCell = document.createElement("TD");
    let lastNameCell = document.createElement("TD");
    let emailCell = document.createElement("TD");
    let joinDateCell = document.createElement("TD");

    // Fill the cells with correct data
    idCell.innerText = newRowData.playerID;
    userNameCell.innerText = newRowData.userName;
    firstNameCell.innerText = newRowData.firstName;
    lastNameCell.innerText = newRowData.lastName;
    emailCell.innerText = newRowData.email;
    joinDateCell.innerText = newRowData.joinDate;

    // Add the cells to the row 
    row.appendChild(idCell);
    row.appendChild(userNameCell);
    row.appendChild(firstNameCell);
    row.appendChild(lastNameCell);
    row.appendChild(emailCell);
    row.appendChild(joinDateCell);

    // Add the row to the table
    currentTable.appendChild(row);

}