import db from '../config/db'
import mongodb from 'mongodb'

var ObjectId = mongodb.ObjectId

export function findAuthors() {
    return db.get().collection('authors').find({}).toArray()
}

export function findAuthor(author) {
    const result = db.get().collection('authors').findOne({ "_id": ObjectId(author) })
    return result
}

export async function findAuthorsByid(author) {
    var authors = author
    authors.map((id, index) => {
        if(id.length !== 24) throw new Error('The id must be 24 characters')
        authors[index] = ObjectId(id)
    })
   return await findAuthorByBook(authors)
}

export function findAuthorByBook(author) {
    return db.get().collection('authors').find({ _id: { $in: author } }).toArray()
}

export async function findAuthorByName(firstName, lastName) {
    const authorId = await db.get().collection('authors').aggregate([
        { $match: { $or: [{ firstName: firstName }, { lastName: lastName }] } }
    ]).toArray()
    if (authorId.length > 0) return authorId[0]._id
}

export async function createAuthor(args) {
    const authorCreated = await db.get().collection('authors').insertOne(args)
    return authorCreated.ops[0]
} 