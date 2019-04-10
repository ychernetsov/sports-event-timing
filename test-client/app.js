const express = require("express");
const app = express();
const testClientService = require("./test-client-service");
const Results = require("../server/db/models/result");
const connection = require("../server/db");


//Sent dummy data
app.use("/start", (req, res, next) => {
    testClientService.sentDummyData(connection, Results, res)
    res.status(200);
});

const port = process.env.PORT || 4000;

app.listen(port, () => {
    console.log(`Test Client is sending dummy data on localhost:${port}`)
})

module.exports = app;