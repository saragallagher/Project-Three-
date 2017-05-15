const
  express = require('express'),
  app = express(),
  mongoose = require('mongoose'),
  logger = require('morgan'),
  bodyParser = require('body-parser'),
  cookieParser = require('cookie-parser'),
  ejs = require('ejs'),
	ejsLayouts = require('express-ejs-layouts'),
  flash = require('connect-flash'),
  session = require('express-session'),
  MongoDBStore = require('connect-mongodb-session')(session),
  passport = require('passport'),
  listsCtrl = require('./controllers/lists.js'),
  passportConfig = require('./config/passport.js'),
  userRoutes = require('./routes/users.js'),
  listRoutes = require('./routes/lists.js'), 
  //environment port
  port = process.env.PORT || 3000,
  mongoConnectionString = process.env.MONGODB_URL || 'mongodb://localhost/project-three'


// mongoose connection
  mongoose.connect(mongoConnectionString, (err) => {
  	console.log(err || "Connected to MongoDB (passport-authentication)")
  })

// will store session information as a 'sessions' collection in Mongo
  const store = new MongoDBStore({
    uri: mongoConnectionString,
    collection: 'sessions'
  });

  // middleware
  app.use(logger('dev'))
  app.use(cookieParser())
  app.use(bodyParser.urlencoded({extended: true}))
  app.use(bodyParser.json())
  app.use(flash())

  // ejs configuration
  app.set('view engine', 'ejs')
  app.use(ejsLayouts)
  app.use(express.static(__dirname + '/public'))

  app.use(session({
  	secret: "boom",
  	cookie: {maxAge: 60000000},
  	resave: true,
  	saveUninitialized: false,
  	store: store
  }))

  app.use(passport.initialize())
  app.use(passport.session())

  app.use((req,res,next) =>{
  	app.locals.currentUser = req.user
  	app.locals.isLoggedIn = !!req.user
  	next()
  })

 
  //root route
  app.get('/', (req,res) => {
  	res.render('users/index')
  })

  app.use('/', userRoutes)
  app.use('/lists', listRoutes)


  app.listen(port, (err) => {
  	console.log(err || `Server listening on port ${port}. 🤘`)
  })

