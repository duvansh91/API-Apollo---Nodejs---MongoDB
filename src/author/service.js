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

export function findAuthorByBook(authors) {
    return db.get().collection('authors').find({ _id: { $in: authors } }).toArray()
}

export async function createAuthor(args) {
    const authorCreated = await db.get().collection('authors').insertOne(args)
    return authorCreated.ops[0]
}