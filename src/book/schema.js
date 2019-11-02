import { gql } from 'apollo-server'

module.exports = gql`

scalar Date

type Book {
  _id: String!
  title: String
  ISBN: String
  synopsis: String
  publicationYear: Date
  authors: [Author]
  publisher: Publisher
}

type Query {
  books: [Book]
  book(_id: String!): Book
}

`