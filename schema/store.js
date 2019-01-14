var mongoose = require( 'mongoose' );
var Schema   = mongoose.Schema;

var StoreSchema = new Schema({
  name    : String,
  tripAdvisorLink: String,
});

var Store = mongoose.model( 'Store', StoreSchema );
module.exports = Store;