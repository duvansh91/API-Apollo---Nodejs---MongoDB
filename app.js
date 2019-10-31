import express from 'express'
import { ApolloServer } from 'apollo-server-express'
import merge from 'lodash.merge';

//schemas
import bookSchema from './src/book/schema'
import authorSchema from './src/author/schema'
import publisherSchema from './src/publisher/schema'

//resolvers
import bookResolver from './src/book/resolver'
import authorResolver from './src/author/resolver'
import publisherResolver from './src/publisher/resolver'

//Merge TypeDefs and Resolvers
const typeDefs = [bookSchema, authorSchema, publisherSchema];
const resolvers = merge( bookResolver, authorResolver, publisherResolver);

const app = express()

app.get('/', (req, res) => {
    res.json({
        message: "home"
    })
})

//MongoDB Conection
const MongoClient = require('mongodb').MongoClient;
const uri = "mongodb+srv://test:qQABtFC@F7p7J6q@cluster0-or0da.mongodb.net/test?retryWrites=true&w=majority";
const client = new MongoClient(uri, { useNewUrlParser: true, useUnifiedTopology: true });
client.connect(err => {
  const collection = client.db("test").collection("books");
  // perform actions on the collection object
  client.close();
});

//Setup Apollo server
const server = new ApolloServer({ typeDefs, resolvers });

server.applyMiddleware({ app });

app.listen({ port: 4000 }, () =>
  console.log(`🚀 Server ready at http://localhost:4000${server.graphqlPath}`)
);

