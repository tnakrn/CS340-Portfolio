# TrapperDB - A MySQL Based Website Using Handlebars Templating Engine in JavaScript
<h3> Authors: Christine Kuran and Alden Chico </h3>
<h2> Introduction </h2>
TrapperDB is a website project that uses sample data from Rockstar Game's award-winning title Red Dead Redemption 2 and an imaginary player base based on characters from the game. In this project, we created a DDL.sql file that populates a database with sample data, HTTP methods that execute queries on a MySQL database, and Handlebars files that render the page using the Handlebars templating engine.
<h2> Database </h2>
Our database consists of 7 different tables: GarmentSets, ClothingItems, Ingredients, ClothingIngredients, Players, Transactions, and TransactionDetails. The idea behind our database is that each clothing item is part of a garment set. Every clothing item can be crafted using a set of ingredients. The relationship between ingredients and clothing items (i.e. what ingredients make up what clothing items) is recorded in the ClothingIngredients transaction table. Beyond this, players that use the website are able to save what ingredients they have in their inventory using transactions. Transactions recorded by the players are saved in the TransactionDetails table. The Entity-Relationship Diagram for our database is pictured below: <br/>
<img src= "https://user-images.githubusercontent.com/50260762/219952921-1b520b8f-1b96-4ed0-9c14-931abd867d23.PNG">
