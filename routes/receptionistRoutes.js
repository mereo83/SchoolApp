const express = require('express');
const router = express.Router();
const pool = require('../config/db'); // Import the connection pool from db.js

// Receptionist can register a student after 2 minutes
router.post('/register_student', async (req, res) => {
  try {
    // Set the user role in the session directly (since there's no login mechanism)
    req.session.user = 'receptionist';

    // Check if the "registrationAllowed" cookie exists and is set to 'true'
    if (req.cookies.registrationAllowed === 'true' || !req.cookies.registrationAllowed) {
      // Check if the user is authenticated as a receptionist in the session
      if (req.session.user === 'receptionist') {
        // Receptionist can register a student
        const newStudent = {
          studid: req.body.studid,
          name: req.body.name,
          age: req.body.age,
          gender: req.body.gender,
          email: req.body.email,
        };

        // Insert the new student into the Students table
        const sql = 'INSERT INTO Students (studid, name, age, gender, email) VALUES (?, ?, ?, ?, ?)';
        const values = [
          newStudent.studid,
          newStudent.name,
          newStudent.age,
          newStudent.gender,
          newStudent.email,
        ];

        await pool.query(sql, values); // Use await here to wait for the query to complete

        // Registration was successful
        // Set the "registrationAllowed" cookie to false for the next 2 minutes
        res.cookie('registrationAllowed', 'false', { maxAge: 120000 });
        res.status(200).json({ message: 'Student registered successfully.' });
      } else {
        // User is not authenticated as a receptionist
        res.status(401).json({ message: 'Unauthorized' });
      }
    } else {
      // Registration is not allowed yet
      res.status(403).json({ message: 'Registration not allowed at the moment. Please try again later.' });
    }
  } catch (error) {
    console.error('Error registering student:', error);
    res.status(500).json({ message: 'Internal Server Error' });
  }
});

// Other CRUD routes for receptionist

module.exports = router;
