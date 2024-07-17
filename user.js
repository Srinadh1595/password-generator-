const connection = require('../js/db');
const bcrypt = require('bcryptjs');

const User = {};

User.create = (user, callback) => {
  bcrypt.hash(user.password, 10, (err, hash) => {
    if (err) {
      return callback(err);
    }

    const sql = 'INSERT INTO users (firstname, lastname, email, password) VALUES (?, ?, ?, ?)';
    connection.query(sql, [user.firstname, user.lastname, user.email, hash], callback);
  });
};

User.findByEmail = (email, callback) => {
  const sql = 'SELECT * FROM users WHERE email = ?';
  connection.query(sql, [email], callback);
};

module.exports = User;
