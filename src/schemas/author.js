import { gql } from "apollo-server";

module.exports = gql`
  type Author {
    _id: String
    firstName: String!
    lastName: String!
    country: String
    books: [Book]
  }

  type Query {
    authors: [Author]
    author(_id: String!): Author
  }

  type Mutation {
    createAuthor(firstName: String!, lastName: String!, country: String): Author
  }
`;
