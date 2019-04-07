const Result = require("../../db/models/result");

exports.get_results = (req, res, next) => {
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