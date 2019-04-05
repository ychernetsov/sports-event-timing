const express = require("express");
const router = express.Router();
const Sportsmen = require("../../db/models/sportsman");
const conn = require("../../db")

router.get("/", (req, res, next) => {
    conn.db.listCollections().toArray(function(err, collinfo) {
        if(collinfo) {
            console.log(collinfo);
        } else {
            console.log("No such collection found")
        }
    });
});



module.exports = router;