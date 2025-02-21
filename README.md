# Scoreboard README

## Overview

This README provides information on setting up and running a React app that utilizes Node modules. Please note that the `node_modules` directory has been ignored in this GitHub repository. Follow the steps below to properly set up and run the app.

## Prerequisites

Make sure you have the following installed on your machine:

- [Node.js](https://nodejs.org/) (v16.17.1.)
- [npm](https://www.npmjs.com/) (npm: '8.15.0')
- [MySQL Workbench](https://www.mysql.com/products/workbench/)
 - [Setup Video for Mac](https://youtu.be/ODA3rWfmzg8?si=TI8J1DwC2dE0krpj)

## Getting Started

1. Clone the repository to your local machine:

   ```bash
   git clone https://github.com/sjcineas/scoreboard.git
   
2. Navigate to the project directory:
      ```bash
      cd scoreboard

4. Install project dependencies:

   ```bash
   npm install

This will install the necessary Node modules.

5. Setup Databases
   i. Open MySQL Workbench
   ii. Connect to the server by clicking Local Instance
   iii. Create new schema called `score`
   iv. create new tables by running the following queries:
   
   register
   ```
      USE score;
      
      CREATE TABLE IF NOT EXISTS register (
          id INT AUTO_INCREMENT PRIMARY KEY,
          nsbeid VARCHAR(50),
          role VARCHAR(50),
          username VARCHAR(50),
          password VARCHAR(50)
      );
   ```
   membership
   ```
      USE score;
      
      CREATE TABLE IF NOT EXISTS membership (
          firstName varchar(255),
          lastName varchar(255),
          major varchar(255),
          pantherId char(7) PRIMARY KEY,
          fiuEmail varchar(255),
          personalEmail varchar(255),
          gradSession varchar(6),
          gradYear int,
          phoneNumber varchar(20),
          schoolStatus varchar(50),
          points int

      );
   ```

   events
   ```
      USE score;
   
      CREATE TABLE IF NOT EXISTS (
          eventName varchar(50),
          eventType varchar(50),
          eventValue int
      );
   ```
   attendance
   ```
      CREATE TABLE IF NOT EXISTS attendance (
          pantherId int AUTO_INCREMENT PRIMARY KEY,
         	eventName varchar(50),
         	eventType varchar(50),
         	eventValue int
      );
   ```

6. Create .env file  with the following and fill in the <inputs>
 ```
   DB_HOST=localhost
   DB_USER=<usually 'root' but may be different'
   DB_PASSWORD= <password>
   DB_NAME=score
 ```
## Start the React app:

 ```bash
 npm start
