const path = require("node:path");
const { Pool } = require("pg");
const express = require("express");
const session = require("express-session");
const passport = require("passport");
const LocalStrategy = require('passport-local').Strategy;

const app = express();
const authRouter = require('./routes/authroutes');
const usersRouter = require('./routes/usersroutes');
const messagesRouter = require('./routes/messagesroutes');

app.set("views", path.join(__dirname, "views"));
app.set("view engine", "ejs");

app.use(session({ secret: "cats", resave: false, saveUninitialized: false }));
app.use(passport.initialize());
app.use(passport.session());
app.use(express.urlencoded({ extended: false }));
app.use(express.static('public'));

app.use('/', authRouter);
app.use('/', usersRouter);
app.use('/', messagesRouter);
app.listen(3000, (error) => {
  if (error) {
    throw error;
  }
  console.log("app listening on port 3000!");
});
