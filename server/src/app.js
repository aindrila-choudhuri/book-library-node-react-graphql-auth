require('dotenv/config');
const express = require('express');
const { ApolloServer } = require('apollo-server-express');
const authentication = require('./middleware/auth');
const bodyParser = require('body-parser');
const typeDefs = require('./graphql/typedefs');
const resolvers = require('./graphql/resolvers');

const server = new ApolloServer({
  typeDefs,
  resolvers,
});

const app = express();
app.use(bodyParser.json());

// auth middleware setup

app.post('/graphql', (req, res, next) => {
  const authRoutes = ['users', 'books', 'addBook', 'book'];
  if (req.body.operationName !== 'IntrospectionQuery') {
    if (authRoutes.some((str) => req.body.query.includes(str))) {
      console.log('-----matched----');
      authentication(req, res, next);
    } else {
      next();
    }
  } else {
    next();
  }

  // if (
  //   req.body.operationName !== 'IntrospectionQuery' &&
  //   (req.body.query.match('users') ||
  //     req.body.query.match('book') ||
  //     req.body.query.match('books') ||
  //     req.body.query.match('addBook'))
  // ) {
  //   authentication(req, res, next);
  // } else {
  //   next();
  // }
});

async function startApolloServer() {
  await server.start();
  server.applyMiddleware({ app });
  app.listen({ port: 4001 }, () => console.log(`Server ready at http://localhost:4001${server.graphqlPath}`));
}

startApolloServer();
