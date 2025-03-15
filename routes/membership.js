const express = require('express');
const db = require('../config/db');
const router = express.Router();

router.get('/data/membership', (req, res) => {
    const sql = 'SELECT * FROM membership';
    db.query(sql, (err, results) => {
        if (err) {
            console.error(err);
            return res.status(500).json({ error: 'Database error' });
        }
        res.status(200).json(results);
    });
});


router.post('/membershipform', (req, res) => {
    const sessions = ['FALL', 'SPRING', 'SUMMER', 'WINTER', 'AUTUMN'];
    const { firstName, lastName, major, pantherId, fiuEmail, personalEmail, gradSession, gradYear, phoneNumber, schoolStatus } = req.body;

    if (!firstName || !lastName || !major || !personalEmail || !fiuEmail || !pantherId || !gradSession || !gradYear || !schoolStatus) {
        return res.status(400).json({ error: 'All fields are required' });
    }

    const emailRegex = /^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/;
    if (!emailRegex.test(personalEmail)) {
        return res.status(400).json({ error: 'Invalid personal email' });
    }

    if (!fiuEmail.endsWith('@fiu.edu')) {
        return res.status(400).json({ error: 'Invalid FIU email' });
    }

    if (!sessions.includes(gradSession.toUpperCase())) {
        return res.status(400).json({ error: 'Invalid graduation session' });
    }

    const currentYear = new Date().getFullYear();
    if (isNaN(gradYear) || gradYear < currentYear-100 || gradYear > currentYear + 10) {
        return res.status(400).json({ error: 'Invalid graduation year' });
    }

    const sql = `INSERT INTO membership (firstName, lastName, major, pantherId, fiuEmail, personalEmail, gradSession, gradYear, phoneNumber, schoolStatus, points) VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?, ?, 0)`;

    db.query(sql, [firstName, lastName, major, pantherId, fiuEmail, personalEmail, gradSession.toUpperCase(), gradYear, phoneNumber, schoolStatus], (err, result) => {
        if (err) {
            console.error(err); 
            return res.status(500).json({ error: 'Database error' });
        }
        res.status(201).json({ message: 'Membership form submitted successfully!' });
    });
});

module.exports = router;
