const express = require('express');
const session = require('express-session');
const cookieParser = require('cookie-parser');
const port = process.env.PORT || 7000;
const app = express();

// Import your routes
const receptionistRoutes = require('./routes/receptionistRoutes');
const studentRoutes = require('./routes/studentRoutes');
const teacherRoutes = require('./routes/teacherRoutes');
const principalRoutes = require('./routes/principalRoutes');

// Use your session and cookie middleware
app.use(
  session({
    secret: 'your-secret-key',
    resave: true,
    saveUninitialized: true,
  })
);
app.use(cookieParser());

// Attach the connection pool to the app locals
const pool = require('./config/db');
app.locals.pool = pool;

// Parse JSON and URL-encoded data
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

// Use your routes
app.use('/receptionist', receptionistRoutes);
app.use('/student', studentRoutes);
app.use('/teacher', teacherRoutes);
app.use('/principal', principalRoutes);

app.listen(port, () => {
  console.log(`Server is running on port ${port}`);
});

module.exports = app;
