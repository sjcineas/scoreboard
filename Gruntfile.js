const { connect } = require('mongoose');

async function createTable(grunt, sqlQuery){
    const db = require('./config/db').promise();
    try{
        await db.query(sqlQuery)
        grunt.log.write('Table created successfully or already existed.\n').ok();

    }catch(err){
        grunt.log.error('Failed to execute query to create table:\n', sqlQuery, '\n');
        grunt.log.error(err.message);
    }finally{
        db.end()
    };
}

module.exports = function(grunt) {
    grunt.initConfig({});
    grunt.registerTask('create-tables', function(){
        done = this.async();
        const createRegisterTable = `
            CREATE TABLE IF NOT EXISTS register (
                id INT AUTO_INCREMENT PRIMARY KEY,
                nsbeid VARCHAR(50),
                role VARCHAR(50),
                username VARCHAR(50),
                password VARCHAR(50)
            );
        `
        const createMembershipTable = `
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
        `
        const createEventsTable = `
            CREATE TABLE IF NOT EXISTS events (
                id INT AUTO_INCREMENT PRIMARY KEY,
                eventName VARCHAR(50),
                eventType VARCHAR(50),
                eventValue INT
            );
        `
        const createAttendanceTable = `
            CREATE TABLE IF NOT EXISTS attendance (
                id INT AUTO_INCREMENT PRIMARY KEY,
                pantherId CHAR(7), -- No FOREIGN KEY constraint
                eventName VARCHAR(50),
                eventType VARCHAR(50),
                eventValue INT
            );
        `
        const promises = [
            createTable(grunt, createRegisterTable),
            createTable(grunt, createMembershipTable),
            createTable(grunt, createEventsTable),
            createTable(grunt, createAttendanceTable),
        ]
        Promise.allSettled(promises)
        .then((results) => {
            results.forEach((result, index) => {
                if (result.status === "fulfilled") {
                  grunt.log.ok(`Table ${index + 1} created successfully.`);
                } else {
                  grunt.log.error(`Error in Table ${index + 1}:`, result.reason);
                }
              });
      
            done();
        });

        
    });
    grunt.registerTask('seed-data', function(){
        fetch()
    });
}

