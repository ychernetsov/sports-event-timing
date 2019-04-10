const express = require("express");
const app = express();
const testClientService = require("./test-client-service");
const Results = require("../server/db/models/result");
const connection = require("../server/db");
const socketIO = require("socket.io");

const io = socketIO(server);
app.set('io', io);

//Sent dummy data
app.use("/start", (req, res, next) => {
    const io = req.app.get('io');
    testClientService.sentDummyData(connection, Results, res)
        .then(()=> {
                io.emit("newResultAdded");
            }
        );
    res.status(200);
});

const port = process.env.PORT || 4000;

app.listen(port, () => {
    console.log(`Test Client is sending dummy data on localhost:${port}`)
})

module.exports = app;