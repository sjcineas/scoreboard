const fs = require('fs');
const axios = require('axios');
const { exec } = require('child_process');

const db = require('./server/config/db');

// Helper function to close the database connection
async function closeConnection() {
    try {
        await db.promise.end();
    } catch (err) {
        console.error('Error closing database connection:', err);
    }
}

async function createTable(grunt, sqlQuery, tableName) {
    try {
        await db.promise.query(sqlQuery);
        grunt.log.write(`Table ${tableName} created successfully or already existed.\n`).ok();
    } catch (err) {
        if (err.code === 'ER_TABLE_EXISTS_ERROR') {
            grunt.log.write(`Table ${tableName} already exists.\n`).ok();
        } else {
            grunt.log.error(`Failed to create table ${tableName}: ${err.message}`);
            throw err; // Rethrow non-existence errors
        }
    }
}

async function deleteTables(grunt, sqlQuery, tableName) {
    try {
        await db.promise.query(sqlQuery);
        grunt.log.write(`Table ${tableName} dropped successfully.\n`).ok();
    } catch (err) {
        if (err.code === 'ER_BAD_TABLE_ERROR') {
            grunt.log.write(`Table ${tableName} does not exist.\n`).ok();
        } else {
            grunt.log.error(`Failed to drop table ${tableName}: ${err.message}`);
            throw err; // Rethrow non-existence errors
        }
    }
}

module.exports = function(grunt) {
    grunt.initConfig({});

    grunt.registerTask('create-tables', async function(){
        const done = this.async();
        
        const createRegisterTable = `
            CREATE TABLE IF NOT EXISTS register (
                id INT AUTO_INCREMENT PRIMARY KEY,
                email VARCHAR(50) not null,
                username VARCHAR(50) not null,
                password VARCHAR(50) not null
            );
        `;
        
        const createMembershipTable = `
            CREATE TABLE IF NOT EXISTS membership (
                firstName varchar(255) not null,
                lastName varchar(255) not null,
                major varchar(255) not null,
                pantherId char(7) PRIMARY KEY,
                fiuEmail varchar(255) not null,
                personalEmail varchar(255) not null,
                gradSession varchar(6) not null,
                gradYear int not null,
                phoneNumber varchar(20) not null,
                schoolStatus varchar(50) not null,
                linkedin varchar(255),
                points int
            );
        `;
        
        const createEventsTable = `
            CREATE TABLE IF NOT EXISTS events (
                id INT AUTO_INCREMENT PRIMARY KEY,
                eventName VARCHAR(50) not null,
                eventType VARCHAR(50) not null,
                eventValue INT not null
            );
        `;
        
        const createAttendanceTable = `
            CREATE TABLE IF NOT EXISTS attendance (
                id INT AUTO_INCREMENT PRIMARY KEY,
                pantherId CHAR(7) not null, -- No FOREIGN KEY constraint
                eventName VARCHAR(50) not null,
                eventType VARCHAR(50) not null,
                eventValue INT not null
            );
        `;

        try {
            const promises = [
                createTable(grunt, createRegisterTable, 'register'),
                createTable(grunt, createMembershipTable, 'membership'),
                createTable(grunt, createEventsTable, 'events'),
                createTable(grunt, createAttendanceTable, 'attendance'),
            ];
            
            const results = await Promise.allSettled(promises);
            
            results.forEach((result, index) => {
                if (result.status === "fulfilled") {
                    grunt.log.ok(`Table ${index + 1} created successfully.`);
                } else {
                    grunt.log.error(`Error in Table ${index + 1}:`, result.reason);
                }
            });
            
            await closeConnection();
            done();
        } catch (error) {
            grunt.log.error('Error in create-tables task:', error);
            await closeConnection();
            done(false);
        }
    });

    grunt.registerTask('drop-tables', async function(){
        const done = this.async();
        const dropTables = [
            { sql: 'DROP TABLE IF EXISTS attendance', name: 'attendance' },
            { sql: 'DROP TABLE IF EXISTS events', name: 'events' },
            { sql: 'DROP TABLE IF EXISTS membership', name: 'membership' },
            { sql: 'DROP TABLE IF EXISTS register', name: 'register' }
        ];

        try {
            for (const { sql, name } of dropTables) {
                await deleteTables(grunt, sql, name);
            }
            
            await closeConnection();
            done();
        } catch (error) {
            grunt.log.error('Error in drop-tables task:', error);
            await closeConnection();
            done(false);
        }
    });

    grunt.registerTask('seed-data', async function(){
        const done = this.async();
        // create members
        const getMembership =  fs.readFileSync('./test-data/membershipData.json');
        const dataMembership = JSON.parse(getMembership);
        for (const member of dataMembership) {
            try{
                
                const formData = {
                    firstName: member.firstName,
                    lastName: member.lastName,
                    major: member.major,
                    pantherId: member.pantherId,
                    fiuEmail: member.fiuEmail,
                    personalEmail: member.personalEmail,
                    gradSession: member.gradSession,
                    gradYear: member.gradYear,
                    phoneNumber: member.phoneNumber,
                    schoolStatus: member.schoolStatus,
                    linkedin: member.linkedin
                }
                //response not used (or yet needed)
                const response = await axios.post('http://scoreboard-server-env.eba-meu7gxv4.us-east-2.elasticbeanstalk.com/membershipform', formData);
                grunt.log.ok(`\nSuccessfully added members to membership table!\n`)
            }catch(error){
                grunt.log.error("Unable to add member with data:\n", member)
            }
        };
        // create an admin to login
        const getAdmin =  fs.readFileSync('./test-data/registerData.json');
        const dataAdmin = JSON.parse(getAdmin);
        for (const admin of dataAdmin) {
            try{
                
                const formData = {
                    email : admin.email,
                    username : admin.username,//must be email
                    password : admin.password
                }
                //response not used (or yet needed)
                const response = await axios.post('http://scoreboard-server-env.eba-meu7gxv4.us-east-2.elasticbeanstalk.com/register/users', formData)
                grunt.log.ok(`\nSuccessfully added admin to register table!\n`)
            }catch(error){
                grunt.log.error("Unable to add admin with data:\n", admin)
            }
        };
        // create events and add attendance
        const getEvents =  fs.readFileSync('./test-data/eventAttendanceData.json');
        const dataEvents = JSON.parse(getEvents);
        for (const event of dataEvents) {
            try{
                
                const formData = {
                    eventName : event.eventName,
                    eventType : event.eventType,
                    pointValue : event.pointValue,
                    idList: event.pantherIds
                }
                //response not used (or yet needed)
                const response = await axios.post('http://scoreboard-server-env.eba-meu7gxv4.us-east-2.elasticbeanstalk.com/addEvent/log/event',
                    formData,
                    {
                        headers: { 'Content-Type': 'application/json' },
                        withCredentials: true
                    }
                );
                grunt.log.ok(`\nSuccessfully added events and attendance!\n`)
            }catch(error){
                grunt.log.error("Unable to add event and attendance data:\n", error)
            }
        };
        done();
    });

    grunt.registerTask('start-and-seed', function(){
        const done = this.async();
        grunt.log.write("!!!ATTENTION!!!\nThis task may not work on windows unless cmd is changed INSIDE of Gruntfile.js\n\n");
        grunt.log.write("Starting application...\n\n")
        const cmd = `start cmd /k "cd /d ${process.cwd()} && npm start"`;
        /*
        OR on WINDOWS
        const cmd = `start cmd /k "cd /d ${process.cwd()} && npm start"`;
        */
        exec(cmd, (err, stdout, stderr) => {
            if (err) {
                grunt.log.error('Failed to open new terminal tab or run npm start.');
                return done(false);
            }

            grunt.log.ok('Launched npm start in new terminal tab. Waiting 20 seconds...');
            
            setTimeout(() => {
                grunt.task.run('seed-data');
                done();
            }, 20000); // wait 20 seconds
        });


    });
    grunt.registerTask('drop-tables', function(){
        const done = this.async();
        const dropTables = [
            'DROP TABLE membership',
            'DROP TABLE events',
            'DROP TABLE register',
            'DROP TABLE attendance'
        ]
        const promises =[];
        for(let i =0; i < dropTables.length; i++){
            promises.push(deleteTables(grunt, dropTables[i]));
        }
        Promise.allSettled(promises)
        .then((results) => {
            results.forEach((result, index) => {
                if (result.status === "fulfilled") {
                  grunt.log.ok(`Table ${index + 1} dropped successfully.`);
                } else {
                  grunt.log.error(`Error in Table ${index + 1}:`, result.reason);
                }
              });
      
            done();
        });
    });
}

