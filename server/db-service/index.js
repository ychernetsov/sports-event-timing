//const Sportsmen = require('../db/models/sportsman');
const {db} = require('../log');

module.exports = {
  async addDocs (collection, data) {
    try {
      return await collection.collection.insert(data)
    } catch (ex) {
      db.error(ex.message);

      throw new Error('Failed to insert docs to collection');
    }
  }
}