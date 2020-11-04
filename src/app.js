require("dotenv").config();
const path = require("path");
const express = require("express");
const { ApolloServer, makeExecutableSchema } = require("apollo-server-express");
const { mergeTypeDefs, mergeResolvers } = require("@graphql-tools/merge");
const { loadFilesSync } = require("@graphql-tools/load-files");
const db = require("./config/db");

//Merge TypeDefs and Resolvers
const typeDefs = mergeTypeDefs(
  loadFilesSync(path.resolve(__dirname, "./schemas"))
);
const resolvers = mergeResolvers(
  loadFilesSync(path.resolve(__dirname, "./resolvers"))
);

//Setup Apollo server
const app = express();
const schema = makeExecutableSchema({
  typeDefs,
  resolvers,
});
const server = new ApolloServer({
  schema,
});

server.applyMiddleware({ app });

db.connect(() => {
  app.listen({ port: 3002 }, () => {
    console.log(
      `🚀 Server ready at http://localhost:3002${server.graphqlPath}`
    );
  });
});
