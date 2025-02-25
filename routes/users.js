const express = require('express');
const router = express.Router();
const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');
const config = require('config');
const { check, validationResult } = require('express-validator');
const User = require('../models/User');

// @route      POST api/users
// @desc       Register a user
// @acess      Public
router.post(
  '/',
  [
    check('name', 'Please add name').not().isEmpty(),
    check('email', 'Please include a valid email').isEmail(),
    check(
      'password',
      'Please enter a password with 6 or more characters'
    ).isLength({ min: 6 }),
  ],
  async (req, res) => {
    // res.send('Register a user');
    // res.send(req.body);

    // Validating
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
      return res.status(400).json({ errors: errors.array() });
    }
    // res.send('Validated!');

    const { name, email, password } = req.body;

    try {
      let user = await User.findOne({ email });

      if (user) {
        return res.status(400).json({ msg: 'User already exists' });
      }

      // Creating new user instance
      user = new User({
        name,
        email,
        password,
      });

      // to generate hash
      const salt = await bcrypt.genSalt(10);

      // saving in user object
      user.password = await bcrypt.hash(password, salt);

      // save in db
      await user.save();

      // show success msg
      // res.send('User saved');

      const payload = {
        user: {
          id: user.id,
        },
      };

      jwt.sign(
        payload,
        config.get('jwtSecret'),
        {
          expiresIn: 3600000,
        },
        (err, token) => {
          if (err) throw err;
          res.json({ token });
        }
      );
    } catch (err) {
      // show error only to developer in node server if any
      console.error(err.message);
      // show error to user in browser if any
      res.status(500).send('Server Error!');
    }
  }
);

module.exports = router;
