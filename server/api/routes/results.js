const express = require("express");
const router = express.Router();
const resultsController = require("../controllers/results");

router.get("/",  resultsController.getResults);

router.get("/status",  resultsController.getStatus);

router.post("/",  resultsController.saveResult);

router.patch("/",  resultsController.updateResult);

router.patch("/status",  resultsController.updateStatus);

module.exports = router;