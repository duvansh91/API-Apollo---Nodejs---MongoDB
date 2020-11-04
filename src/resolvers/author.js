import { findAuthor, findAuthors, createAuthor } from "../services/author";
import { findBooksByAuthor } from "../services/book";

module.exports = {
  Author: {
    books: async (author) => findBooksByAuthor(author._id),
  },
  Query: {
    authors: async () => findAuthors(),
    author: async (_, args) => findAuthor(args._id),
  },
  Mutation: {
    createAuthor: (_, args) => createAuthor(args),
  },
};
