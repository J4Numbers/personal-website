import config from 'config';
import MongoConnectionHandler from '../handlers/mongo-connection-handler';
import StandardArtDataHandler from './standard-art-data-handler';
import {ArtDataItem} from '../../objects/ArtDataItem';
import MongoArtDataHandler from './mongo-art-data-handler';

let artDataHandler: StandardArtDataHandler;

const initialiseDataHandler = () => {
  const connectionHandler = new MongoConnectionHandler<ArtDataItem>(config.get('database.uri'));
  return new MongoArtDataHandler(connectionHandler);
};

export default () => {
  if (artDataHandler === undefined) {
    artDataHandler = initialiseDataHandler();
  }
  return artDataHandler;
};
