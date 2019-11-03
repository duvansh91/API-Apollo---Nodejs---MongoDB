import { gql } from 'apollo-server'

module.exports = gql`

type Author {
  _id: String!
  firstName: String!
  lastName: String!
  country: String
  books: [Book]
}

extend type Query {
  authors: [Author]
  author(_id: String!): Author
}

extend type Mutation {
  createAuthor(firstName: String!, lastName: String!, country: String): Author
}

`