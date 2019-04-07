const {db} = require('../log');

module.exports = {
  async addDocs (collection, data) {
    try {
      return await collection.collection.insertMany(data)
    } catch (ex) {
      db.error(ex.message);

      throw new Error('Failed to insert docs to collection');
    }
  }
}