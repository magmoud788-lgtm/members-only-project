const passport = require('passport');
const bcrypt = require('bcryptjs');
const pool = require('../db/pool');
const LocalStrategy = require('passport-local').Strategy;

async function signUp(req, res, next) {
  try {
    const hashedPassword = await bcrypt.hash(req.body.password, 10);

    const { rows } = await pool.query(
      `INSERT INTO users (username, email, password_hash)
       VALUES ($1, $2, $3)
       RETURNING *`,
      [
        req.body.username,
        req.body.email,
        hashedPassword
      ]
    );

    const user = rows[0];

    req.login(user, (err) => {
      if (err) {
        return next(err);
      }

      res.redirect('/');
    });

  } catch (err) {
    return next(err);
  }
}


passport.use(
  new LocalStrategy(async (username, password, done) => {
    try {
      const { rows } = await pool.query('SELECT * FROM users WHERE username = $1', [username]);
      const user = rows[0];

      if(!user) {
        return done(null, false, { message: 'Incorrect username'});
      }
      const match = await bcrypt.compare(password, user.password_hash);
      if(!match) {
        return done(null, false, { message: 'Incorrect password'});
      }
      return done(null, user);
    } catch(err) {
      return done(err);
    }
  })
);


passport.serializeUser((user, done) => {
  done(null, user.id);
});


passport.deserializeUser(async (id, done) => {
  try {
    const { rows } = await pool.query('SELECT * FROM users WHERE id = $1', [id]);
    const user = rows[0];

    done(null, user);
  } catch(err) {
    done(err);
  }
});


async function logout(req, res, next) {
  req.logout((err) => {
    if(err) {
      return next(err);
    }
    res.redirect('/');
  });
};

module.exports = {
signUp,
logout
}