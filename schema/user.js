var mongoose = require( 'mongoose' );
var Schema   = mongoose.Schema;

var UserSchema = new Schema({
  name    : String,
  nickName: String,
  createdAt : {type: Date, required: true, default: Date.now},
  updatedAt: {type: Date, required: true, default: Date.now},
});

var User = mongoose.model( 'User', UserSchema );
module.exports = User;