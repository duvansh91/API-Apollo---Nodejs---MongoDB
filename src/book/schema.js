import { gql } from 'apollo-server'

module.exports = gql`

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
  books(
    limit: Int, 
    skip:Int, 
    title: String, 
    authorFirstName: String,
    authorLastName: String,
    publisherId: String
    publicationYear: Int
    order: Int
  ): [Book]
  book(_id: String!): Book
}

type Mutation{
  createBook(title: String!, ISBN: String!, publicationYear: Int!, publisher: String!, authors: [String!], synopsis: String): Book
  updateBook(_id: String!, title: String, ISBN: String, publicationYear: Int, publisher: String, authors: [String], synopsis: String): Book
}

`