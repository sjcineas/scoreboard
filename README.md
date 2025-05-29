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

4. Create .env file inside server folder with the following and fill in the <inputs>
 ```
   DB_HOST=localhost
   DB_USER=<usually 'root' but may be different'
   DB_PASSWORD= <password>
   DB_NAME=score
 ```

5. You will need to create tables and seed data. Run the following commands (not together) to do so.
```bash
grunt create-tables
```
```bash
grunt seed-data
```

## Grunt Tasks

To automate database setup, seeding, and app startup, use the following Grunt commands:

### create-tables

Creates the necessary tables (`register`, `membership`, `events`, `attendance`) in your `score` database if they don't already exist.

```bash
grunt create-tables
```
### seed-data

Seeds the database tables with initial test data from JSON files located in ./test-data. It adds members, admin users, events, and attendance data by making HTTP POST requests to your API.
```bash
grunt seed-data
```

### start-and-seed
Starts the application (npm start) in a new terminal tab, waits 20 seconds for it to initialize, then seeds the database with the initial data.
```bash
grunt start-and-seed
```

### drop-tables
Drops all tables (membership, events, register, attendance) from the database.
```bash
grunt drop-tables
```


## Start the React app:

 ```bash
 npm run launch