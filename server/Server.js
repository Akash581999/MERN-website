const express = require('express');
const mysql = require('mysql2');
const bodyParser = require('body-parser');
const cors = require('cors');

const app = express();

app.use(cors());
app.use(bodyParser.urlencoded({ extended: false }));
app.use(bodyParser.json()); // Use JSON body parser as well

const pool = mysql.createPool({
    connectionLimit: 10,
    host: 'localhost',
    user: 'root',
    password: '99Akash19@',
    database: 'akash_db'
});

// Test the database connection
pool.getConnection((err, connection) => {
    if (err) {
        console.error('Error connecting to database:', err);
    } else {
        console.log('Connected to MySQL database');
        connection.release(); // Release the connection
    }
});

app.post('/contactform', (req, res) => {
    const formData = req.body;

    const sql = `INSERT INTO contactform (firstName, lastName, username, city, state, zip)
               VALUES (?, ?, ?, ?, ?, ?)`;
    const values = [
        formData.firstName,
        formData.lastName,
        formData.username,
        formData.city,
        formData.state,
        formData.zip
    ];

    pool.query(sql, values, (err, result) => {
        if (err) {
            console.error('Error inserting into MySQL:', err);
            res.status(500).json({ message: 'Failed to insert into database' });
            return;
        }
        console.log('Inserted into MySQL with ID:', result.insertId);
        res.status(200).json({ message: 'Form data inserted successfully' });
    });
});

const port = process.env.PORT || 5000; // Use uppercase for environment variable 'PORT'
app.listen(port, () => {
    console.log(`Server is running on http://localhost:${port}`);
});
