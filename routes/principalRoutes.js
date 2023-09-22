const express = require('express');
const router = express.Router();
const mysql = require('mysql2'); // Import the mysql2 library

// Create a MySQL connection
const connection = mysql.createConnection({
  host: 'localhost', // Change to your MySQL server host
  user: 'root',      // Your MySQL username
  password: 'Blessme@12', // Your MySQL password
  database: 'school_management', // Replace with your database name
});

// Principal can view student detail by ID
router.get('/view/:id', (req, res) => {
  const studentId = req.params.id;
  
  // Implement code to fetch and return the student's details by ID for the principal
  // Fetch student details from the database
  const sql = 'SELECT * FROM Students WHERE id = ?';
  
  connection.query(sql, [studentId], (err, results) => {
    if (err) {
      console.error('Error fetching student details:', err);
      res.status(500).json({ message: 'Internal Server Error' });
    } else {
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
    }
  });
});

// Principal can update student detail by ID
router.put('/update/:id', (req, res) => {
  const studentId = req.params.id;
  const updatedData = req.body; // Assuming you send updated data in the request body
  // Implement code to update the student's details by ID for the principal
  // Update student details in the database
  // Send a response indicating success or failure
  
  if (req.session.username === 'principal') {
    // User is authenticated
    res.status(200).json({ message: `Student details updated for ID ${studentId} (Principal update)` });
  } else {
    // User is not authenticated
    res.status(401).json({ message: 'Unauthorized' });
  }
});

// Principal can delete student by ID
router.delete('/delete/:id', (req, res) => {
  const studentId = req.params.id;
  // Implement code to delete a student by ID for the principal
  // Delete student from the database
  // Send a response indicating success or failure
  if (req.session.username === 'principal') {
    // User is authenticated
    res.status(200).json({ message: `Student deleted for ID ${studentId} (Principal delete)` });
  } else {
    // User is not authenticated
    res.status(401).json({ message: 'Unauthorized' });
  }
});

module.exports = router;
