// comment
const
  express = require('express'),
  app = express(),
  mongoose = require('mongoose'),
  logger = require('morgan'),
  bodyParser = require('body-parser'),
  ejs = require('ejs'),
	ejsLayouts = require('express-ejs-layouts'),
  flash = require('connect-flash'),
  cookieParser = require('cookie-parser'),
  session = require('express-session'),
  MongoDBStore = require('connect-mongodb-session')(session),
  passport = require('passport'),
  PORT= 3000

app.get('/', (req, res) => {
  res.json('Welcome to Travel Tasker')
})

app.listen(PORT, (err) => {
  console.log(err || `Server listening on port ${PORT}. 🤘`)
})
