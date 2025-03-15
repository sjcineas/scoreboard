const express = require('express');
const db = require('../config/db');
const router = express.Router();

router.post('/log/event', (req, res) => {
    const { eventName, eventType, pointValue, idList } = req.body; 

    const checkEventName = 'SELECT * FROM events WHERE eventName = ?';
    db.query(checkEventName, [eventName], (err, result) => {
        if (err) return res.status(500).json({ error: 'Database query error' });

        if (result.length === 0) {
            const sql = 'INSERT IGNORE INTO events (eventName, eventType, eventValue) VALUES (?, ?, ?)';
            db.query(sql, [eventName, eventType, pointValue], (err, data) => {
                if (err) return res.status(500).json({ error: 'Could not register event' });
                console.log('Event Added Successfully');
            });
        }

        const pantherIds = idList.split(',').map(id => id.trim());  
        
        pantherIds.forEach(pantherId => {
            const checkMembership = 'SELECT * FROM membership WHERE pantherId = ?';
            db.query(checkMembership, [pantherId], (err, memberResult) => {
                if (err) return res.status(500).json({ error: 'Database query error for membership' });

                if (memberResult.length > 0) {
                    const updatePoints = 'UPDATE membership SET points = points + ? WHERE pantherId = ?';
                    db.query(updatePoints, [pointValue, pantherId], (err, updateResult) => {
                        if (err) return res.status(500).json({ error: 'Could not update points' });

                        const addAttendance = 'INSERT INTO attendance (pantherId, eventName, eventType, eventValue) VALUES (?, ?, ?, ?)';
                        db.query(addAttendance, [pantherId, eventName, eventType, pointValue], (err, attendanceResult) => {
                            if (err) return res.status(500).json({ error: 'Could not insert attendance record' });
                        });
                    });
                } else {
                    return res.status(400).json({ error: `No member found for Panther ID: ${pantherId}` });
                }
            });
        });

        return res.status(201).json({ message: 'Event and attendance successfully added' });
    });
});

module.exports = router;
