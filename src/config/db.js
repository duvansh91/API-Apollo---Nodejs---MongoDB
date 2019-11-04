const MongoClient = require('mongodb').MongoClient
const uri = "mongodb+srv://test:qQABtFC@F7p7J6q@cluster0-or0da.mongodb.net/test?retryWrites=true&w=majority"
let mongodb

const connect = (callback) => {
    MongoClient.connect(uri, { useNewUrlParser: true, useUnifiedTopology: true }, (error, client) => {
        if (error) {
            throw error
        }
        mongodb = client.db('test')
        callback()
    })
}

const get = () => {
    return mongodb
}

const close = () => {
    mongodb.close()
}

module.exports = {
    connect,
    get,
    close
}