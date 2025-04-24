const express = require('express');
const db = require('../config/db');
const router = express.Router();

router.get('/StudentInfo/:pantherId', (req, res) =>{
    const pantherId = req.params.pantherId;
    if (pantherId.length != 7 || isNaN(pantherId)) return res.status(400).json({error: 'Invalid Panther Id'});
    const sql = 'select * from attendance WHERE pantherId = ?';
    db.query(sql, [parseInt(pantherId)], (err, results) => {
        if (err) {
            console.error(err);
            return res.status(500).json({ error: 'Database error' });
        }
        if (results.length === 0) {
            return res.status(200).json({ message: 'This student has not attended any events', data: [] });
        }

        res.status(200).json({ data: results }); 
    });
});

module.exports = router;