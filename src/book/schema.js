import { gql } from 'apollo-server'

module.exports = gql`

scalar Date

type Book {
  _id: String!
  title: String
  ISBN: String
  synopsis: String
  publicationYear: Int!
  authors: [Author]
  publisher: Publisher
}

type Query {
  books: [Book]
  book(_id: String!): Book
}

type Mutation{
  createBook(title: String!, ISBN: String!, publicationYear: Int!, authors: [String!], synopsis: String): Book
  updateBook(_id: String!, title: String, ISBN: String, publicationYear: Int, authors: [String], synopsis: String): Book
}

`