var mongoose = require( 'mongoose' );
var Schema = mongoose.Schema;

var ConversationSchema = new Schema({
  sender    : String,
  recipient    : String,
  messages: [{type:mongoose.Schema.Types.ObjectId, ref: 'Message'}],
  createdAt : {type: Date, required: true, default: Date.now},
  updatedAt: {type: Date, required: true, default: Date.now},
});

var Conversation = mongoose.model( 'Conversation', ConversationSchema );
module.exports = Conversation;