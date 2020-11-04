import { gql } from "apollo-server";

module.exports = gql`
  type Publisher {
    _id: String
    name: String!
    foundationYear: Int
    books: [Book]
  }

  type Query {
    publishers: [Publisher]
    publisher(_id: String!): Publisher
  }

  type Mutation {
    createPublisher(name: String!, foundationYear: Int): Publisher
  }
`;
