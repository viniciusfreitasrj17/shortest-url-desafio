import { createDatabaseConn } from './config/conn';
import app from './app';
import { portServer } from './config';
import { serverLogger } from './config/logger';

createDatabaseConn()
  .then(() => {
    serverLogger.info(`Connected to DB`);

    app.listen(portServer, () => {
      serverLogger.info(`🏃 Running Server on port ${portServer} ✨`);
    });
  })
  .catch(error => serverLogger.error('TypeORM connection error: ', error));
