require('dotenv').config();

const Mongo = require('mongodb').MongoClient;

let database;

const db = [];

db.initDB = (callback) => {
     if (database) {
          console.log('DB is already initialized!');
          return callback(null, database);
     }
     Mongo.connect(process.env.MONGODB_URL)
          .then((client) => {
               database = client;
               callback(null, database);
          })
          .catch((err) => {
               callback(err);
          });
};

db.getDatabase = () => {
     if (!database) {
          throw Error('Database is not initialized');
     }
     return database;
};

module.exports = db;
