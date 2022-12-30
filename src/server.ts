import express, { Express } from 'express';
import cors from 'cors';
import morgan from 'morgan';
import helmet from 'helmet';
import session from 'express-session';
import { log } from './helpers';
import { mode, port } from './configs';
import { router } from './router';
import {
  db,
  RedisStore,
  redisClient,
  sessionSecret,
  sessionExpires,
} from './configs';

const server: Express = express(); // Express app instance

// common server settings
server.use(express.json()); // BodyParser
server.use(express.urlencoded({ extended: true }));
if (mode !== 'production') {
  server.use(helmet()); // security purpose
  server.use(cors()); // CORS enabled for all
} else {
  // or you can make a allow-list and CorsOptions with it
  // I'm exposing /api* access to everybody @Initially as a boilerplate only
  server.options('/api/*', cors()); // ONLY /api/* is enabled from anywhere
}
server.use(morgan(mode === 'development' ? 'dev' : 'combined'));
server.use(router); // Application router handler
const destroyDbConnection = async () => {
  return await db.destroy();
};
const initDatabase = async () => {
  /// setup your database in here .....
  await db
    .initialize()
    .then(() => {
      if (process.env.NODE_ENV !== 'test') {
        log.info(`TypeORM: Database connection is established! `);
      }
    })
    .catch((err) => {
      log.error(err);
    });
};

// setup redis-sessions
const initSessionManager = async () => {
  server.use(
    session({
      store: new RedisStore({ client: redisClient }),
      secret: sessionSecret,
      resave: false,
      saveUnInitialized: false,
      cookie: {
        secure: false,
        httpOnly: false,
        maxAge: sessionExpires,
      },
    }),
  );
};

/// Spin the server @Bootstrap
const bootstrap = async () => {
  try {
    initDatabase();
    initSessionManager();
    // exposing application and listening through a port
    server.listen(port, () =>
      log.info(`⚡️[server]: Server is running at http://localhost:${port}`),
    );
    process.on('SIGTERM', async () => {
      log.debug('SIGTERM signal received: closing HTTP server');
      await destroyDbConnection();
      server.listen().close();
    });
  } catch (err) {
    log.error(err);
  }
};

if (process.env.NODE_ENV !== 'test') {
  bootstrap(); // starting application
}

export { server };
