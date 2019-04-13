const Result = require("../../db/models/result");
const RaceStatus = require("../../db/models/racestatus");
const mongoose = require('mongoose');

exports.getResults = (req, res, next) => {
    Result.find()
    .select("-__v -_id")
    .populate('sportsman')
    .exec()
    .then(results => {
        res.status(200).json({
        count: results.length,
        results: results
        });
    })
    .catch(err => {
        console.log(err);
        res.status(500).json({
        error: "Results failed to load", err
        });
    });
}

exports.updateResult = (req, res, next) => {
    Result.updateOne({ _id: req.body.chip_id }, { "crossed": req.body.crossed })
      .exec()
      .then(data => {
        Result.findById(req.body.chip_id)
          .select("-__v -_id")
          .populate('sportsman')
          .exec()
          .then(result => {
            req.io.emit('updateResult', result);
          })
      })
      .catch(err => {
        console.log(err);
        res.status(500).json({
          error: "Failed to update result", err
        });
      });
  }

  exports.saveResult = (req, res, next) => {
    const result = new Result({
        _id: req.body.chip_id,
        finishing: req.body.finishing,
        crossed: req.body.crossed,
        sportsman: req.body.chip_id
      });
      result
        .save()
        .then(data => {
          Result.findById(data._id)
          .select("-__v -_id")
          .populate('sportsman')
          .exec()
          .then(result => {
            req.io.emit('saveResult', result);
          })
        })
        .catch(err => {
          console.log(err);
          res.status(500).json({
            error: "Results failed to save ", err
          });
        });
      }
    exports.updateStatus = (req, res, next) => {
      const id = "5cb1ac27b25dca040765c66f";
      const payload = {};
      for(let prop in req.body) {
        payload[prop] = req.body[prop]
      }
      RaceStatus.updateOne({ _id: id }, payload)
      .exec()
      .then(data => {
        console.log("Status updated")
      })
      .catch(err => {
        console.log(err);
        res.status(500).json({
          error: "Failed to update status", err
        });
      });
    }

    exports.postStatus = (req, res, next) => {
      const result = new RaceStatus({
        _id: new mongoose.Types.ObjectId(),
        started: req.body.started,
        finished: req.body.finished,
        start_time: req.body.start_time
      });
      result
        .save()
        .then(data => {
          console.log("Saved ", data)
        })
        .catch(err => {
          console.log(err);
          res.status(500).json({
            error: "Results failed to save ", err
          });
        });
    }

    exports.getStatus = (req, res, next) => {
      RaceStatus.find()
      //.select("-__v -_id")
      .exec()
      .then(status => {
          res.status(200).json({
            status: status
          });
      })
      .catch(err => {
          console.log(err);
          res.status(500).json({
          error: "Status failed to load", err
          });
      });
    }
