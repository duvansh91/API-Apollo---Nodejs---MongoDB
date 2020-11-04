import { findBook, findBooks, createBook, updateBook } from "../services/book";
import { findAuthorByBook } from "../services/author";
import { findPublisher } from "../services/publisher";

module.exports = {
  Book: {
    authors: async (book) => findAuthorByBook(book.authors),
    publisher: async (book) => findPublisher(book.publisher),
  },
  Query: {
    books: async (_, args) => findBooks(args),
    book: async (_, args) => findBook(args._id),
  },
  Mutation: {
    createBook: async (_, args) => createBook(args),
    updateBook: async (_, args) => updateBook(args),
    deleteBook: async (_, args) => deleteBook(args),
  },
};
