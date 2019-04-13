let mongoose = require('mongoose');

let RaceStatusSchema = new mongoose.Schema({
    "_id": mongoose.Schema.Types.ObjectId,
    "started": Boolean,
    "finished": Boolean,
    "latest_time_ts": Number
});

let RaceStatus = mongoose.model('RaceStatus', RaceStatusSchema);

module.exports = RaceStatus;