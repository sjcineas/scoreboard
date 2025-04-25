const express = require('express');
const db = require('../config/db');
const router = express.Router();

router.post('/users', (req, res) => {
    const { email, username, password } = req.body;

    const checkUserAndEmail = 'SELECT * FROM register WHERE email = ? OR username = ?';
    db.query(checkUserAndEmail, [email, username], (err, result) => {
        if (err) return res.status(500).json({ error: 'Database query error' });

        if (result.length > 0) {
            return res.status(400).json({ error: 'Email or Username already exists' });
        }

        const sql = 'INSERT INTO register (email, username, password) VALUES (?, ?, ?)';
        db.query(sql, [email, username, password], (err, data) => {
            if (err) return res.status(500).json({ error: 'Registration error' });
            return res.status(201).json({ message: 'User registered successfully', data });
        });
    });
});

module.exports = router;
