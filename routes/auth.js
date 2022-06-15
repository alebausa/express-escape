const express = require('express');
const router = express.Router();
const bcrypt = require('bcryptjs');
const saltRounds = 10;
const User = require('../models/User'); 

/* GET signup */
router.get('/signup', async (req, res, next) => {
  res.render('auth/signup');
})

/* POST signup */
router.post('/signup', async (req, res, next) => {
  const { name, email, password, age } = req.body;
  // Check if fields are filled
  if (!name || !email || !password || !age) {
    res.render('auth/signup', { error: 'All fields are mandatory. Please provide your username, email and password.' });
    return;
  }
  // Check if password meets requirements
  const regex = /(?=.*\d)(?=.*[a-z])(?=.*[A-Z]).{6,}/;
  if (!regex.test(password)) {
    res.render('auth/signup', { error: 'Password needs to have at least 6 characters and must contain at least one number, one lowercase and one uppercase letter.' });
    return;
  }
  
  try {
    const salt = await bcrypt.genSalt(saltRounds);
    const hashedPassword = await bcrypt.hash(password, salt);
    const user = await User.create({ name, email, age, hashedPassword });
    res.redirect('/auth/login');
  } catch (err) {
    next(err)
  }
})

/* GET login view */
router.get('/login', async (req, res, next) => {
  res.render('auth/login');
})

router.post('/login', async (req, res, next) => {
  const { email, password } = req.body;
  // Check if fields are not empty
  if (!email || !password) {
    res.render('auth/login', { error: 'Please enter both, email and password to login.'});
    return;
  }
  // Make sure the user is in DB
  try {
    const user = await User.findOne({ email: email });
    if (!user) {
      res.render('auth/login', { error: 'Email is not registered. Try with other email.'});
      return;
    } else {
      const pwdMatch = await bcrypt.compare(password, user.hashedPassword);
      if (pwdMatch) {
        req.session.currentUser = user;
        res.render('auth/profile', user);
      } else {
        res.render('auth/login', { error: 'Unable to authenticate user'});
        return;
      }
     }
  } catch (error) {
    next(error)
  }
})

router.post('/logout', isLoggedIn, (req, res, next) => {
  req.session.destroy((err => {
    if (err) {
        next(error)
    } else {
        res.redirect('/auth/login');
      }
    }));
})

module.exports = router;
