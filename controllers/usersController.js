const db = require('../db/queries');
require('dotenv').config();

async function updateTheMembership(req, res) {
if(req.body.passcode === process.env.PASSCODE) {
   const { id } = req.user;
   await db.updateMemberShip(id);
  res.redirect('/');
}
}

async function getTheUserByTheirName(req, res) {
  const { username } = req.params;
  const result = await db.getUserByUsername(username);
  res.render('index', {
    username,
    result,
    user: req.user
  })
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

module.exports = {
  getTheUserByTheirName,
  updateTheMembership,
  makeUserAdmin
};