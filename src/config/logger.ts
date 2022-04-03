import http from 'http';
import fs from 'fs';
import { Options } from 'morgan';
import { join } from 'path';
import { createLogger, format, transports, config, Logger } from 'winston';
import { env } from '.';

const { combine, timestamp, json } = format;
interface MorganConfig<
  Request extends http.IncomingMessage = http.IncomingMessage,
  Response extends http.ServerResponse = http.ServerResponse
> {
  format?: string;
  options?: Options<Request, Response>;
}

const serverLogger: Logger = createLogger({
  levels: config.syslog.levels,
  defaultMeta: { component: 'server-service' },
  format: combine(
    timestamp({
      format: 'YYYY-MM-DD HH:mm:ss',
    }),
    json()
  ),
  transports: [
    new transports.Console(),
    new transports.File({ filename: 'logs/server-service.log' }),
  ],
});

const morganConfig: MorganConfig = {};

if (env === 'production') {
  const logPath = join(__dirname, '..', '..', 'logs');
  if (!fs.existsSync(logPath)) {
    fs.mkdirSync(logPath);
  }
  const accessLogStream = fs.createWriteStream(
    join(__dirname, '..', '..', 'logs', 'accessLogStream.log'),
    { flags: 'a' }
  );
  // log to a file
  morganConfig.format = 'combined';
  morganConfig.options = { stream: accessLogStream };
} else {
  // log to stdout
  morganConfig.format = 'dev';
}

export { serverLogger, morganConfig };
