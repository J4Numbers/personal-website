import type { Stream } from 'bunyan';
import type Logger from 'bunyan';
import { createLogger } from 'bunyan';
import config from 'config';

let logger: Logger | undefined;

const generateLogger = (): Logger => {
  const loggingStreams: Array<Stream> = [
    {
      level: config.get('logger.level'),
      stream: process.stdout,
    },
  ];
  return createLogger({
    name: config.get('app.name'),
    streams: loggingStreams,
  });
};

export default (): Logger => {
  if (logger === undefined) {
    logger = generateLogger();
  }
  return logger;
};
