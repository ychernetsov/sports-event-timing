const {db} = require('../log');

module.exports = {
  async addDocs (collection, data) {
    try {
      return await collection.collection.insertMany(data)
    } catch (ex) {
      db.error(ex.message);

      throw new Error('Failed to insert docs to collection');
    }
  },
  //every new start of the race or disconnection of user drops old results ...
  async dropCollection(connection) {
    await connection.db.listCollections()
        .next((err, collection) => {
            if (collection) {
                connection.db.dropCollection('results', (err, result) =>
                    console.log('Old results are removed')
                );
            }
        });
  },

  //... and creates new collection for new results
  async createCollection(collection) {
    await collection.createCollection().then(function(col) {
        console.log('New Collection is created');
      });
  }
}