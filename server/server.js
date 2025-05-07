const express = require('express');
const cors = require('cors');
require('dotenv').config({ path: __dirname + '/.env' });

const db = require('./config/db');
const membershipRoutes = require('../server/routes/membership');
const registerRoutes = require('../server/routes/register');
const eventRoutes = require('../server/routes/events');
const loginRoutes = require('../server/routes/login'); 
const attendanceRoutes = require('../server/routes/attendance')


const app = express();
app.use(cors({ origin: 'http://localhost:3000/', credentials: true }));
app.use(express.json());

app.use('', membershipRoutes);
app.use('/register', registerRoutes);
app.use('/addEvent', eventRoutes);
app.use('/login', loginRoutes);  
app.use('', attendanceRoutes);


app.get('/', (req, res) => res.json("!! MySQL Server is running !!"));
console.log('Using DB_HOST:', process.env.DB_HOST);
const PORT = process.env.APP_PORT || 3030;
app.listen(PORT, () => console.log(`Server running on port ${PORT}`));
