const Sportsman = require("../../db/models/sportsman");
const mongoose = require("mongoose");
const dbService = require("../../db-service");

exports.get_sportsmen = (req, res, next) => {
    Sportsman
    .find()
    .select('-__v')
    .exec()
    .then(docs => {
        const response = {
            count: docs.length,
            sportsmen: docs
        }
        res.status(200).json(response)
    })
    .catch(err => {
        console.log(err);
        res.status(500).json({
            message: "Not found"
        })
    })
}

exports.add_sportsmen = (req, res, next) => {
    const sportsmen = req.body.map(person => {
        return new Sportsman({
            _id: new mongoose.Types.ObjectId(),
            start_number: person.start_number,
            name: person.name,
            lastname: person.lastname
        });
    });  
    
    dbService.addDocs(Sportsman, sportsmen);
    res.status(200).json({
        message: "item(s) added to the collection"
    })
}