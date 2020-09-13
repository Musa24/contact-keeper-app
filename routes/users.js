const express = require('express');
const router = express.Router();

//@route           POST      api/user
// @desc           Register a User
// @Access         Public
router.post('/', (req, res) => {
  res.send('Register a User');
});

module.exports = router;
