import { gql } from 'apollo-server'


module.exports = gql`

type Publisher {
  id: Int
  name: String
  foundationYear: Date
}

extend type Query {
  publishers: [Publisher]
}

`