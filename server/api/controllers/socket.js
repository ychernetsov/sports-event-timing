const mongoose = require('mongoose');
const dbService = require("../../db-service");
const Result = require("../../db/models/result");
const Sportsman = require("../../db/models/sportsman");
const request = require('request');
const connection = require("../../db");

exports.manageResults = socket => {
    Result.find({}, (err, data) => {
            socket.emit('currentData', data);
          });

        socket.on('start', () => {
            const options = {
                uri: 'http://localhost:4000/start',
                method: 'GET'
            }

            request(options, (error, response) => {
                if (error) {
                    console.error(error);
                }
                return;
            });
            socket.emit('started');
            dbService.dropCollection(connection) 
            dbService.createCollection(Result) 
            
        })

        socket.on("disconnect", () => {
            console.log("DISCONNECTED")
        });
}
