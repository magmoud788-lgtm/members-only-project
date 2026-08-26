function requireAuth(req, res, next) {
  if(req.isAuthenticated()){
    return next();;
  }
  return res.status(401).render('error', {
    title: 'Login or sign-up isRequired',
    message: 'You need to be logged in or signed in to do that.'
  });
}

module.exports = requireAuth;