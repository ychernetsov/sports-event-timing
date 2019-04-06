let mongoose = require('mongoose');
let Schema = mongoose.Schema;

let UserSchema = new Schema({
    "chip_id": String,
    "status": String,
    "time": String
});

let Results = mongoose.model('Results', UserSchema);

module.exports = Results;