const express = require('express');
const db = require('../config/db');
const { generateToken } = require('../utils/auth');

const router = express.Router();

router.post('/auth/login', (req, res) => {
    const { username, password } = req.body;
    const sql = 'SELECT * FROM register WHERE username = ? AND password = ?';

    db.query(sql, [username, password], (err, result) => {
        if (err) return res.status(500).json({ error: 'Database query error' });
        if (result.length === 0) return res.status(404).json({ error: 'Invalid username and password combination' });

        const token = generateToken(username);
        res.cookie('auth_token', token, { httpOnly: true, secure: true, sameSite: 'Strict', maxAge: 86400000 });
        res.status(200).json({ success: true, message: "Login successful" });
    });
});

module.exports = router;
