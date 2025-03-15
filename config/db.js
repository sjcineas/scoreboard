const { connection } = require('mongoose');
const mysql = require('mysql2');
require('dotenv').config();

const db = mysql.createConnection({
    host: process.env.DB_HOST,
    user: process.env.DB_USER,
    password: process.env.DB_PASSWORD,
    database: process.env.DB_NAME
});

db.connect(err => {
    if(err) {
        console.log('Unable to connect to MYSQL: ', err)
    }else{
        console.log('!!! MYSQL Connection Successful !!!')
    }
});

function createTables(){
    const queries = [
        `CREATE TABLE IF NOT EXISTS register (
            id INT AUTO_INCREMENT PRIMARY KEY,
            nsbeid VARCHAR(50),
            role VARCHAR(50),
            username VARCHAR(50),
            password VARCHAR(255)
        );`,

        `CREATE TABLE IF NOT EXISTS membership (
            firstName VARCHAR(255),
            lastName VARCHAR(255),
            major VARCHAR(255),
            pantherId CHAR(7) PRIMARY KEY,
            fiuEmail VARCHAR(255),
            personalEmail VARCHAR(255),
            gradSession VARCHAR(6),
            gradYear INT,
            phoneNumber VARCHAR(20),
            schoolStatus VARCHAR(50),
            points INT
        );`,

        `CREATE TABLE IF NOT EXISTS events (
            id INT AUTO_INCREMENT PRIMARY KEY,
            eventName VARCHAR(50),
            eventType VARCHAR(50),
            eventValue INT
        );`,

        `CREATE TABLE IF NOT EXISTS attendance (
            id INT AUTO_INCREMENT PRIMARY KEY,
            pantherId CHAR(7),
            eventName VARCHAR(50),
            eventType VARCHAR(50),
            eventValue INT,
            FOREIGN KEY (pantherId) REFERENCES membership(pantherId) ON DELETE SET NULL
        );`
    ];

    queries.forEach((query) => {
        db.queries(query, (err)=>{
            if (err)
                console.error('Unable to create table: ', err)
        });
    });

    console.log('!!! Successfully Created Tables !!!')

}

module.exports = db;