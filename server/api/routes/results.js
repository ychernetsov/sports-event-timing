const express = require("express");
const router = express.Router();
const resultsController = require("../controllers/results")

router.get("/",  resultsController.getResults);

router.post("/",  resultsController.saveResult);

router.patch("/",  resultsController.updateResult);

module.exports = router;