const express = require("express");
const app = express();
const testClientService = require("./test-client-service");

//Sent dummy data
app.use("/start", (req, res, next) => {
    testClientService.sentDummyData(res)
    res.status(200);
});

const port = process.env.PORT || 4000;

app.listen(port, () => {
    console.log(`Test-Client is generating dummy data on localhost:${port}`)
})

module.exports = app;