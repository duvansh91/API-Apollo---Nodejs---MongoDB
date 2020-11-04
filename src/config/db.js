const MongoClient = require("mongodb").MongoClient;
const { DB } = require("../utils/constants");

const uri = DB;
let mongodb;

const connect = (callback) => {
  MongoClient.connect(
    uri,
    { useNewUrlParser: true, useUnifiedTopology: true },
    (error, client) => {
      if (error) {
        throw error;
      }
      mongodb = client.db("test");
      callback();
    }
  );
};

const get = () => {
  return mongodb;
};

const close = () => {
  mongodb.close();
};

module.exports = {
  connect,
  get,
  close,
};
