require('dotenv').config()
const mongoose = require('mongoose');
const { db } = require('../log/index');

mongoose.Promise = global.Promise;

const options = { useNewUrlParser: true };

const { DB_HOST, DB_PORT, DB_NAME, DB_USER, DB_PASS } = process.env;

const mongoUri = `mongodb://${DB_USER}:${DB_PASS}@${DB_HOST}:${DB_PORT}/${DB_NAME}`;
mongoose.connect(mongoUri, options)

mongoose.connection
  .on('error', () => db.error)
  .on('close', () => db.log('connection closed'))

module.exports = mongoose.connection