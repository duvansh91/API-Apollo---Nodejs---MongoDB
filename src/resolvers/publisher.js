import {
  findPublisher,
  findPublishers,
  createPublisher,
} from "../services/publisher";
import { findBooksByPublisher } from "../services/book";

module.exports = {
  Publisher: {
    books: async (publisher) => findBooksByPublisher(publisher._id),
  },
  Query: {
    publishers: async () => findPublishers(),
    publisher: async (_, args) => findPublisher(args._id),
  },
  Mutation: {
    createPublisher: (_, args) => createPublisher(args),
  },
};
