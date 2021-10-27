import Logger, {createLogger, Stream} from 'bunyan';
import config from 'config';

let logger: Logger

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
