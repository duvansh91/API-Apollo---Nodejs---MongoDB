import { gql } from 'apollo-server'

module.exports = gql`

scalar Date

type Book {
  id: Int
  title: String
  ISBN: String
  synopsis: String
  publicationYear: Date
  authors: [Author]
}

type Query {
  books: [Book]
}

`