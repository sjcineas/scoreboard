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
app.use(cors({ origin: 'http://localhost:3000', credentials: true }));
app.use(express.json());

app.use('', membershipRoutes);
app.use('/register', registerRoutes);
app.use('/addEvent', eventRoutes);
app.use('/login', loginRoutes);  
app.use('', attendanceRoutes);


app.get('/', (req, res) => res.json("!! MySQL Server is running !!"));

const PORT = process.env.APP_PORT || 3030;
app.listen(PORT, () => console.log(`Server running on port ${PORT}`));
