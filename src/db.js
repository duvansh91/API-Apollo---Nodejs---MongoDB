const MongoClient = require('mongodb').MongoClient;
var mongodb;

const uri = "mongodb+srv://test:qQABtFC@F7p7J6q@cluster0-or0da.mongodb.net/test?retryWrites=true&w=majority";

function connect(callback) {

    MongoClient.connect(uri, { useNewUrlParser: true, useUnifiedTopology: true }, (error, client) => {
        if (error) {
          throw error;
        }
        mongodb = client.db('test')
        callback();
      });
}

function get() {
    return mongodb
}

function close() {
    mongodb.close()
}

module.exports = {
    connect,
    get,
    close
};