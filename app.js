/*
    SETUP
*/

// Express
var express = require('express');
var app = express();
app.use(express.json())
app.use(express.urlencoded({ extended: true }))
app.use(express.static('public'))

PORT = 31598;

// Database
var db = require('./database/db-connector');

// Handlebars
var exphbs = require('express-handlebars');
const { query } = require('express');
app.engine('.hbs', exphbs.engine({
    extname: ".hbs"
}));
app.set('view engine', '.hbs');

// Static Files
app.use(express.static('public'));

/*
    ROUTES
*/

// Render home page
app.get('/', function (req, res) {
    res.render('index');
});

// Read players table query
app.get('/players', function (req, res) {
    let query1 = "SELECT playerID, userName, firstName, lastName, email, CONCAT(joinDate) AS joinDate FROM Players;";

    db.pool.query(query1, function (error, rows, fields) {

        res.render('players', { data: rows });
    })
});

// Create player query



// Read garment sets table query
app.get('/garmentsets', function (req, res) {
    let query1 = "SELECT * FROM GarmentSets;";

    db.pool.query(query1, function (error, rows, fields) {

        res.render('garmentsets', { data: rows });
    })
});

// Create garment set query
app.post('/add-garment-set-form', function(req, res) {
    let data = req.body;
    let query1 = `INSERT INTO GarmentSets (garmentName, garmentDescription) \
                    VALUES ('${data.inputGarmentName}', '${data.inputGarmentDescription}')`
    db.pool.query(query1, function(error, rows, fields) {
        if (error) {
            console.log(error);
            res.sendStatus(400);
        }
        else {
            let query2 = 'SELECT garmentID, garmentName, garmentDescription FROM GarmentSets';
            db.pool.query(query2, function(error, rows, fields) {
                if (error) {
                    console.log(error);
                    res.sendStatus(400);
                }
                else {
                    res.send(rows);
                }
            })
        }
    });
});

// Read clothing items table query 
app.get('/clothingitems', function (req, res) {
    // Fill table
    let query1 = 'SELECT clothingID, clothingName, clothingDescription, GarmentSets.garmentName AS garmentName \
    FROM ClothingItems \
    INNER JOIN GarmentSets ON ClothingItems.garmentID = GarmentSets.garmentID;';
    // To populate drop down
    let query2 = 'SELECT garmentID, garmentName FROM GarmentSets;';

    db.pool.query(query1, function (err, rows, fields) {

        let clothingitems = rows;

        db.pool.query(query2, function (err, rows, fields) {

            let garments = rows;

            res.render('clothingitems', { data: clothingitems, garments: garments });
        });
    });
});


// Create clothing item query


// Update clothing item (NEED TO HAVE A FUNCTION TO UPDATE FK TO NULL)


// Read ingredients table query
app.get('/ingredients', function (req, res) {
    let query1 = "SELECT * FROM Ingredients;";

    db.pool.query(query1, function (error, rows, fields) {

        res.render('ingredients', { data: rows });
    })
});

// Read clothing ingredients table query
app.get('/clothingingredients', function (req, res) {
    // Fill table
    let query1 = 'SELECT clothingIngredientsID, ClothingItems.clothingName AS clothingName, Ingredients.ingredientName AS ingredientName, ingredientQty \
    FROM ClothingIngredients \
    INNER JOIN ClothingItems ON ClothingIngredients.clothingID = ClothingItems.clothingID \
    INNER JOIN Ingredients ON ClothingIngredients.ingredientID = Ingredients.ingredientID;';
    // To populate drop down for clothing
    let query2 = 'SELECT clothingID, clothingName FROM ClothingItems;';
    // To populate drop down for ingredients
    let query3 = 'SELECT ingredientID, ingredientName FROM Ingredients;';


    db.pool.query(query1, function (err, rows, fields) {

        let clothingingredients = rows;

        db.pool.query(query2, function (err, rows, fields) {

            let clothingitems = rows;

            db.pool.query(query3, function (err, rows, fields) {

                let ingredients = rows;

                res.render('clothingingredients', { data: clothingingredients, clothingitems: clothingitems, ingredients: ingredients });
            });
        });
    });
});


// Create clothing ingredient query


// Read transactions table query 
app.get('/transactions', function (req, res) {
    // Fill table
    let query1 = 'SELECT transactionID, CONCAT(transactionDate) AS transactionDate, Players.userName AS player \
    FROM Transactions \
    INNER JOIN Players ON Transactions.playerID = Players.playerID;';
    // To populate drop down
    let query2 = 'SELECT playerID, userName FROM Players;';

    db.pool.query(query1, function (err, rows, fields) {

        let transactions = rows;

        db.pool.query(query2, function (err, rows, fields) {

            let players = rows;

            res.render('transactions', { data: transactions, players: players });
        });
    });
});

// Create transaction query
app.post('/add-transaction-form', function(req, res) {
    let data = req.body;
    let query1 = `INSERT INTO Transactions (transactionDate, playerID) VALUES ('${data.inputTransactionDate}', ${data.inputPlayerID})`;
    db.pool.query(query1, function(error, rows, fields) {
        if (error) {
            console.log(error);
            res.sendStatus(400);
        }
        else {
            let query2 = 'SELECT transactionID, CONCAT(transactionDate) AS transactionDate, Players.userName AS player \
                            FROM Transactions \
                            INNER JOIN Players ON Transactions.playerID = Players.playerID;';
            db.pool.query(query2, function(error, rows, fields) {
                if (error) {
                    console.log(error);
                    res.sendStatus(400);
                }
                else {
                    res.send(rows);
                }
            })
        }
    });
});

 
// Update transaction query
app.put("/update-transaction", function(req, res) {
    let data = req.body;

    let transactionID = data.transactionID;
    let playerID = data.playerID;

    let queryUpdateTransaction = `UPDATE Transactions SET playerID = ? where transactionID = ?`;

    db.pool.query(queryUpdateTransaction, [playerID, transactionID], function(error, rows, fields) {
        if (error) {
            console.log(error);
            res.sendStatus(400);
        }
        else {
            let query2 = 'SELECT transactionID, CONCAT(transactionDate) AS transactionDate, Players.userName AS player \
                            FROM Transactions \
                            INNER JOIN Players ON Transactions.playerID = Players.playerID';
            db.pool.query(query2, [transactionID], function(error, rows, fields) {
                if (error) {
                    console.log(error);
                    res.sendStatus(400);
                }
                else {
                    //console.log(rows);
                    res.send(rows);
                }
            })
        }
    });
}); 

// Delete transaction query
app.delete("/delete-transaction", function(req, res, next) {
    let data = req.body;
    let transactionID = parseInt(data.id);
    let deleteFromTransactionsQuery = `DELETE FROM Transactions WHERE transactionID = ?`;

    db.pool.query(deleteFromTransactionsQuery, [transactionID], function(error, rows, fields) {
        if (error) {
            console.log(error);
            res.sendStatus(400);
        } 
        else {
            res.sendStatus(204); 
        }
    });
});  

// Read transaction details table query
app.get('/transactiondetails', function (req, res) {
    // Fill table
    let query1 = 'SELECT TransactionDetails.transactionDetailsID, CONCAT(Transactions.transactionDate, ", ", subquery1.userName) AS transactionDetails, Ingredients.ingredientName, TransactionDetails.ingredientQty \
    FROM \
    ( \
        SELECT transactionID, Players.userName \
        FROM Transactions \
        INNER JOIN Players ON Transactions.playerID = Players.playerID \
    ) AS subquery1 \
    INNER JOIN TransactionDetails ON subquery1.transactionID = TransactionDetails.transactionID \
    INNER JOIN Transactions ON TransactionDetails.transactionID = Transactions.transactionID \
    INNER JOIN Ingredients ON TransactionDetails.ingredientID = Ingredients.ingredientID;';
    // To populate drop down for clothing
    let query2 = 'SELECT transactionID, CONCAT(transactionDate) AS transactionDate, Players.userName AS player \
    FROM Transactions \
    INNER JOIN Players ON Transactions.playerID = Players.playerID;';
    // To populate drop down for ingredients
    let query3 = 'SELECT ingredientID, ingredientName FROM Ingredients;';

    db.pool.query(query1, function (err, rows, fields) {

        let transactiondetails = rows;

        db.pool.query(query2, function (err, rows, fields) {

            let transactions = rows;

            db.pool.query(query3, function (err, rows, fields) {

                let ingredients = rows;

                res.render('transactiondetails', { data: transactiondetails, transactions: transactions, ingredients: ingredients });
            });
        });
    });
});

// Create transaction detail query


/*
    LISTENER
*/
app.listen(PORT, function () {
    console.log('Express started on http://localhost:' + PORT + '; press Ctrl-C to terminate.')
});