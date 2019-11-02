import db from '../config/db'
import mongodb from 'mongodb'

var ObjectId = mongodb.ObjectId;

export function findPublishers() {
    return db.get().collection('publishers').find({}).toArray()
}

export function findPublisher(_id) {
    return db.get().collection('publishers').findOne({ _id: ObjectId(_id) })
}
