const express = require('express');
const router = express.Router();

const usersController = require('../controllers/usersController');
const requireAuth = require('../middleware/authmiddleware');

router.get('/join', requireAuth, (req, res) => {
  res.render('join');
});
router.post('/join', usersController.updateTheMembership);

router.get('/admin', requireAuth, (req, res) => {
  res.render('admin');
});

router.post('/admin', requireAuth, usersController.makeUserAdmin);

module.exports = router;