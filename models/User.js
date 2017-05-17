//User Model
const
  mongoose = require('mongoose'),
  bcrypt = require('bcrypt-nodejs'),
  admins = require('../public/admins.js')
  userSchema = new mongoose.Schema({
    local: {
      firstname: String,
      lastname: String,
      email: String,
      password: String,
      isAdmin: {type: Boolean, default: false}
    }//,
  })

  userSchema.methods.generateHash = function(password){
    return bcrypt.hashSync(password, bcrypt.genSaltSync(10))
  }
  userSchema.methods.validPassword = function(password) {
    return bcrypt.compareSync(password, this.local.password)
  }

  module.exports = mongoose.model('User', userSchema)
