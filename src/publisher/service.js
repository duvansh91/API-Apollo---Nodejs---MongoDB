import db from '../config/db'
import mongodb from 'mongodb'

var ObjectId = mongodb.ObjectId

export function findPublishers() {
    return db.get().collection('publishers').find({}).toArray()
}

export async function findPublisherByName(name) {
    const publisher = await db.get().collection('publishers').findOne({ name: name })
    if (publisher) {
        return publisher
    } else {
        throw new Error('This publisher not exist')
    }
}

export function findPublisher(_id) {
    return db.get().collection('publishers').findOne({ _id: ObjectId(_id) })
}

export async function createPublisher(args) {
    const existPublisher = await findPublisherByName(args.name)
    if (existPublisher !== null) throw new Error('This publisher already exist')
    const publisherCreated = await db.get().collection('publishers').insertOne(args)
    return publisherCreated.ops[0]
}
