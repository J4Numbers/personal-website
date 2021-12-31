import config from 'config';
import MongoConnectionHandler from '../handlers/mongo-connection-handler';
import type StandardArtDataHandler from './standard-art-data-handler';
import type { ArtDataItem } from '../../objects/ArtDataItem';
import MongoArtDataHandler from './mongo-art-data-handler';

let artDataHandler: StandardArtDataHandler | undefined;

const initialiseDataHandler = (): StandardArtDataHandler => {
  const connectionHandler = new MongoConnectionHandler<ArtDataItem>(config.get('database.uri'));
  return new MongoArtDataHandler(connectionHandler);
};

export default (): StandardArtDataHandler => {
  if (artDataHandler === undefined) {
    artDataHandler = initialiseDataHandler();
  }
  return artDataHandler;
};
