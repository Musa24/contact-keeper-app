const express = require('express');
const router = express.Router();
const User = require('../models/User');

//Express validator
const { body, validationResult } = require('express-validator');

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
  (req, res) => {
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
      return res.status(400).json({ errors: errors.array() });
    } else {
      res.send('All fine');
    }
  }
);

module.exports = router;
