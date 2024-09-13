const express = require('express');
const mysql = require('mysql2');
const bodyParser = require('body-parser');
const path = require('path');

const app = express();
const port = 3000; // Change to any port you want

// Middleware to parse form data
app.use(bodyParser.urlencoded({ extended: true }));
app.use(bodyParser.json());

// Serve static files from the public folder
app.use(express.static(path.join(__dirname, 'public')));

// MySQL connection setup
const db = mysql.createConnection({
    host: 'localhost',
    user: 'root',   // Replace with your MySQL username
    password: '123', // Replace with your MySQL password
    database: 'college_admission' // Replace with your database name
});

// Connect to MySQL
db.connect((err) => {
    if (err) {
        console.error('Error connecting to MySQL:', err);
        return;
    }
    console.log('Connected to MySQL');
});

// Route to handle form submission
app.post('/submit-form', (req, res) => {
    const { name, phone, email, tenthMarks, twelfthMarks, fatherName, dob, aadhaar } = req.body;

    const query = 'INSERT INTO students (name, phone, email, tenthMarks, twelfthMarks, fatherName, dob, aadhaar) VALUES (?, ?, ?, ?, ?, ?, ?, ?)';

    db.query(query, [name, phone, email, tenthMarks, twelfthMarks, fatherName, dob, aadhaar], (err, result) => {
        if (err) {
            console.error('Error inserting data:', err);
            res.status(500).send('Error saving form data.');
        } else {
            res.status(200).send('Form data saved successfully!');
        }
    });
});

// Start the server
app.listen(port, () => {
    console.log(`Server running on http://localhost:${port}`);
});
