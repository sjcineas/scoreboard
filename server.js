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


app.post('/register', (req, res) => {
    const sql = 'INSERT INTO register (`nsbeid`, `email`, `username`, `password`) VALUES (?, ?, ?, ?)'
    const values = [
        req.body.nsbeid,
        req.body.email,
        req.body.username,
        req.body.password
    ]
    db.query(sql, values, (err,data) =>{
        if(err) return res.json(err);
        return res.json(data);
    })
})
app.get('/', (req, res) =>{
    return res.json("!! MySQL Server is running !!")
})
app.listen(3030, ()=>{
        console.log("!! MySQL Server is running !!")
    }
)

