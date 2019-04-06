let mongoose = require('mongoose');
let Schema = mongoose.Schema;

let UserSchema = new Schema({
  "chip_id": mongoose.Schema.Types.ObjectId,
  "start_number": String,
  "name": String,
  "lastname": String
});

let Sportsman = mongoose.model('Sportsman', UserSchema);

module.exports = Sportsman;