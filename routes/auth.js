const express = require('express');
const router = express.Router();

//@route           GET     api/auth
// @desc           Get logged in user
// @Access         Private
router.get('/', (req, res) => {
  res.send('Get a User');
});

//@route           POST      api/auth
// @desc           Auth User and Get a Token
// @Access         Public
router.post('/', (req, res) => {
  res.send('Log in User');
});

module.exports = router;
