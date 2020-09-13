const express = require('express');
const router = express.Router();
// Protecting middleware
const auth = require('../middleware/auth');

//Express validator
const { body, validationResult } = require('express-validator');

//  models
const User = require('../models/User');
const Contact = require('../models/Contact');
const { findById } = require('../models/User');

//@route           GET      api/contacts
// @desc           Get all users contacts //Your own conctact
// @Access         Private
router.get('/', auth, async (req, res) => {
  try {
    const contacts = await Contact.find({ user: req.user.id }).sort({
      date: -1,
    });

    res.json(contacts);
  } catch (error) {
    console.log(error.message);
    res.status(500).json({ msg: 'Server Error' });
  }
});

//@route           POST    api/contacts
// @desc           Add new Contact
// @Access         Private
router.post(
  '/',
  [auth, [body('name', 'Name is Required').not().isEmpty()]],
  async (req, res) => {
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
      return res.status(400).json({ errors: errors.array() });
    }

    const { name, email, phone, type } = req.body;

    try {
      const newContact = new Contact({
        name,
        email,
        phone,
        type,
        user: req.user.id,
      });

      const contact = await newContact.save();
      res.json(contact);
    } catch (error) {
      console.log(error.message);
      res.status(500).send('Server Error');
    }
  }
);

//@route           PUT    api/contacts/:id
// @desc           Update a specific contact
// @Access         Private
router.put('/:id', auth, async (req, res) => {
  const { name, email, phone, type } = req.body;

  // Build contact Object
  const contactFields = {};
  if (name) contactFields.name = name;
  if (email) contactFields.email = email;
  if (phone) contactFields.phone = phone;
  if (type) contactFields.type = type;
  try {
    let contact = await Contact.findById(req.params.id);

    if (!contact) return res.status(404).json({ msg: 'Contact Not Found' });

    //Make sure user own the contact
    if (contact.user.toString() !== req.user.id) {
      return res.status(401).json({ msg: 'Not Authorized' });
    }

    contact = await Contact.findByIdAndUpdate(
      req.params.id,
      {
        $set: contactFields,
      },
      { new: true }
    );
    res.json(contact);
  } catch (error) {
    res.status(500).send('Server Error');
  }
});

//@route           POST    api/contacts/:id
// @desc            delete a specific contact
// @Access         Private
router.delete('/:id', auth, async (req, res) => {
  try {
    let contact = await Contact.findById(req.params.id);

    if (!contact) return res.status(404).json({ msg: 'Contact Not Found' });

    // Dont use findByIdAndDelete
    await Contact.findByIdAndRemove(req.params.id);
    res.json({ msg: 'Contact remove' });
  } catch (error) {
    res.status(500).send('Server Error');
  }
});

module.exports = router;
