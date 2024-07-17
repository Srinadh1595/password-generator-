// routes/auth.js
const express = require('express');
const router = express.Router();
const User = require('../models/user');
const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');
const authenticateJWT = require('../middleware/auth');

const jwtSecret = 'dkineksh43433@dkj'; // Replace with your JWT secret

router.post('/register', (req, res) => {
  const { firstname, lastname, email, password } = req.body;

  User.create({ firstname, lastname, email, password }, (err, results) => {
    if (err) {
      console.log(err);
      return res.status(500).json({ message: 'Error creating user' });
    }
    res.status(201).json({ message: 'User created' });
  });
});

router.post('/login', (req, res) => {
  const { email, password } = req.body;

  User.findByEmail(email, (err, results) => {
    if (err) {
      return res.status(500).json({ message: 'Error finding user' });
    }
    if (results.length === 0) {
      return res.status(401).json({ message: 'Invalid credentials' });
    }

    const user = results[0];

    bcrypt.compare(password, user.password, (err, isMatch) => {
      if (err) {
        return res.status(500).json({ message: 'Error comparing passwords' });
      }
      if (!isMatch) {
        return res.status(401).json({ message: 'Invalid credentials' });
      }

      const token = jwt.sign({ id: user.id, email: user.email }, jwtSecret, { expiresIn: '1h' });

      res.json({user, token });
    });
  });
});


router.get('/verify-token', authenticateJWT, (req, res) => {
  res.json({ message: 'Token is valid' });
});

// Serve password-gen.html only to authenticated users
router.get('/password-gen', authenticateJWT, (req, res) => {
  res.sendFile('/path/to/password-gen.html'); // Replace with the correct path to your password-gen.html file
});

module.exports = router;
