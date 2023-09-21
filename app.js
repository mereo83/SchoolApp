const express = require('express');
const session = require('express-session');
const cookieParser = require('cookie-parser');
const port = process.env.PORT || 7000; // You can specify any port you prefer

const app = express();

try {
  // Configure middleware
  app.use(express.json());
  app.use(express.urlencoded({ extended: true }));
  app.use(cookieParser());

  app.use(session({
    secret: 'your-secret-key',
    resave: true,
    saveUninitialized: true,
  }));

  // Import the studentArray from studentRoutes.js
  const { studentArray } = require('./routes/studentRoutes');

  // Routes
  const receptionistRoutes = require('./routes/receptionistRoutes');
  const studentRoutes = require('./routes/studentRoutes');
  const teacherRoutes = require('./routes/teacherRoutes');
  const principalRoutes = require('./routes/principalRoutes');

  app.use('/receptionist', receptionistRoutes);
  app.use('/student', studentRoutes);
  app.use('/teacher', teacherRoutes);
  app.use('/principal', principalRoutes);

  
  app.listen(port, () => {
    console.log(`Server is running on port ${port}`);
  });

  // Export the app object
  module.exports = app;
} catch (error) {
  console.error('An error occurred:', error);
}
