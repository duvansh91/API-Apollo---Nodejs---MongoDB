import db from '../config/db'
import mongodb from 'mongodb'

var ObjectId = mongodb.ObjectId;

export function findBooks() {
    return db.get().collection('books').find({}).toArray()
}

export function findBook(book) {
    return db.get().collection('books').findOne({ _id: ObjectId(book) })
}

export function findBooksByAuthor(author) {
    return db.get().collection('books').find({ authors: ObjectId(author) }).toArray()
}

export async function findBookByISBN(ISBN) {
    return await db.get().collection('books').findOne({ ISBN: ISBN })
}

export function findBooksByPublisher(publisher) {
    return db.get().collection('books').find({ publisher: ObjectId(publisher) }).toArray()
}

export async function createBook(args) {
    const existISBN = await findBookByISBN(args.ISBN)
    if (existISBN !== null) throw new Error('Another Book has this ISBN')
    //convert id string to ObjectId
    args.authors.map((id, index) => {
        args.authors[index] = ObjectId(id)
    })

    const bookCreated = await db.get().collection('books').insertOne(args)
    return bookCreated.ops[0]
}

export async function updateBook(book) {
    const _id = book._id
    const existBook = await findBook(_id)
    if (existBook === null) throw new Error('The book was not found')
    delete book._id
    const updated = await db.get().collection('books').findOneAndUpdate(
        { _id: ObjectId(_id) },
        { $set: book, $currentDate: { lastModified: true } }
    )
    console.log(updated.value)
    return updated.value
}