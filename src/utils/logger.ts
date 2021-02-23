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
  format: format.combine(
    format.timestamp({ format: 'YYYY-MM-DD HH:mm:ss' }),
    format.json()
  ),
  transports: [new transports.Console()],
};

const app = createLogger({
  ...defaultOptions,
  exceptionHandlers: [new transports.Console()],
});

export default { app };
