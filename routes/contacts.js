const express = require('express');
const router = express.Router();

//@route           GET      api/contacts
// @desc           Get all users contacts //Your own conctact
// @Access         Private
router.get('/', (req, res) => {
  res.send('Get all cotacts');
});

//@route           PUT    api/contacts
// @desc           Get all users contacts //Your own conctact
// @Access         Private
router.post('/', (req, res) => {
  res.send('Add a contact');
});

//@route           DELETE    api/contacts/:id
// @desc           Update a specific contact
// @Access         Private
router.put('/', (req, res) => {
  res.send('Update a contact');
});

//@route           POST    api/contacts/:id
// @desc            delete a specific contact
// @Access         Private
router.delete('/', (req, res) => {
  res.send('Update a contact');
});

module.exports = router;
