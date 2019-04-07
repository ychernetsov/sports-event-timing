const express = require("express");
const router = express.Router();
const resultsController = require("../controllers/results")
router.get("/",  resultsController.get_results);

module.exports = router;