//user routes
const
  express = require('express'),
  passport = require('passport'),
  userRouter = express.Router(),
  List = require('../models/List.js'),
  user = require('../models/User.js'),
  listsController = require('../controllers/list.js'),
  usersController = require('../controllers/user.js')
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
  passport.authenticate('facebook', { failureRedirect: '/login' }),
  function(req, res) {
    // Successful authentication, redirect home.
    res.redirect('/');
  })

//Logout function
userRouter.get('/logout', function(req, res) {
            req.logout();
            res.redirect('/');
});

///create update and delete lists

userRouter.route('/profile/:id/lists', isLoggedIn)
  .post(listsController.create)
userRouter.route('/profile/:id/lists/new', isLoggedIn)
  .get(listsController.new)

  userRouter.route('/official/:id', isLoggedIn)
    .get((req,res) =>{res.render('users/admin', {user: req.user})
  })
   .patch(usersController.adminUpdate) //{
    // var updateObject = req.body;
    // var id = req.params.id;
    // db.users.update({"local._id"  : ObjectId(id)}, {$set: {'updateObject.isAdmin':true}});
//});

function isLoggedIn(req, res, next) {
  if(req.isAuthenticated()) return next()
  res.redirect('/')
}

// function makeAdmin(req, res, next) {
//   if(req.isAuthenticated() )
//   res.redirect('/')
//}
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
