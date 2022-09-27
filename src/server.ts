// import { User } from './entity/User';
import { AppDataSource } from './data-source';
import express from 'express';
import 'reflect-metadata';
import { ApolloServer } from 'apollo-server-express';
import {
  ApolloServerPluginLandingPageGraphQLPlayground,
  ApolloServerPluginLandingPageDisabled,
} from 'apollo-server-core';
import { buildSchema } from 'type-graphql';
import { ScoreResolver } from './resolvers';
import cors from 'cors';

(async () => {
  const app = express();
  app.use(cors());
  const port = process.env.PORT || 5000;

  app.get('/', (_req, res) => res.send('Hello'));

  await AppDataSource.initialize()
    .then(() => {
      console.log('Data Source has been initialized!');
    })
    .catch((err) => {
      console.error('Error during Data Source initialization', err);
    });

  const apolloServer = new ApolloServer({
    schema: await buildSchema({
      resolvers: [ScoreResolver],
    }),
    plugins: [
      ApolloServerPluginLandingPageGraphQLPlayground({}),
      ApolloServerPluginLandingPageDisabled(),
    ],
    context,
    introspection: true,
  });

  await apolloServer.start();
  apolloServer.applyMiddleware({ app });

  app.listen(port, () => {
    console.log(
      `Server running on port ${port}. Graphql: ${apolloServer.graphqlPath}`
    );
  });
})();
