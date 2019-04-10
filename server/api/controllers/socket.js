const mongoose = require('mongoose');
//const io = require('../../app');
const Result = require("../../db/models/result");
const Sportsman = require("../../db/models/sportsman");
const request = require('request');

exports.manageResults = socket => {
    Result.find({}, (err, data) => {
        console.log("emit get data")
            socket.emit('currentData', data);
          });

        socket.on('start', () => {
            console.log("Yes Sir")
            socket.emit('startRace');
            const options = {
                uri: 'http://localhost:4000/start',
                method: 'GET'
            }

            request(options, (error, response) => {
                socket.emit("finishRace")
                if (error) {
                    console.error(error);
                }
                return;
            });
        })
        
}
