var mongoose = require( 'mongoose' );
var Schema   = mongoose.Schema;

var GuestSchema = new Schema({
  name    : String,
  avatar  : String,
  checkOut: {type: Date },
  phone: String,
  email: String,
  storeId : {type: mongoose.Schema.Types.ObjectId, ref: 'Store'},
  reviewUrl: String,
  createdAt : {type: Date, required: true, default: Date.now},
  updatedAt: {type: Date, required: true, default: Date.now},
});

var Guest = mongoose.model( 'Guest', GuestSchema );
module.exports = Guest;