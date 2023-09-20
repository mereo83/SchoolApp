const express = require('express');
const router = express.Router();

// Define the studentArray here
let studentArray = [];

// Student view his/her detail by ID
router.get('/view/:id', (req, res) => {
  const studentId = req.params.id;
  // Implement code to fetch and return the student's details by ID
  // Fetch student details from the studentArray
  const student = studentArray.find((student) => student.id === studentId);
  if (student) {
    if (req.session.username === 'student') {
      // User is authenticated
      res.status(200).json({ message: `Student details for ID ${studentId}`, student });
    } else {
      // User is not authenticated
      res.status(401).json({ message: 'Unauthorized' });
    }
  } else {
    // Student with the given ID is not found
    res.status(404).json({ message: `Student with ID ${studentId} not found` });
  }
});

// Other CRUD routes for students

module.exports = router;
