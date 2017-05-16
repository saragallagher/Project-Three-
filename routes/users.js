//user routes
const
  express = require('express'),
  passport = require('passport'),
  userRouter = express.Router(),
  List = require('../models/List.js')
////login sign up logout and profile view
userRouter.route('/login')
  .get((req,res) =>{res.render('users/login', {message:req.flash('loginMessage')})
})
  .post(passport.authenticate('local-login', {
    successRedirect: '/profile',
    failureRedirect: '/login'
}))

userRouter.route('/signup')
  .get((req,res) =>{res.render('users/signup', {message: req.flash('signupMessage')})
})
  .post(passport.authenticate('local-signup', {
    successRedirect: '/profile',
    failureRedirect: '/signup'
  }))

userRouter.get('/profile', isLoggedIn, (req,res) =>{
  res.render('users/profile', {user:req.user})
})

userRouter.get('/logout', isLoggedIn, (req,res) =>{
  req.logout()
  res.redirect('/')
})

//Facebook routes
userRouter.get('/auth/facebook', passport.authenticate('facebook', { scope : 'email'}));

userRouter.get('/auth/facebook/callback',
  passport.authenticate('facebook', {
    successRedirect: '/profile',
    failureRedirect: '/login'
  }));

//Logout function
userRouter.get('/logout', function(req, res) {
            req.logout();
            res.redirect('/');
});

///create update and delete lists

userRouter.post('/profile/:id/list', isLoggedIn, (req, res) => {
  var newList = new List(req.body)
  console.log(newList);
  newList.user = req.params.id
  res.redirect('/lists')
})

userRouter.get('/profile/:id/list/new', (req, res) => {
  res.render('lists/new',  {user:req.user})
})


function isLoggedIn(req, res, next) {
  if(req.isAuthenticated()) return next()
  res.redirect('/')
}


module.exports = userRouter
