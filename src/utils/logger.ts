import {
  createLogger,
  LoggerOptions,
  transports,
  config,
  format,
} from 'winston';

const defaultOptions: LoggerOptions = {
  levels: config.syslog.levels,
  exitOnError: false,
  format: format.combine(format.timestamp(), format.json()),
  transports: [new transports.Console()],
};

const app = createLogger({
  ...defaultOptions,
  defaultMeta: { component: 'app' },
  exceptionHandlers: [new transports.Console()],
});

const database = createLogger({
  ...defaultOptions,
  defaultMeta: { component: 'database' },
});

const user = createLogger({
  ...defaultOptions,
  defaultMeta: { component: 'user' },
});

export default { app, database, user };
