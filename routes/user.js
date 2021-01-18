/* eslint-disable no-underscore-dangle */
const express = require('express');

const router = express.Router();
const bcrypt = require('bcrypt');
const User = require('../models/user.model');

router.get('/login', (req, res) => {
  res.render('user/login');
});

router.post('/login', async (req, res) => {
  const {
    email,
    password,
  } = req.body;
  if (email && password) {
    try {
      const currentUser = await User.findOne({
        email,
      });
      if (currentUser) {
        if (await bcrypt.compare(password, currentUser.password)) {
          console.log('Success login');

          req.session.user = {
            id: currentUser._id,
          };

          return res.redirect('/');
        }
      }
    } catch (error) {
      return res.redirect('/user/login');
    }
  }
});

router.get('/registration', (req, res) => {
  res.render('user/registration');
});

router.post('/registration', async (req, res) => {
  const { email, password, name } = req.body;
  if (email && password && name) {
    try {
      const hashPass = await bcrypt.hash(password, 10);
      const user = new User({
        email,
        password: hashPass,
        name,
      });

      await user.save();
      req.session.user = {
        id: user._id,
      };

      return res.redirect('/');
    } catch (error) {
      return res.redirect('/user/registration');
    }
  }
});

router.get('/logout', (req, res) => {
  req.session.destroy((err) => {
    if (err) {
      return res.render('error', {
        error: err,
      });
    }
    res.clearCookie('sid');
    return res.redirect('/');
  });
});

module.exports = router;
