import { gql } from 'apollo-server'


module.exports = gql`

type Publisher {
  _id: String!
  name: String
  foundationYear: Date
  books: [Book]
}

extend type Query {
  publishers: [Publisher]
  publisher(_id: String!): Publisher
}

`