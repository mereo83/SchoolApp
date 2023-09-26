const express = require('express');
const router = express.Router();
const pool = require('../config/db'); // Import the connection pool from db.js

// Teacher can update student detail by ID
router.put('/update/:id', (req, res) => {
  const studentId = req.params.id;
  const updatedData = req.body; // Assuming you send updated data in the request body

  // Implement code to update the student's details by ID in the database
  // You would typically perform a SQL UPDATE operation here
  const sql = 'UPDATE Students SET ? WHERE id = ?'; // Change "Students" to your actual table name

  pool.query(sql, [updatedData, studentId], (err, results) => {
    if (err) {
      console.error('Error updating student details:', err);
      res.status(500).json({ message: 'Internal Server Error' });
    } else {
      if (results.affectedRows > 0) {
        // Student details updated successfully
        res.status(200).json({ message: `Student details updated for ID ${studentId}` });
      } else {
        // Student with the given ID was not found
        res.status(404).json({ message: `Student with ID ${studentId} not found` });
      }
    }
  });
});

// Other CRUD routes for teachers

module.exports = router;
