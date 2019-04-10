let mongoose = require('mongoose');

let ResultSchema = new mongoose.Schema({
    "_id": mongoose.Schema.Types.ObjectId,
    "finishing": String,
    "crossed": String,
    "sportsman": { type: mongoose.Schema.Types.ObjectId, ref: "Sportsman"}
});

let Result = mongoose.model('Result', ResultSchema);

module.exports = Result;