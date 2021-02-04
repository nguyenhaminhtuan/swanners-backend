import 'reflect-metadata';
import express from 'express';
import cors from 'cors';
import helmet from 'helmet';
import * as tq from 'type-graphql';
import { ApolloServer } from 'apollo-server-express';
import { PrismaClient } from '@prisma/client';
import { PORT, __PROD__ } from './common/constants';

const app = express();
const prisma = new PrismaClient();

app.use(cors());
app.use(
  helmet({
    contentSecurityPolicy: !__PROD__ && false,
  })
);

const server = new ApolloServer({
  schema: tq.buildSchemaSync({
    resolvers: [__dirname + '/modules/**/*.resolver.{ts,js}'],
  }),
  context: ({ req, res }) => {
    return { req, res, prisma };
  },
  introspection: true,
  playground: true,
});

server.applyMiddleware({ app });
app.use((req, res) => res.status(404).json({ message: 'Not found' }));

app.listen(PORT, () => console.log('Server ready to go'));
