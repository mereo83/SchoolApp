const express = require('express');
const session = require('express-session');
const cookieParser = require('cookie-parser');
const mysql = require('mysql2');
const port = process.env.PORT || 7000;

const app = express();

try {
  app.use(express.json());
  app.use(express.urlencoded({ extended: true }));
  app.use(cookieParser());

  app.use(
    session({
      secret: 'your-secret-key',
      resave: true,
      saveUninitialized: true,
    })
  );

  // Create a connection pool
  const pool = mysql.createPool({
    host: 'localhost',
    user: 'root',
    password: 'Blessme@12',
    database: 'school_management',
    connectionLimit: 10, // Adjust this according to your needs
  });

  // Attach the connection pool to the app object
  app.locals.pool = pool;

  // Import your routes
  const receptionistRoutes = require('./routes/receptionistRoutes');
  const studentRoutes = require('./routes/studentRoutes');
  const teacherRoutes = require('./routes/teacherRoutes');
  const principalRoutes = require('./routes/principalRoutes');

  // Use your routes
  app.use('/receptionist', receptionistRoutes);
  app.use('/student', studentRoutes);
  app.use('/teacher', teacherRoutes);
  app.use('/principal', principalRoutes);

  app.listen(port, () => {
    console.log(`Server is running on port ${port}`);
  });

  module.exports = app;
} catch (error) {
  console.error('An error occurred:', error);
}
