import type StandardAnimeDataHandler from './standard-anime-data-handler';
import config from 'config';
import MongoAnimeDataHandler from './mongo-anime-data-handler';
import MongoConnectionHandler from '../handlers/mongo-connection-handler';
import type { AnimeDataItem } from '../../objects/AnimeDataItem';

let animeDataHandler: StandardAnimeDataHandler | undefined;

const initialiseDataHandler = (): StandardAnimeDataHandler => {
  const connectionHandler = new MongoConnectionHandler<AnimeDataItem>(config.get('database.uri'));
  return new MongoAnimeDataHandler(connectionHandler);
};

export default (): StandardAnimeDataHandler => {
  if (animeDataHandler === undefined) {
    animeDataHandler = initialiseDataHandler();
  }
  return animeDataHandler;
};
