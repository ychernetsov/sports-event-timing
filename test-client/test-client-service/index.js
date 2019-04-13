const request = require("request");
const sportsmanJson = require("../../test-client/db.json");

function postRequest(method, payload) {
    method === 'update' ? 'PATCH' : 'POST' 
    const options = {
        uri: 'http://localhost:3000/results',
        body: JSON.stringify(payload),
        method: method,
        headers: {
        'Content-Type': 'application/json'
        }
    };
    request(options, (error, response) => {
        if (error) {
        console.error(error);
        }
        return;
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
                    postRequest('POST', data);
                const msu = Math.floor(Math.random() * 4000) + 1000;
                delay(chip_id, msu, time0, "crossed")
                .then( data =>  {
                    postRequest('PATCH', data);
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
    const min = time % 60000 === time ? "00" : formatTs(String(parseInt(time/60000)));
    const sec = formatTs(String(parseInt(time/1000 % 60)));
    const ms = formatMs(String(time/1000 % 60).match(/\.(\d{1,3})/)[1]);
    return `${min}:${sec}:${ms}`
}

//simulating finishing and crossed
function delay(chip_id, ms, time0, status) {
    return new Promise((resolve, reject) => {
        timeout = setTimeout(()=> {
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

module.exports = {
    async sentDummyData(res) {
        await populateData(res)
    }
}