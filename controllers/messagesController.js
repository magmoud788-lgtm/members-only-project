const db = require('../db/queries');

async function showAllOfMessages(req, res) {
  const result = await db.showAllMessages();
  res.render('index', {
    result,
    user: req.user,
    isMember: req.user?.membership === true
  })
};

async function showSpecificMessage(req, res) {
  const { id } = req.params;
  const showonemessage = await db.showMessage(id);
  res.render('message', {
    id,
    showonemessage,
    user: req.user
  })
};

async function createAMessage(req, res) {
  const { id } = req.user;
  const {title, description } = req.body;
  const createmessage = await db.createMessage(id, title, description);
  res.redirect('/')
};

async function makeUserAdmin(req, res, next) {
  try {
    if (req.body.adminPasscode !== process.env.ADMINPASSCODE) {
      return res.status(403).render('error', {
        title: 'Access Denied',
        message: 'The administrator passcode is incorrect.'
      });
    }

    const { id } = req.user;

    await db.updateAdmin(id);

    res.redirect('/');
  } catch (err) {
    next(err);
  }
}

async function deleteAMessage(req, res) { 
  if (req.user?.admin !== true) {
  return res.status(403).render('error', {
    title: 'Access Denied',
    message: 'You do not have permission to delete messages.'
  });
} else {
  const { id } = req.params;
  const deletemessage = await db.deleteMessage(id);
    res.redirect('/')}
}

module.exports = {
  showAllOfMessages,
  showSpecificMessage,
  createAMessage,
  makeUserAdmin,
  deleteAMessage
};