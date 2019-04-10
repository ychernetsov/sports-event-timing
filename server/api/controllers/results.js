const Result = require("../../db/models/result");

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
        //   res.status(200).json({
        //     message: "Saved result successfully",
        //     createdResult: result
        //   });
        })
        .catch(err => {
          console.log(err);
          res.status(500).json({
            error: "Results failed to save ", err
          });
        });
}