const express = require('express');
const db = require('../config/db');
const router = express.Router();

router.post('/log/event', (req, res) => {
    let { eventName, eventType, pointValue, idList } = req.body; 
    pointValue = Number(pointValue);
    const checkEventName = 'SELECT * FROM events WHERE eventName = ?';
    db.query(checkEventName, [eventName], (err, result) => {
        if (err) return res.status(500).json({ error: 'Database query error'});

        if (result.length === 0) {
            const sql = 'INSERT IGNORE INTO events (eventName, eventType, eventValue) VALUES ( ?, ?, ?)';
            db.query(sql, [eventName, eventType, pointValue], (err, data) => {
                if (err) return res.status(500).json({ error: 'Could not register event' });
                console.log('Event Added Successfully');
            });
        }

        const pantherIds = idList.split(',').map(id => id.trim());  
        let invalidPantherIds = [];

        const processPantherId = async (pantherId) => {
            return new Promise((resolve) => {
                const checkMembership = 'SELECT * FROM membership WHERE pantherId = ?';
                db.query(checkMembership, [pantherId], (err, memberResult) => {
                    if (err) {
                        invalidPantherIds.push({ pantherId, error: 'Database query error for membership' });
                        return resolve();
                    }
        
                    if (memberResult.length > 0) {
                        const updatePoints = 'UPDATE membership SET points = points + ? WHERE pantherId = ?';
                        db.query(updatePoints, [pointValue, pantherId], (err) => {
                            if (err) {
                                invalidPantherIds.push({ [pantherId]:'Could not update points' });
                                return resolve();
                            }
        
                            const addAttendance = 'INSERT INTO attendance (pantherId, eventName, eventType, eventValue) VALUES (?, ?, ?, ?)';
                            db.query(addAttendance, [pantherId, eventName, eventType, pointValue], (err) => {
                                if (err) invalidPantherIds.push({ [pantherId]: 'Could not insert attendance record' });
                                resolve(); 
                            });
                        });
                    } else {
                        invalidPantherIds.push({ [pantherId]: 'Has not filled out membership form' });
                        resolve();
                    }
                });
            });
        };
        
        Promise.all(pantherIds.map(processPantherId))
        .then(() => {
            return res.status(201).json({
                message: 'Event and attendance successfully added.',
                invalidPantherIds: invalidPantherIds.length > 0 ? invalidPantherIds : undefined
            });
        })
        .catch((error) => {
            return res.status(500).json({ message: 'Server error' });
        });

    });
});

router.get('/pastEvents', (req, res) => {
    const getAllEvents = 'SELECT * FROM events ORDER BY id DESC'; // or whatever your primary key is

    db.query(getAllEvents, (err, results) => {
        if (err) return res.status(500).json({ error: 'Database error fetching events' });

        return res.status(200).json(results);
    });
});


module.exports = router;
