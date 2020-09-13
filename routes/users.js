const express = require('express');
const router = express.Router();
const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');
const config = require('config');

//Express validator
const { body, validationResult } = require('express-validator');

// Loading Model
const User = require('../models/User');

//@route           POST      api/user
// @desc           Register a User
// @Access         Public
router.post(
  '/',
  [
    //Name must not be empty
    body('name', 'Please add a name').not().isEmpty(),
    //Valid email

    body('email', 'Please include a valid email').isEmail(),
    //Passoord must be at least 6 characters
    body('password', 'Please enter a passowrd with 6 characters').isLength({
      min: 6,
    }),
  ],
  async (req, res) => {
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
      return res.status(400).json({ errors: errors.array() });
    }

    const { name, email, password } = req.body;
    try {
      let user = await User.findOne({ email });
      if (user) {
        return res.status(400).json({ msg: 'User already exists' });
      }

      user = new User({
        name,
        email,
        password,
      });

      //encrypting the password
      const salt = await bcrypt.genSaltSync(10);
      user.password = await bcrypt.hash(password, salt);

      await user.save();
      //Create and Send token to the user
      const payLoad = {
        user: {
          id: user.id,
        },
      };
      jwt.sign(
        payLoad,
        config.get('jwtScret'),
        { expiresIn: 3600000 },
        (err, token) => {
          if (err) throw err;
          res.json({ token });
        }
      );
    } catch (error) {
      console.log(error.message);
      res.status(500).send('Server Error');
    }
  }
);

module.exports = router;
