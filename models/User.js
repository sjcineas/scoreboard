const mongoose = require('mongoose');

const UserSchema = new mongoose.Schema({
    orgAcronym: String,
    orgCode: String,
    username: String,
    password: String
});

module.exports = UserSchema; // Export the schema
