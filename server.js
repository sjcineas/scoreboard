const express =  require('express')
const mysql =  require('mysql')
const cors =  require('cors');
const { Scoreboard } = require('@mui/icons-material');
require('dotenv').config();
const jwt = require('jsonwebtoken');
const generateToken = (username) => {
    const secretKey = process.env.JWT_SECRET || 'your_secret_key';
    const token = jwt.sign({ username }, secretKey, { expiresIn: '1d' }); // Token expires in 1 day
    return token;
};

const app = express()
app.use(cors({
    origin: 'http://localhost:3000', 
    credentials: true
}));
app.use(express.json());

const db = mysql.createConnection({
    host: process.env.DB_HOST,
    user: process.env.DB_USER,
    password: process.env.DB_PASSWORD,
    database: process.env.DB_NAME
});

db.connect(err => {
    if (err) {
        console.error('Error connecting to MySQL:', err);
    } else {
        console.log('Connected to MySQL!');
    }
});
//JSON api response
app.get('/', (req, res) =>{
    return res.json("!! MySQL Server is running !!")
})
//Start server and listen to specified port numeber
app.listen(3030, ()=>{
    console.log("!! MySQL Server is running !!")
}
)

//-------------------------------- Membership  Form--------------------------------
app.post('/membershipform', (req, res)=> {
    const sessions = ['FALL', 'SPRING', 'SUMMER', 'WINTER', 'AUTUMN']
    const {firstName, lastName, major, 
        pantherId, fiuEmail, personalEmail, 
        gradSession, gradYear, phoneNumber, schoolStatus} = req.body;
    const sql = `
        INSERT INTO membership (
            firstName, lastName, major, pantherId, fiuEmail, personalEmail, 
            gradSession, gradYear, phoneNumber, schoolStatus, points
        ) VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?)`;
    if(firstName === null) 
        return res.status(400).json({error: 'Please enter a First Name.'});
    if(lastName === null) 
        return res.status(400).json({error: 'Please enter a Last Name.'});
    if(major === null) 
        return res.status(400).json({error: 'Please enter a Major.'});
    if(personalEmail.indexOf('.') == -1 || personalEmail.indexOf('@') == -1)
        return res.status(400).json({error: 'Please enter a valid Personal email.'});
    if(fiuEmail.indexOf('@fiu.edu') == -1)
        return res.status(400).json({error: 'Please enter a valid FIU email.'});

    if(pantherId.length < 7)
        return res.status(400).json({error: 'ERROR: Please enter a valid 6-digit panther ID.'});
    
    if(gradSession === null || !sessions.includes(gradSession.toUpperCase()))
        return res.status(400).json({error: 'Please enter a valid graduation session i.e.\n AUTUMN, FALL, SRING, SUMMER, WINTER'});
    
    if (!gradYear || isNaN(gradYear)|| parseInt(gradYear, 10) < 2000 || parseInt(gradYear, 10) > 3000) {
        const message = 'Invalid graduation year provided: ' + parseInt(gradYear, 10);
        return res.status(400).json({ error: message });
    }
    
    if(schoolStatus === null) 
        return res.status(400).json({error: 'Please enter a School Status.'});

    
    const gradYearValue = gradYear ? parseInt(gradYear, 10) : null;
    const points  = 0
    const values = [
        firstName,
        lastName,
        major,
        pantherId,
        fiuEmail,
        personalEmail,
        gradSession.toUpperCase(),
        gradYearValue,
        phoneNumber,
        schoolStatus,
        points
    ];
    const checkPantherId = 'SELECT * FROM membership WHERE pantherId = ?';
    db.query(checkPantherId, [pantherId], (err, result)=>{
        if (err) {
            console.error('Error occurred during Panther ID check:', err);
            return res.status(500).json({ error: 'Database query error' });
        }

        if (result.length > 0) {
            // Panther ID is already taken
            return res.status(400).json({ error: 'This Panther ID is already registered. Please use a different one.' });
        }
        db.query(sql, values, (err, result) =>{
            if(err){
                console.log("Error occurred: ", err);
                return res.status(500).json({ error: 'Database query error' });
            }
            res.status(201).json({ message: 'Membership form submitted successfully!', result });
    
        });

    });
    
    

});
//-------------------------------- Register Page--------------------------------
app.post('/register', (req, res) => {
    const {email, username} = req.body;

    // Check if email already exists
    const checkUserAndEmail = 'SELECT * FROM register WHERE email = ? OR username = ?';
    db.query(checkUserAndEmail, [email, username], (err, result) => {
        if (err) {
            return res.status(500).json({ error: 'Database query error' });
        }
        if (result.length > 0 ) { 
            if (result[0].email === email) {
                return res.status(400).json({ error: '!!!ALERT!!!\nThere is already and account with this Email. \nPlease login or use a different Email.' });
            }
            if (result[0].username === username) {
                return res.status(400).json({ error: '!!!ALERT!!!\nThere is already and account with this Username. \nPlease login or use a different Username.' });
            }
        } else {
            // If Email does not exist already
            const sql = 'INSERT INTO register (`nsbeid`, `email`, `username`, `password`) VALUES (?, ?, ?, ?)';
            const values = [
                req.body.nsbeid,
                req.body.email,
                req.body.username,
                req.body.password
            ];
            db.query(sql, values, (err, data) => {
                if (err) return res.status(500).json({ error: 'Registration error' });
                return res.status(201).json({ message: 'User registered successfully', data });
            });
        }
    });

})


//-------------------------------- API Endpoints for Postman --------------------------------
app.get('/api/data/register', (req, res) =>{
    const sql = 'SELECT * FROM register';
    db.query(sql, (err, result) =>{
        if(err){
            console.log('Error getting data: ', err);
            return res.status(500).json({error: '!!! Database Query Error !!!\n'})
        }
        return res.status(200).json(result);
    });
});

app.get('/api/data/membership', (req, res) =>{
    const sql = 'SELECT * FROM membership';
    db.query(sql, (err, result) =>{
        if(err){
            console.log('Error getting data: ', err);
            return res.status(500).json({error: '!!! Database Query Error !!!\n'})
        }
        return res.status(200).json(result);
    });
});

app.get('/api/data/membership/:pantherId', (req, res) =>{
    const {pantherId} = req.params;
    const sql = 'SELECT * FROM membership WHERE pantherID = ?';
    db.query(sql, [pantherId],  (err, result) =>{
        if(err){
            console.log('Error getting data: ', err);
            return res.status(404).json({error: '!!! No data was found with pantherId provided !!!\n'})
        }
        return res.status(200).json(result);
    });
});

app.put('/api/data/membership/:pantherId/addPoints/:points', (req, res) =>{
    const {pantherId, points} = req.params;
    const sql = 'UPDATE membership SET points = points + ? WHERE pantherId = ?';
    db.query(sql, [parseInt(points), pantherId],  (err, result) =>{
        if(err){
            console.log('Error getting data: ', err);
            return res.status(404).json({error: '!!! No data was found with pantherId provided !!!\n'})
        }
        return res.status(200).json(result);
    });
});

app.post('/auth/login', (req, res) => {
    const { username, password } = req.body;

    // Authenticate
    const authSql = 'SELECT * FROM register WHERE username = ? AND password = ?';
    console.log('Attempting login with:', { username, password });

    db.query(authSql, [username, password], (err, result) => {
        if (err) {
            console.error('Database query error:', err);
            return res.status(500).json({ error: 'Database query error' });
        }
        console.log('Login query result:', result);

        if (result.length == 0) {
            return res.status(404).json({ error: 'Invalid username and password combination' });
        } else {
            const token = generateToken(username); 
            res.cookie('auth_token', token, { 
                httpOnly: true, 
                secure: true, 
                sameSite: 'Strict',
                maxAge: 24 * 60 * 60 * 1000 // 1 day expiration
            });
            return res.status(200).json({ success: true, message: "Login successful" });
        }
    });
});
app.post('/addEvent', (req, res) => {
    const {eventName, eventType, pointValue, idList} = req.body;
    /*
        eventName: '',
        eventType: '',
        pointValue: 0,
        idList: ''
    */
    // Check if email already exists
    const checkEventName = 'SELECT * FROM events WHERE eventName = ? ';
    db.query(checkEventName, [eventName, eventType, pointValue, idList], (err, result) => {
        if (err) {
            return res.status(500).json({ error: 'Database query error' });
        }
        if (result.length == 0 ) {
            // If event does not exist already
            const sql = 'INSERT IGNORE INTO events (`eventName`, `eventType`, `eventValue`) VALUES (?, ?, ?)';
            const values = [
                req.body.eventName,
                req.body.eventType,
                req.body.pointValue,
            ];
            db.query(sql, values, (err, data) => {
                if (err) return res.status(500).json({ error: 'Could Not Register Event. Try again.' });
                return res.status(201).json({ message: 'Event Added Successfully', data });
            });
        }
    });

    const pantherIds = idList.split(",").map(id => id.trim());
    let invalidIds = [];
    let insertedIds = [];
    let errors = [];
    let pendingQueries = 0; 

    for (let i = 0; i < pantherIds.length; i++) {
        let pantherId = pantherIds[i];

        if (isNaN(parseInt(pantherId)) || pantherId.length > 7) {
            invalidIds.push(pantherId);
            continue;
        }

        pendingQueries++; // Track the number of queries started

        const checkMembership = 'SELECT * FROM membership WHERE pantherId = ?';

        db.query(checkMembership, [parseInt(pantherId)], (err, membershipResult) => {
            if (err) {
                errors.push({ pantherId, error: 'Database query error (membership check)' });
                pendingQueries--; 
                if (pendingQueries === 0) sendFinalResponse();
                return;
            }

            if (membershipResult.length === 0) {
                invalidIds.push(pantherId);
                pendingQueries--; 
                if (pendingQueries === 0) sendFinalResponse();
                return;
            }

            const updatePoints = 'UPDATE membership SET points = points + ? WHERE pantherId = ?';

            db.query(updatePoints, [parseInt(pointValue), parseInt(pantherId)], (err, updateResult) => {
                if (err) {
                    errors.push({ pantherId, error: 'Error updating membership points' });
                    pendingQueries--; 
                    if (pendingQueries === 0) sendFinalResponse();
                    return;
                }

                const checkAttendance = 'SELECT * FROM attendance WHERE pantherId = ? AND eventName = ?';

                db.query(checkAttendance, [parseInt(pantherId), eventName], (err, attendanceResult) => {
                    if (err) {
                        errors.push({ pantherId, error: 'Database query error (attendance check)' });
                    } else if (attendanceResult.length === 0) { 
                        const addAttendance = 'INSERT IGNORE INTO attendance (`pantherId`, `eventName`, `eventType`, `eventValue`) VALUES (?, ?, ?, ?)';

                        db.query(addAttendance, [parseInt(pantherId), eventName, eventType, pointValue], (err, insertResult) => {
                            if (err) {
                                errors.push({ pantherId, error: 'Could not register event' });
                            } else {
                                insertedIds.push(pantherId);
                            }
                            pendingQueries--; // Query completed
                            if (pendingQueries === 0) sendFinalResponse();
                        });
                        return;
                    }
                    pendingQueries--; // Query completed
                    if (pendingQueries === 0) sendFinalResponse();
                });
            });
        });
    }

    function sendFinalResponse() {
        if (errors.length > 0) {
            return res.status(500).json({ message: 'Some errors occurred', errors });
        }
        if (invalidIds.length > 0) {
            return res.status(400).json({ message: 'Invalid Panther IDs found', invalidIds });
        }
        return res.status(201).json({ message: 'Attendance Recorded Successfully', insertedIds });
    }

})