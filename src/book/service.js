import db from '../config/db'
import mongodb from 'mongodb'

var ObjectId = mongodb.ObjectId;

export function findBooks() {
    return db.get().collection('books').find({}).toArray()
}

export function findBook(book) {
    return db.get().collection('books').findOne({ _id: ObjectId(book) })
}

export async function findBooksByAuthor(author) {
    return db.get().collection('books').find({ authors: ObjectId(author) }).toArray()
}

export async function findBooksByPublisher(publisher) {
    return db.get().collection('books').find({ publisher: ObjectId(publisher) }).toArray()
}