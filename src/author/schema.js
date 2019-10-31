import { gql } from 'apollo-server'

module.exports = gql`

type Author {
  id: Int
  firstName: String
  lastName: String
  country: String
  books: [Book]
}

extend type Query {
  authors: [Author]
}

`