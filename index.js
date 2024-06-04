var express = require('express');
var app = express();
var mongoose = require('mongoose');
const UserSchema = require('./models/User');
var cors = require('cors');

app.use(cors());
app.use(express.json()); // To parse JSON-encoded bodies
app.use(express.urlencoded({ extended: true })); // To parse URL-encoded bodies

// MongoDB Connection
const CONNECTION_STRING = "mongodb+srv://jordandorcas:home805@cluster0.wht3cja.mongodb.net/sample_airbnb?retryWrites=true&w=majority";
var DATABASE_NAME = "sample_mflix";
   

const db = mongoose.createConnection(CONNECTION_STRING, {
    useNewUrlParser: true,
    useUnifiedTopology: true
});

const User = db.model('User', UserSchema); // Use the schema to create a model

app.post('/register', async (req, res) => {
    const newUser = new User(req.body);
    try {
        await newUser.save();
        res.status(201).send('User registered');
    } catch (error) {
        res.status(500).send('Error registering user: ' + error.message);
    }
});

app.listen(5038, () => console.log('Server running on port 5038'));

// var CONNECTION_STRING = "mongodb+srv://jordandorcas:home805@cluster0.wht3cja.mongodb.net/sample_mflix?retryWrites=true&w=majority&appName=Cluster0";
// var DATABASENAME = "sample_airbnb";
// var database;
// app.listen(5038, ()=>{
//   MongoClient.connect(CONNECTION_STRING, (error, client)=>{
//     if (error) {
//       console.error("Failed to connect to MongoDB", error);
//       return;
//     }
//     database = client.db(DATABASENAME);
//     console.log("MongoDB Connection Successful");
//   })
// });

// app.post('/register', async (req, res) => {
//     try {
//         const { orgAcronym, orgCode, username, password } = req.body;
//         const newUser = new User({ orgAcronym, orgCode, username, password });
//         await newUser.save();
//         res.status(201).send('User registered');
//     } catch (error) {
//         console.error('Registration error:', error);
//         res.status(500).send('Error registering user');
//     }
// });

// app.listen(5038, () => console.log('Server running on port 5038'));
