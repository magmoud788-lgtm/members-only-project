const express = require('express');
const router = express.Router();

const messagesController = require('../controllers/messagesController');
const requireAuth = require('../middleware/authmiddleware');

router.get('/new-message', requireAuth, (req, res) => {
  res.render('new-message');
});

router.post('/messages', requireAuth, messagesController.createAMessage);


router.get('/messages/:id', messagesController.showSpecificMessage);

router.post(
  '/messages/:id/delete',
  requireAuth,
  messagesController.deleteAMessage
);
router.get('/', messagesController.showAllOfMessages);
module.exports = router;