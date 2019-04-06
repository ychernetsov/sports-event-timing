const express = require("express");
const router = express.Router();
const mongoose = require("mongoose");
const Sportsmen = require("../../db/models/sportsman");
const dbService = require("../../db-service");

router.get("/", (req, res, next) => {
    Sportsmen.find()
        .select('-__v -_id')
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
});

router.post("/", (req, res, next) => {
    const sportsmen = req.body.map(person => {
        return new Sportsmen({
            chip_id: mongoose.Types.ObjectId(),
            start_number: person.start_number,
            name: person.name,
            lastname: person.lastname
        });
    });  
    
    dbService.addDocs(Sportsmen, sportsmen);
});

module.exports = router;