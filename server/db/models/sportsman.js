let mongoose = require('mongoose');
let Schema = mongoose.Schema;

let UserSchema = new Schema({
  "_id": mongoose.Schema.Types.ObjectId,
  "chip_id": Number,
  "start_number": String,
  "name": String,
  "lastname": String,
  "status": {
    "finishing": Boolean,
    "finished": Boolean,
    "finished_time": String
  }
});

let Sportsman = mongoose.model('Sportsman', UserSchema);

module.exports = Sportsman;