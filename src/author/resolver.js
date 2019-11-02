import { findAuthor, findAuthors, createAuthor } from './service'
import { findBooks, findBook, findBooksByAuthor } from '../book/service'

module.exports = {
    Query: {
        authors: async () => {
            return await findAuthors()
        },
        author: async (parent, args, context, info) => {
            return await findAuthor(args._id)
        }
    },
    Author: {
        books: async (author) => {
            return await findBooksByAuthor(author._id)
        }
    },
    Mutation: {
        createAuthor: (obj, args) => {
            return createAuthor(args)
        }
    }
}