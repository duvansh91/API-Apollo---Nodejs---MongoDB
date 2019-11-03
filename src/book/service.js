import db from '../config/db'
import mongodb from 'mongodb'
import { findAuthorByName } from '../author/service'
import { findPublisherByName } from '../publisher/service'

var ObjectId = mongodb.ObjectId

//Filter by title, author's firstName or lastName, editorial's name, publication year  
export async function findBooks(args) {
    if (args.authorFirstName || args.authorLastName) {
        var author = await findAuthorByName(args.authorFirstName, args.authorLastName)
    } else {
        var author = ""
    }

    if (args.publisher) {
        var publisher = await findPublisherByName(args.publisher)
    } else {
        var publisher = ""
    }
    const { title, authorFirstName, authorLastName, publicationYear, publisherId, skip, limit } = args
    if (title || authorFirstName || authorLastName || publicationYear || publisherId) {
        return db.get().collection('books').aggregate([
            {
                $match: {
                    $or: [
                        { title: args.title },
                        { authors: author },
                        { publisher: publisher._id },
                        { publicationYear: args.publicationYear }
                    ]
                }
            },
            { $sort : { publicationYear : -1 } }
        ]).toArray()
    } 
}

function sortByPublicationYear(direction) {
    return db.get().collection('books').aggregate([
        {
            $skip: skip
        },
        {
            $limit: limit
        },
        { $sort : { publicationYear : -1 } }
    ]).toArray()
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
    const existBook = await findBookByISBN(args.ISBN)
    if (existBook !== null) throw new Error('Another Book has this ISBN')
    //convert id string to ObjectId
    args.authors.map((id, index) => {
        args.authors[index] = ObjectId(id)
    })
    args.publisher = ObjectId(args.publisher)

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
    return await findBook(_id)
}