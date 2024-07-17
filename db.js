const mysql = require('mysql');

// Create a connection to the database
const connection = mysql.createConnection({
  host: 'localhost', // e.g., 'localhost'
  user: 'root', // e.g., 'root'
  password: '', // e.g., 'password'
  database: 'password_generator' // e.g., 'mydatabase'
});

// Connect to the database
connection.connect((err) => {
  if (err) {
    console.error('Error connecting to the database:', err);
    return;
  }
  console.log('Connected to the MySQL database');
});

// Export the connection for use in other modules
module.exports = connection;
