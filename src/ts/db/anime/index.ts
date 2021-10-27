import StandardAnimeDataHandler from './standard-anime-data-handler';
import config from 'config';
import MongoAnimeDataHandler from './mongo-anime-data-handler';
import MongoConnectionHandler from '../handlers/mongo-connection-handler';
import {AnimeDataItem} from '../../objects/AnimeDataItem';

let animeDataHandler: StandardAnimeDataHandler;

const initialiseDataHandler = () => {
  const connectionHandler = new MongoConnectionHandler<AnimeDataItem>(config.get('database.uri'));
  return new MongoAnimeDataHandler(connectionHandler);
};

export default () => {
  if (animeDataHandler === undefined) {
    animeDataHandler = initialiseDataHandler();
  }
  return animeDataHandler;
};
