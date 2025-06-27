const fs = require('fs');
const axios = require('axios');
const { exec } = require('child_process');

async function createTable(grunt, sqlQuery){
    const db = require('./server/config/db').promise();
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
async function deleteTables(grunt, sqlQuery){
    const db = require('./server/config/db').promise();
    try{
        await db.query(sqlQuery)
        grunt.log.write('Table droppped successfully.\n').ok();

    }catch(err){
        grunt.log.error('Failed to execute query to drop table:\n', sqlQuery, '\n');
        grunt.log.error(err.message);
        throw err;
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
                email VARCHAR(50),
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
                    schoolStatus: member.schoolStatus
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

