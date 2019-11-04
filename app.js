import express from 'express'
import { ApolloServer } from 'apollo-server-express'
import merge from 'lodash.merge'
import db from './src/config/db'

//schemas
import bookSchema from './src/book/schema'
import authorSchema from './src/author/schema'
import publisherSchema from './src/publisher/schema'

//resolvers
import bookResolver from './src/book/resolver'
import authorResolver from './src/author/resolver'
import publisherResolver from './src/publisher/resolver'

//Merge TypeDefs and Resolvers
const typeDefs = [bookSchema, authorSchema, publisherSchema]
const resolvers = merge(bookResolver, authorResolver, publisherResolver)

//Setup Apollo server, run on port 3000
const app = express()
const server = new ApolloServer({ typeDefs, resolvers })

server.applyMiddleware({ app })

db.connect(() => {
  app.listen({ port: 3000 }, () => {
    console.log(`🚀 Server ready at http://localhost:3000${server.graphqlPath}`)
  })
})

