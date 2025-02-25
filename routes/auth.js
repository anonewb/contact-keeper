const express = require('express');
const router = express.Router();
const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');
const config = require('config');
const { check, validationResult } = require('express-validator');
const auth = require('../middleware/auth');

const User = require('../models/User');

// @route      GET api/auth
// @desc       Get logged in user
// @acess      Private
router.get('/', auth, async (req, res) => {
  // res.send('Get logged in user');
  try {
    const user = await User.findById(req.user.id).select('-password');
    res.json(user);
  } catch (err) {
    console.error(err.message);
    res.status(500).send('Server Error!');
  }
});

// @route      POST api/auth
// @desc       Auth user and get token
// @acess      Public
router.post(
  '/',
  [
    check('email', 'Please include a valid email').isEmail(),
    check('password', 'Password is required').exists(),
  ],
  async (req, res) => {
    // res.send('Log in user');

    // Validating
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
      return res.status(400).json({ errors: errors.array() });
    }

    const { name, email, password } = req.body;

    try {
      let user = await User.findOne({ email });

      if (!user) {
        return res.status(400).json({ msg: 'Invalid Credentials' });
      }

      const isMatch = await bcrypt.compare(password, user.password);

      if (!isMatch) {
        return res.status(400).json({ msg: 'Invalid Credentials' });
      }

      // // Creating new user instance
      // user = new User({
      //   name,
      //   email,
      //   password,
      // });

      // // to generate hash
      // const salt = await bcrypt.genSalt(10);

      // // saving in user object
      // user.password = await bcrypt.hash(password, salt);

      // // save in db
      // await user.save();

      // // show success msg
      // // res.send('User saved');

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
