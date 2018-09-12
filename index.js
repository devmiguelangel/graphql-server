import express from 'express';
import { ApolloServer } from 'apollo-server-express';
import './app/db/config';
import { typeDefs } from './app/api/schemas';
import resolvers from './app/api/resolvers';

const app = express();

const PORT = 3000;

const server = new ApolloServer({
  typeDefs,
  resolvers,
  // mocks,
  // mockEntireSchema: false,
});

server.applyMiddleware({ app });

app.get('/', (req, res) => res.send('Hello World !!!'))

app.listen(PORT, () => {
  console.log(`Server Run!!! ${server.graphqlPath}`);
});