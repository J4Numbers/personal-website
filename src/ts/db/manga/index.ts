import type StandardMangaDataHandler from './standard-manga-data-handler';
import config from 'config';
import MongoMangaDataHandler from './mongo-manga-data-handler';
import MongoConnectionHandler from '../handlers/mongo-connection-handler';
import type { MangaDataItem } from '../../objects/MangaDataItem';

let mangaDataHandler: StandardMangaDataHandler | undefined;

const initialiseDataHandler = (): StandardMangaDataHandler => {
  const connectionHandler = new MongoConnectionHandler<MangaDataItem>(config.get('database.uri'));
  return new MongoMangaDataHandler(connectionHandler);
};

export default (): StandardMangaDataHandler => {
  if (mangaDataHandler === undefined) {
    mangaDataHandler = initialiseDataHandler();
  }
  return mangaDataHandler;
};
