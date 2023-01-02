const express = require('express')
require('dotenv').config()
const port = process.env.PORT || 5000
const connectDB = require('./config/db')
const cors = require('cors');
const bodyParser = require('body-parser');
const { json } = require('body-parser')
const { ApolloServer } = require('@apollo/server');
const { expressMiddleware } = require('@apollo/server/express4');
const { ApolloServerPluginDrainHttpServer } = require('@apollo/server/plugin/drainHttpServer');
const session = require('express-session');
const http = require('http')
const { WebSocketServer } = require('ws')
const { useServer } = require('graphql-ws/lib/use/ws')
const { PubSub } = require('graphql-subscriptions')
const { resolvers } = require('./resolvers/index')
const { typeDefs } = require('./typeDefs')
const { makeExecutableSchema } = require('@graphql-tools/schema');


const app = express()
const httpServer = http.createServer(app);

// connect to mongoDB

connectDB()

// create server

let apolloServer = null


// Creating the WebSocket server
const wsServer = new WebSocketServer({
  server: httpServer,
  // Pass a different path here if app.use
  // serves expressMiddleware at a different path
  path: '/graphql',
});


const schema = makeExecutableSchema({ typeDefs, resolvers });

// pubsub used for graphql subscriptions, passed in context
const pubsub = new PubSub();


// WebSocketServer + gql
const serverCleanup = useServer({ schema, context: { pubsub } }, wsServer);


// ApolloServer + express
async function startServer() {
  apolloServer = new ApolloServer({
    schema,
    plugins: [
      ApolloServerPluginDrainHttpServer({ httpServer }),
      {
        async serverWillStart() {
          return {
            async drainServer() {
              await serverCleanup.dispose();
            },
          };
        },
      },
    ],
    playground: {
      endpoint: `http://localhost:5000/graphql`,
      settings: {
        'editor.theme': 'dark'
      }
    }
  });
  await apolloServer.start();

  // add Express middleware
  app.use(
    '/graphql',
      cors({
        credentials: true,
        origin: 'http://localhost:3000'
      }), 
    json(),
    expressMiddleware(apolloServer, {
      context: async ({ req, res }) => ({ req, res, pubsub }),
    }),
  );
}

startServer()

// sessions

app.use(
  session({
    name: "ttlid", // rndm string
    secret: process.env.SESSION_SECRET,
    resave: false,
    saveUninitialized: false,
    cookie: {
      httpOnly: true,
      secure: process.env.NODE_ENV === "production",
      maxAge: 1000 * 60 * 60 * 24 * 7 // 7 days
    }
  })
);

// rest api

app.get("/rest", function (req, res) {
    res.json({ data: "api working" });
});

httpServer.listen({ port: port }, console.log(`server running on ${port}`))
