const express =  require('express')
const mysql =  require('mysql')
const cors =  require('cors');
const { Scoreboard } = require('@mui/icons-material');
require('dotenv').config();
const app = express()
app.use(cors());
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

    if(pantherId.length > 6 || pantherId < 6)
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

