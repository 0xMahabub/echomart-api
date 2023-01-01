import express, { Express } from 'express';
import cors from 'cors';
import morgan from 'morgan';
import helmet from 'helmet';
import { log, cookieParser } from './helpers';
import { mode, port, db, redisClient } from './configs';
import { router } from './router';

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
server.use(cookieParser); // setting up the cookie parser

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

  await redisClient.connect(); // connect redis
};

/// Spin the server @Bootstrap
const bootstrap = async () => {
  try {
    initDatabase();
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
