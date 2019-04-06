const express = require("express");
const app = express();
const morgan = require("morgan");
const bodyParser = require("body-parser");
const connection = require('./db');
//const mongoose = require("mongoose");
const log = require('./log');

//Routes
const homePageRoute = require("./api/routes/hp");
const sportsmenRoutes = require("./api/routes/sportsmen");
const resultsRoutes = require("./api/routes/results");

//connect to DB
connection
  .once('open', () => {
    console.log(`Mongo connection is opened, starting server..`)
    connection.db.listCollections()
    .next((err, collinfo) => {
        if (collinfo) {
            connection.db.dropCollection('results', (err, result) =>
                console.log('Old result collection has been droped')
            );
        }
    });

  })
  

//Logging server actions
app.use(morgan("dev"));
app.use(bodyParser.urlencoded({extended: false}));
app.use(bodyParser.json());

//Handle CORS
app.use((req, res, next) => {
    res.header("Access-Control-Allow-Origin", "*");
    res.header("Access-Control-Allow-Headers", "*");

    if(req.method === "OPTIONS") {
        res.header("Access-Control-Allow-Headers", "GET, POST, PUT, PATCH, DELETE");
        return res.status(200).json({});
    }

    next();
});

//Routes which should handle requests
app.use("/", homePageRoute);
app.use("/sportsmen", sportsmenRoutes);
app.use("/results", resultsRoutes);

module.exports = app;