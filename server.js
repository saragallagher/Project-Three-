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
  listsCtrl = require('./controllers/lists.js'),
  PORT= 3000

mongoose.connect('mongodb://localhost/packing-list', (err) => {
  console.log(err || "Connected to Mongo!");
})

app.set('view engine', 'ejs')

app.use(logger('dev'))
app.use(bodyParser.json())

app.get('/', (req, res) => {
  res.render('index')
})

app.use('/lists', require('./routes/lists.js'))

app.listen(PORT, (err) => {
  console.log(err || `Server listening on port ${PORT}. 🤘`)
})
