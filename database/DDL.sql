-- Project Name: TrapperDB
-- Project Group: 55
-- Team Members: Alden Chico & Christine Kuran
-- Date: 02/14/2023
-- Description: Project Step 3 Draft DDL

-- Disable commits and foreign key checks
SET FOREIGN_KEY_CHECKS=0;
SET AUTOCOMMIT = 0;

-- --------------------------------------------------------

--
-- Create table  `GarmentSets`
--

CREATE OR REPLACE TABLE  `GarmentSets` (
  `garmentID` int(11) NOT NULL UNIQUE AUTO_INCREMENT,
  `garmentName` varchar(145) NOT NULL UNIQUE,
  `garmentDescription` varchar(250) DEFAULT NULL,
  PRIMARY KEY (garmentID)
);

--
-- Insert data into `GarmentSets`
--

INSERT INTO `GarmentSets` (`garmentID`, `garmentName`, `garmentDescription`) VALUES
(1, 'The Bear Hunter', 'Beginner garment set that is easy to obtain'),
(2, 'The Trophy Buck', 'Comes with a raccoon hat'),
(3, 'The Dreamcatcher', NULL);

-- --------------------------------------------------------

--
-- Create table  `ClothingItems`
--

CREATE OR REPLACE TABLE  `ClothingItems` (
  `clothingID` int(11) NOT NULL UNIQUE AUTO_INCREMENT,
  `clothingName` varchar(145) NOT NULL UNIQUE,
  `clothingDescription` varchar(250) DEFAULT NULL,
  `garmentID` int(11),
  PRIMARY KEY (`clothingID`),
  FOREIGN KEY (`garmentID`) REFERENCES `GarmentSets` (`garmentID`) ON DELETE SET NULL ON UPDATE CASCADE
);

--
-- Insert data into `ClothingItems`
--

INSERT INTO `ClothingItems` (`clothingID`, `clothingName`, `clothingDescription`, `garmentID`) VALUES
(1, 'Legendary Bear Head Hat', 'Whole grizzly bear head as a hat', 1),
(2, 'Legendary Bear Coat', 'Durable; not great for keeping warm', 1),
(3, 'Legendary Bear Ropers', NULL, 1),
(4, 'Boar Riding Gloves', 'Protective wear for hands', 1);

-- --------------------------------------------------------

--
-- Create table  `Ingredients`
--

CREATE OR REPLACE TABLE  `Ingredients` (
  `ingredientID` int(11) NOT NULL UNIQUE AUTO_INCREMENT,
  `ingredientName` varchar(145) NOT NULL UNIQUE,
  `ingredientDescription` varchar(250) DEFAULT NULL,
  PRIMARY KEY (ingredientID)
);

--
-- Insert data into `Ingredients`
--

INSERT INTO `Ingredients` (`ingredientID`, `ingredientName`, `ingredientDescription`) VALUES
(1, 'Legendary Bear Pelt', 'Obtain from Bharati Grizzly Bear'),
(2, 'Perfect Bison Pelt', 'Find American bison in plains areas in packs'),
(3, 'Perfect Bull Hide', 'Angus Bull can be found on farms and ranches across the states'),
(4, 'Perfect Boar Pelt', 'Boar can be found in swamps with other boar'),
(5, 'Perfect Rabbit Pelt', NULL);

-- --------------------------------------------------------

--
-- Create table `ClothingIngredients`
--

CREATE OR REPLACE TABLE `ClothingIngredients` (
  `clothingIngredientsID` int(11) NOT NULL UNIQUE AUTO_INCREMENT,
  `clothingID` int(11) NOT NULL,
  `ingredientID` int(11) NOT NULL,
  `ingredientQty` int(11) NOT NULL DEFAULT 1,
  PRIMARY KEY (clothingIngredientsID),
  FOREIGN KEY (`clothingID`) REFERENCES `ClothingItems` (`clothingID`) ON DELETE CASCADE ON UPDATE CASCADE,
  FOREIGN KEY (`ingredientID`) REFERENCES `Ingredients` (`ingredientID`) ON DELETE CASCADE ON UPDATE CASCADE
);

--
-- Insert data into `ClothingIngredients`
--

INSERT INTO `ClothingIngredients` (`clothingIngredientsID`, `clothingID`, `ingredientID`, `ingredientQty`) VALUES
(1, 1, 1, 1),
(2, 1, 1, 1),
(3, 1, 2, 1),
(4, 1, 1, 1),
(5, 1, 3, 1),
(6, 1, 4, 1),
(7, 1, 5, 2);

-- --------------------------------------------------------

--
-- Create table  `Players`
--

CREATE OR REPLACE TABLE  `Players` (
  `playerID` int(11) NOT NULL UNIQUE AUTO_INCREMENT,
  `userName` varchar(45) NOT NULL UNIQUE,
  `firstName` varchar(45) NOT NULL,
  `lastName` varchar(45) NOT NULL,
  `email` varchar(45) NOT NULL UNIQUE,
  `joinDate` date NOT NULL,
  PRIMARY KEY (playerID)
);

--
-- Insert data into `Players`
--

INSERT INTO `Players` (`playerID`, `userName`, `firstName`, `lastName`, `email`, `joinDate`) VALUES
(1, 'angeloB', 'Angelo', 'Bronte', 'abronte@rdr2.com', '1899-07-02'),
(2, 'billWill', 'Bill', 'Williamson', 'bwill@rdr2.com', '1899-06-02'),
(3, 'arthurM', 'Arthur', 'Morgan', 'arthurm@rdr2.com', '1899-03-01'),
(4, 'JohnM', 'John', 'Marston', 'johnmarston@rdr2.com', '1911-05-10'),
(5, 'micahB', 'Micah', 'Bell', 'micahb@rdr2.com', '1899-04-13');

-- --------------------------------------------------------

--
-- Create table  `Transactions`
--

CREATE OR REPLACE TABLE  `Transactions` (
  `transactionID` int(11) NOT NULL UNIQUE AUTO_INCREMENT,
  `transactionDate` date NOT NULL,
  `playerID` int(11) NOT NULL,
  PRIMARY KEY (`transactionID`),
  FOREIGN KEY (`playerID`) REFERENCES `Players` (`playerID`) ON DELETE CASCADE ON UPDATE CASCADE
);

--
-- Insert data into `Transactions`
--

INSERT INTO `Transactions` (`transactionID`, `transactionDate`, `playerID`) VALUES
(1, '1899-08-01', 1),
(2, '1899-07-05', 2),
(3, '1899-04-10', 3),
(4, '1911-07-22', 4),
(5, '1899-05-17', 5);

-- --------------------------------------------------------

--
-- Create table  `TransactionDetails`
--

CREATE OR REPLACE TABLE  `TransactionDetails` (
  `transactionDetailsID` int(11) NOT NULL UNIQUE AUTO_INCREMENT,
  `transactionID` int(11) NOT NULL,
  `ingredientID` int(11) NOT NULL,
  `ingredientQty` int(11) NOT NULL DEFAULT 1,
  PRIMARY KEY (`transactionDetailsID`),
  FOREIGN KEY (`ingredientID`) REFERENCES `Ingredients` (`ingredientID`) ON DELETE CASCADE ON UPDATE CASCADE,
  FOREIGN KEY (`transactionID`) REFERENCES `Transactions` (`transactionID`) ON DELETE CASCADE ON UPDATE CASCADE
);

--
-- Insert data into `TransactionDetails`
--

INSERT INTO `TransactionDetails` (`transactionDetailsID`, `transactionID`, `ingredientID`, `ingredientQty`) VALUES
(1, 1, 1, 1),
(2, 1, 2, 2),
(3, 1, 3, 2),
(4, 1, 4, 1),
(5, 1, 5, 1);

-- --------------------------------------------------------

-- Turn back on commits and foreign key checks
SET FOREIGN_KEY_CHECKS=1;
COMMIT;
