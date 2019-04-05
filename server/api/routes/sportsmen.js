const express = require("express");
const router = express.Router();
const mongoose = require("mongoose");
const Sportsmen = require("../../db/models/sportsman");

router.get("/", (req, res, next) => {
    console.log("GETS")
    Sportsmen.find().exec()
        .then(docs => {
            console.log(docs)
            res.status(200).json(docs)
        })
        .catch(err => {
            console.log(err);
            res.status(500).json({
                message: "Not found"
            })
        })
});

router.post("/", (req, res, next) => {
    const sportsmen = new Sportsmen({
        _id: mongoose.Types.ObjectId(),
        chip_id: req.body.chip_id,
        start_number: req.body.start_number,
        name: req.body.name,
        lastname: req.body.lastname,
        status: {
            finishing: req.body.status.finishing,
            finished: req.body.status.finished,
            finished_time: req.body.status.finished_time
        }
    });

    sportsmen.save().then(
        result => console.log(result)
    )
    .catch(err => console.log(err));
    res.status(201).json({
        message: "Handle post request to /sportsmen",
        createdSportsmen: sportsmen
    });
    
});

module.exports = router;