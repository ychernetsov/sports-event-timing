let mongoose = require('mongoose');

let SportsmanSchema = new mongoose.Schema({
  "_id": mongoose.Schema.Types.ObjectId,
  "start_number": String,
  "name": String,
  "lastname": String
});

let Sportsman = mongoose.model('Sportsman', SportsmanSchema);

module.exports = Sportsman;