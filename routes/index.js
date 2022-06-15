const express = require('express');
const router = express.Router();
const isLoggedIn = require('../middlewares');

/* GET home page. */
router.get('/', (req, res, next) => {
  res.render('index')
});

/* GET home page. */
router.get('/secret', isLoggedIn, (req, res, next) => {
  res.json('secret')
});



module.exports = router;
