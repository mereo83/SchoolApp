const express = require('express');
const router = express.Router();
const pool = require('../config/db'); // Import the connection pool from db.js

// Principal can view student detail by ID
router.get('/view/:id', async (req, res) => {
  try {
    const studentId = req.params.id;

    // Implement code to fetch and return the student's details by ID for the principal
    // Fetch student details from the database
    const sql = 'SELECT * FROM Students WHERE id = ?';

    const [results] = await pool.query(sql, [studentId]);

    if (results.length > 0) {
      // Student details found
      const student = results[0]; // Assuming the query returns a single student
      if (req.session.username === 'principal') {
        // User is authenticated
        res.status(200).json({ message: `Student details for ID ${studentId} (Principal view)`, student });
      } else {
        // User is not authenticated
        res.status(401).json({ message: 'Unauthorized' });
      }
    } else {
      // Student with the given ID was not found
      res.status(404).json({ message: `Student with ID ${studentId} not found` });
    }
  } catch (error) {
    console.error('Error fetching student details:', error);
    res.status(500).json({ message: 'Internal Server Error' });
  }
});

// Other CRUD routes for principals

module.exports = router;
