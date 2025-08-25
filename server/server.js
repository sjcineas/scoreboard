const express = require('express');
const cors = require('cors');
require('dotenv').config();

const db = require('./config/db');
const membershipRoutes = require('./routes/membership');
const registerRoutes = require('./routes/register');
const eventRoutes = require('./routes/events');
const loginRoutes = require('./routes/login'); 
const attendanceRoutes = require('./routes/attendance')


const app = express();
app.use(cors({
  origin: [
    'http://localhost:3000', // local dev
    'https://main.d1sjp4nu90qs09.amplifyapp.com' // deployed frontend
  ],
  credentials: true
}));
app.use(express.json());

app.use('', membershipRoutes);
app.use('/register', registerRoutes);
app.use('/addEvent', eventRoutes);
app.use('/login', loginRoutes);  
app.use('', attendanceRoutes);


app.get('/', (req, res) => res.json("!! MySQL Server is running !!"));
console.log('Using DB_HOST:', process.env.DB_HOST);
const PORT = process.env.PORT || process.env.APP_PORT || 3030;
app.listen(PORT, "0.0.0.0", () => console.log(`Server running on port ${PORT}`));
  
