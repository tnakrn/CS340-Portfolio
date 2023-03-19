# TrapperDB - A MySQL Based Website Using Handlebars Templating Engine in JavaScript
<h3> Authors: Christine Kuran and Alden Chico </h3>
<h2> Introduction </h2>
TrapperDB is a website project that uses sample data from Rockstar Game's award-winning title <i>Red Dead Redemption 2</i> and an imaginary player base based on characters from the game. In this project, we created a DDL.sql file that populates a database with sample data, HTTP methods that execute queries on a MySQL database, and Handlebars files that render the page using the Handlebars templating engine.
<h2> Database </h2>
Our database consists of 7 different tables: GarmentSets, ClothingItems, Ingredients, ClothingIngredients, Players, Transactions, and TransactionDetails. The idea behind our database is that each clothing item is part of a garment set. Every clothing item can be crafted using a set of ingredients. The relationship between ingredients and clothing items (i.e. what ingredients make up what clothing items) is recorded in the ClothingIngredients transaction table. Beyond this, players that use the website are able to save what ingredients they have in their inventory using transactions. Transactions recorded by the players are saved in the TransactionDetails table. The Entity-Relationship Diagram for our database is pictured below: <br/>
<img src= "https://user-images.githubusercontent.com/50260762/219952921-1b520b8f-1b96-4ed0-9c14-931abd867d23.PNG">
<b>DDL.sql</b> contains all the sample data for the website. Running this SQL file on a MySql database will download all the sample data into the user's personal MySql database which is used to showcase the functionality of the website.
<h2> The Website and CRUD Functionalities </h2>
Interacting with the database can be handled by navigating to the different pages on the website and submitting forms on each of the webpages. The backend code in app.js contains all the route handlers that are used to query the website's database. The frontend handlebars code dynamically updates the website's user interface as the user interacts with all the different forms on the website. Screenshots for the website and the corresponding CRUD functions that are implemented in each page are shown below.</br></br>
<b>READ & CREATE Players Page</b>
<img src= "https://user-images.githubusercontent.com/50260762/226163566-aba6e7e7-18b4-42bd-8e00-0090bf2ffd48.PNG"></br>
<b>READ & CREATE Garment Sets Page</b>
<img src= "https://user-images.githubusercontent.com/50260762/226163934-bf168074-4fe7-4a64-9005-700fb225dddd.PNG"></br>
<b>READ, CREATE & UPDATE Clothing Items Page</b>
<img src= "https://user-images.githubusercontent.com/50260762/226163623-3c772e9f-d48f-47f2-b71d-ac8bd0afac25.PNG"></br>
<b>READ & CREATE Ingredients Page</b>
<img src= "https://user-images.githubusercontent.com/50260762/226163714-4359eefe-d40e-4b40-837b-b92ca5a605ff.PNG"></br>
<b>READ & CREATE Clothing Ingredients Page</b>
<img src= "https://user-images.githubusercontent.com/50260762/226164022-f627a219-3811-4e2f-a523-779752607a3d.PNG"></br>
<b>READ, CREATE, UPDATE & DELETE Transactions Page</b>
<img src= "https://user-images.githubusercontent.com/50260762/226163993-85f12bcd-40c3-4dbf-b192-535b961065e3.PNG"></br>
<b>READ & CREATE Transaction Details Page</b>
<img src= "https://user-images.githubusercontent.com/50260762/226164058-08af7358-232e-4d0e-aee0-617e76caad8d.PNG"></br>
<h2> Running the Project </h2>
Download and save all the project files and directories in one project directory. Using the command line interface, navigate to the project directory and connect to your personal MySql database. From there, run <b>source ddl.sql</b> to download all of the website's sample data to your database. Edit the information in <b>database/db-connector.js</b> to connect to the MySql database associated with the database where the ddl.sql data was downloaded. Once this is done, run <b>npm install</b> on the project directory to download all the node module dependencies for the project. After installing all the dependencies, run <b>npm start</b> to start the project on localhost.
<h2> Citations </h2>
The initial project outline was created using Oregon State University's CS344 Node.js starter app found <a href="https://github.com/osu-cs340-ecampus/nodejs-starter-app">here</a>. CRUD functionalities are based on the work found in the starter app, adapted to the database specific for this project. Sample data from GarmentSets, CltohingItems, Ingredients, and ClothingIngredients is based on the Rockstar Game's <i>Red Dead Redemption 2</i> video game, whose Trapper shop and details can be found <a href="https://www.ign.com/wikis/red-dead-redemption-2/Trapper_Locations,_Legendary_Pelts_and_Outfits_Guide_(Where_to_Sell_Legendary_Bear_Pelt)">here</a>.
