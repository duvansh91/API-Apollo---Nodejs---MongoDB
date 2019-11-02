import { findBook, findBooks, createBook, updateBook } from './service'
import { findAuthor, findAuthorByBook } from '../author/service'
import { findPublisher } from '../publisher/service'

module.exports = {
    Query: {
        books: async () => {
            return await findBooks()
        },
        book: async (parent, args, context, info) => {
            return await findBook(args._id)
        }
    },
    Book: {
        authors: async (book) => {
            return await findAuthorByBook(book.authors)
        },
        publisher: async (book) => {
            return await findPublisher(book.publisher)
        }
    },
    Mutation: {
        createBook: (obj, args) => {
            return createBook(args)
        },
        updateBook: async (obj, args) => {
            return await updateBook(args)
        }
    },
}