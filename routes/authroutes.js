const express = require('express');
const router = express.Router();

const authController = require('../controllers/authController');
const passport = require('passport');

router.get('/login', (req, res) => {
  res.render('login');
});

router.post(
  '/login',
  passport.authenticate('local', {
    successRedirect: '/',
    failureRedirect: '/login'
  })
);

router.get('/sign-up', (req, res) => {
  res.render('sign-up');
});

router.post('/sign-up', authController.signUp);

router.post('/logout', authController.logout);


module.exports = router;