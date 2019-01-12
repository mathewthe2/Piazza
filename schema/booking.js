var mongoose = require( 'mongoose' );
var Schema   = mongoose.Schema;

var BookingSchema = new Schema({
  title    : String,
  type    : String,
  createdAt : {type: Date, required: true, default: Date.now},
  updatedAt: {type: Date, required: true, default: Date.now},
});

var Booking = mongoose.model( 'Booking', BookingSchema );
module.exports = Booking;