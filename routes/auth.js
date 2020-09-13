const express = require('express');
const router = express.Router();
const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');
const config = require('config');
const auth = require('../middleware/auth');

//Express validator
const { body, validationResult } = require('express-validator');

// Loading Model
const User = require('../models/User');

//@route           GET     api/auth
// @desc           Get logged in user
// @Access         Private
router.get('/', auth, async (req, res) => {
  try {
    // Find the user from DB -password
    const user = await User.findById(req.user.id).select('-password');
    res.json(user);
  } catch (error) {
    console.log(error.message);
    return res.status(500).json({ msg: 'Server Error' });
  }
});

//Valid email

body('email', 'Please include a valid email').isEmail(),
  //@route           POST      api/auth
  // @desc           Auth User and Get a Token
  // @Access         Public
  router.post(
    '/',
    [
      body('email', 'Please include a valid email').isEmail(),
      body('password', 'Password is required').exists(),
    ],
    async (req, res) => {
      const errors = validationResult(req);
      if (!errors.isEmpty()) {
        return res.status(400).json({ errors: errors.array() });
      }

      const { email, password } = req.body;

      try {
        let user = await User.findOne({ email });
        // Check if the user Exit
        if (!user) {
          return status(400).json({ msg: 'Invalid Credentials' });
        }
        // Compare the User Password with hashed password
        const isMatch = await bcrypt.compare(password, user.password);

        if (!isMatch) {
          return res.status(400).json({ msg: 'Invalid Credentials' });
        }

        //  Create and Send Payload
        const payload = {
          user: {
            id: user.id,
          },
        };

        jwt.sign(
          payload,
          config.get('jwtScret'),
          { expiresIn: 3600000 },
          (err, token) => {
            if (err) throw err;
            res.status(500).json({ token });
          }
        );
      } catch (error) {}
    }
  );

module.exports = router;
