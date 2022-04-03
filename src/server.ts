import app from './app';
import { portServer } from './config';
import { serverLogger } from './config/logger';

app.listen(portServer, () => {
  serverLogger.info(`🏃 Running Server on port ${portServer} ✨`);
});
