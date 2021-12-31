import config from 'config';
import MongoConnectionHandler from '../handlers/mongo-connection-handler';
import type StandardStaticDataHandler from './standard-static-data-handler';
import MongoStaticDataHandler from './mongo-static-data-handler';
import type { StaticDataItem } from '../../objects/StaticDataItem';

let staticDataHandler: StandardStaticDataHandler | undefined;

const initialiseDataHandler = (): StandardStaticDataHandler => {
  const connectionHandler = new MongoConnectionHandler<StaticDataItem>(config.get('database.uri'));
  return new MongoStaticDataHandler(connectionHandler);
};

export default (): StandardStaticDataHandler => {
  if (staticDataHandler === undefined) {
    staticDataHandler = initialiseDataHandler();
  }
  return staticDataHandler;
};
