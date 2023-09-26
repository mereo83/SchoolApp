const express = require('express');
const router = express.Router();
const pool = require('../config/db'); // Import the connection pool from db.js

// Student view his/her detail by ID
router.get('/view/:id', (req, res) => {
  const studentId = req.params.id;

  // Implement code to fetch and return the student's details by ID from the database
  const sql = 'SELECT * FROM Students WHERE studid = ?';

  pool.query(sql, [studentId], (err, results) => {
    if (err) {
      console.error('Error fetching student details:', err);
      res.status(500).json({ message: 'Internal Server Error' });
    } else {
      if (results.length > 0) {
        // Student details found
        const student = results[0]; // Assuming the query returns a single student
        if (req.session && req.session.username === 'student') {
          // User is authenticated
          res.status(200).json({ message: `Student details for ID ${studentId}`, student });
        } else {
          // User is not authenticated
          res.status(401).json({ message: 'Unauthorized' });
        }
      } else {
        // Student with the given ID was not found
        res.status(404).json({ message: `Student with ID ${studentId} not found` });
      }
    }
  });
});

// Other CRUD routes for students

module.exports = router;
