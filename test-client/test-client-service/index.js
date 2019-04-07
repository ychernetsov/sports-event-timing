const Result = require("../../server/db/models/result");
const sportsmanJson = require("../../test-client/db.json");

//update final time result in Results Collection
function updateDocument(data, res) {
  Result.updateOne({ _id: data.chip_id }, { "crossed": data.crossed })
    .exec()
    .then(data => {
    //   res.status(200).json({
    //       message: 'Result updated'
    //   });
    })
    .catch(err => {
      console.log(err);
      res.status(500).json({
        error: "Failed to update result", err
      });
    });
}

//Save result Results Collection with time of entering finishing corridor
function saveDocument(data, res) {
    const result = new Result({
        _id: data.chip_id,
        finishing: data.finishing,
        crossed: data.crossed,
        sportsman: data.chip_id
      });
      result
        .save()
        .then(data => {
        //   res.status(200).json({
        //     message: "Saved result successfully",
        //     createdResult: result
        //   });
        })
        .catch(err => {
          console.log(err);
          res.status(500).json({
            error: "Results failed to save ", err
          });
        });
}

//create dummy intervals for sportsmen and save them in DB
function populateData(response) {
    const res = response;
    //TODO: Fetch IDs from MongoDB
    const sporstmenIds = sportsmanJson.map(s => s._id);

    let time0 = new Date().getTime();
    
    sporstmenIds.reduce((promise, chip_id) => {
        return promise.then(acc => {    
            const ms = Math.floor(Math.random() * 60000) + 10000;
            delay(chip_id, ms, time0, "finishing")
            .then( data => {
                saveDocument(data, res);
                const msu = Math.floor(Math.random() * 4000) + 1000;
                delay(chip_id, msu, time0, "crossed")
                .then( data =>  {
                    updateDocument(data, res);
                });
            });  
        });
    }, Promise.resolve([]));
}

function formatTs(ts) {
    return ts.length === 1 ? "0" + ts : ts;
}

function formatMs(ms) {
    return ms.length === 1 ? ms + "00" : ms.length === 2 ? ms + "0" : ms;
}

function format(time) {
    console.log("T ", time)
    const min = time % 60000 === time ? "00" : formatTs(String(parseInt(time/60000)));
    const sec = formatTs(String(parseInt(time/1000 % 60)));
    const ms = formatMs(String(time/1000 % 60).match(/\.(\d{1,3})/)[1]);
    return `${min}:${sec}:${ms}`
}

function delay(chip_id, ms, time0, status) {
    
    return new Promise((resolve, reject) => {
        setTimeout(()=> {
        	const time1 = new Date().getTime();
    		const diff = time1 - time0;
            const result = {
                chip_id: chip_id,
                finishing: format(diff),
                crossed: status === "crossed" ? format(diff) : "n/a",
                sportsman: chip_id
            }
            resolve(result);
        }, ms)
    });
}

//every new start of the race drops old results ...
async function dropCollection(connection) {
    await connection.db.listCollections()
        .next((err, collection) => {
            if (collection) {
                connection.db.dropCollection('results', (err, result) =>
                    console.log('Old result collection has been droped')
                );
            }
        });
}

//... and creates new collection for new results
async function createCollection(collection) {
    await collection.createCollection().then(function(col) {
        console.log('Collection is created!');
      });
}

module.exports = {
    async sentDummyData(connection, collection, res) {
        await dropCollection(connection)
        await createCollection(collection)
        await populateData(res)
    } 
}