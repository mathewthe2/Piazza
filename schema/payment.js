var mongoose = require( 'mongoose' );
var Schema   = mongoose.Schema;

var PaymentSchema = new Schema({
  title    : String,
  description    : String,
  remarks : String,
  createdAt : {type: Date, required: true, default: Date.now},
  updatedAt: {type: Date, required: true, default: Date.now},
});

var Payment = mongoose.model( 'Payment', PaymentSchema );
module.exports = Payment;