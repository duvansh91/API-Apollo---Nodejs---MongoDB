import db from '../config/db'
import mongodb from 'mongodb'

var ObjectId = mongodb.ObjectId;

export function findAuthors() {
    return db.get().collection('authors').find({}).toArray()
}

export function findAuthor(author) {
    const result = db.get().collection('authors').findOne({ "_id": ObjectId(author) })
    return result
}

export function findAuthorByBook(author) {
    return db.get().collection('authors').find({ _id: { $in: author } }).toArray()
}

export async function findAuthorByName(firstName, lastName) {
    const authorId = await db.get().collection('authors').aggregate([
        { $match: { $or: [{ firstName: firstName }, { lastName: lastName }] } }
    ]).toArray()
    return authorId[0]._id
}

export async function createAuthor(args) {
    const authorCreated = await db.get().collection('authors').insertOne(args)
    return authorCreated.ops[0]
} 