const express = require("express");
const router = express.Router();
const sportsmenController = require("../controllers/sportsmen");

router.get("/", sportsmenController.get_sportsmen);

router.post("/", sportsmenController.add_sportsmen);

router.post("/results", sportsmenController.add_sportsmen);

module.exports = router;