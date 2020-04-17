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
router.post('/', (req, res) => {
  res.send('Add contact');
});

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
