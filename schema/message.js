var mongoose = require( 'mongoose' );
var Schema = mongoose.Schema;

var MessageSchema = new Schema({
  content: String,
  type: String,
  sender: String,
  createdAt : {type: Date, required: true, default: Date.now},
  updatedAt: {type: Date, required: true, default: Date.now},
});

var Message = mongoose.model( 'Message', MessageSchema );
module.exports = Message;