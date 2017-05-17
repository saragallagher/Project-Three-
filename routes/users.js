//user routes
const
  express = require('express'),
  passport = require('passport'),
  userRouter = express.Router(),
  List = require('../models/List.js'),
  listsController = require('../controllers/list.js')
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

userRouter.delete('/profile/:id', function(req,res){
          res.json({message: 'task was deleted!', succes: true})
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

userRouter.route('/profile/:id/lists', isLoggedIn)
  .post(listsController.create)
userRouter.route('/profile/:id/lists/new')
  .get(listsController.new)

function isLoggedIn(req, res, next) {
  if(req.isAuthenticated()) return next()
  res.redirect('/')
}

// //Admin routes
// var requiresAdmin = function() {
//   return [
//     isLoggedIn(),
//     function(req, res, next) {
//       if (req.user && req.user.isAdmin === true)
//         next();
//       else
//         res.send(401, 'Unauthorized');
//     }
//   ]
// };
//
// adminRouter.all('/admin/*', requiresAdmin());
// adminRouter.get('/admin/');


module.exports = userRouter
