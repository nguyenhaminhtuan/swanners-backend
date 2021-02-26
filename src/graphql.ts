import { ApolloServer, AuthenticationError } from 'apollo-server-lambda';
import { APIGatewayProxyEvent, Context as LambdaContext } from 'aws-lambda';
import depthLimit from 'graphql-depth-limit';
import env from './config/env';
import schema from './schema';
import db from './db';
import logger from './utils/logger';
import loader from './loaders';
import { getToken, verifyToken } from './utils/auth';

interface HandlerParams {
  event: APIGatewayProxyEvent;
  context: LambdaContext;
}

export interface Context extends HandlerParams {
  db: typeof db;
  logger: typeof logger;
  loader: typeof loader;
  user: {
    sub: string;
  };
}

const context = async ({ event, context }: HandlerParams) => {
  let user: any = null;
  const tokenString = event.headers.Authorization;

  if (tokenString) {
    try {
      const token = getToken(tokenString);
      const payload = await verifyToken(token);

      user = payload;
    } catch (error) {
      throw new AuthenticationError(error.message);
    }
  }

  return { event, context, db, logger, loader, user };
};

const server = new ApolloServer({
  schema,
  context,
  debug: !env.isProd,
  introspection: !env.isProd,
  playground: !env.isProd && {
    endpoint: '/dev/graphql',
  },
  engine: {
    reportSchema: !env.isProd,
  },
  uploads: {
    maxFileSize: 10 * 1000 * 1000,
    maxFiles: 10,
  },
  validationRules: [depthLimit(4)],
});

export const handler = server.createHandler({
  cors: {
    origin: true,
    credentials: true,
  },
});
