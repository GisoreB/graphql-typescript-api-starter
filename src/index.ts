import { createServer } from "http";
import express from "express";
import { ApolloServer, gql } from "apollo-server-express";
import  {typeDefs} from "./schema/schema";
import {resolvers} from "./resolver/resolver";
import { db } from './db/db'

// An asynchronous function to start the server created.
const startServer = async () => {

    // creates an instance of express.
    const app = express()

    // creates an HTTP server.
    const httpServer = createServer(app)


    // initializes an instance of ApolloServer, passing the typeDefs and resolvers.
    // This creates our GraphQL server.
    const apolloServer = new ApolloServer({
        typeDefs,
        resolvers,
        context: {
            db,
        }
    })

    await apolloServer.start()

    // applies The ApolloServer instance as middleware to the Express instance, enabling the GraphQL server.
    apolloServer.applyMiddleware({
        app,
        path: '/api'
    })

    httpServer.listen({ port: process.env.PORT || 9000 }, () =>
        console.log(`Server listening on localhost:9000${apolloServer.graphqlPath}`)
    )
}

startServer()