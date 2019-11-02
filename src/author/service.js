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