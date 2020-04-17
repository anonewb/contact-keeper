const express = require('express');
const router = express.Router();
const { check, validationResult } = require('express-validator');
const auth = require('../middleware/auth');

const User = require('../models/User');
const Contact = require('../models/Contact');

// @route      GET api/contacts
// @desc       Get all user contacts
// @acess      Private
router.get('/', auth, async (req, res) => {
  // res.send('Get all contacts');
  try {
    const contacts = await Contact.find({ user: req.user.id }).sort({
      date: -1,
    });

    res.json(contacts);
  } catch (err) {
    console.error(err.message);
    res.status(500).send('Server Error!');
  }
});

// @route      POST api/contacts
// @desc       Add new contact
// @acess      Private
router.post(
  '/',
  [auth, [check('name', 'Please add name').not().isEmpty()]],
  async (req, res) => {
    // res.send('Add contact');
    // Validating
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
      return res.status(400).json({ errors: errors.array() });
    }

    const { name, email, phone, type } = req.body;

    try {
      // Creating new contact instance
      const newContact = new Contact({
        name,
        email,
        phone,
        type,
        user: req.user.id,
      });

      // save in db
      const contact = await newContact.save();

      res.json(contact);
    } catch (err) {
      console.error(err.message);
      res.status(500).send('Server Error!');
    }
  }
);

// @route      PUT api/contacts/:id
// @desc       Update contact
// @acess      Private
router.put('/:id', (req, res) => {
  res.send('Update contact');
});

// @route      DELETE api/contacts/:id
// @desc       Delete contact
// @acess      Private
router.delete('/:id', (req, res) => {
  res.send('Delete contact');
});

module.exports = router;
