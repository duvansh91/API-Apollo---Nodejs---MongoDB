import { findPublisher, findPublishers } from './service'
import { findBooksByPublisher } from '../book/service'

module.exports = {
    Query: {
        publishers: async () => {
            return await findPublishers()
        },
        publisher: async (parent, args, context, info) => {
            return await findPublisher(args._id)
        }
    },
    Publisher: {
        books: async (publisher) =>{
            return await findBooksByPublisher(publisher._id)
        }
    }
}