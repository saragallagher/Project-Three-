// const
//   express = require('express'),
//   passport = require('passport'),
//   adminRouter = express.Router()
//   // userRouter = require('./users.js')
//
// //var ensureLoggedIn = require('connect-ensure-login').ensureLoggedIn;
//
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
// function isLoggedIn(req, res, next) {
//   if(req.isAuthenticated()) return next()
//   res.redirect('/')
// }
//
//
//
// adminRouter.all('/admin/*', requiresAdmin());
// adminRouter.get('/admin/');
//
//
// module.exports = adminRouter
