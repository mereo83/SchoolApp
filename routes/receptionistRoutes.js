const express = require('express');
const router = express.Router();


// Receptionist can register a student after 2 minutes
router.post('/register_student', (req, res) => {
  // Check if the "registrationAllowed" cookie exists and is set to 'true'
  if (req.cookies.registrationAllowed === 'true') {
    // Receptionist can register a student
    const newStudent = {
      id: req.body.id,
      name: req.body.name,
      email: req.body.email,
    };

    studentArray.push(newStudent);

    // Set the "registrationAllowed" cookie to false for the next 2 minutes
    res.cookie('registrationAllowed', 'false', { maxAge: 120000 });

    if (req.session.username === 'receptionist') {
      // User is authenticated
      res.status(200).json({ message: 'Student registered successfully.' });
    } else {
      // User is not authenticated
      res.status(401).json({ message: 'Unauthorized' });
    }
  } else {
    // Registration is not allowed yet
    res.status(403).json({ message: 'Registration not allowed at the moment. Please try again later.' });
  }
});

// Other CRUD routes for receptionist

module.exports = router;
