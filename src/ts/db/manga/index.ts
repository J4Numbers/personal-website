import StandardMangaDataHandler from './standard-manga-data-handler';
import config from 'config';
import MongoMangaDataHandler from './mongo-manga-data-handler';
import MongoConnectionHandler from '../handlers/mongo-connection-handler';
import {MangaDataItem} from '../../objects/MangaDataItem';

let mangaDataHandler: StandardMangaDataHandler;

const initialiseDataHandler = () => {
  const connectionHandler = new MongoConnectionHandler<MangaDataItem>(config.get('database.uri'));
  return new MongoMangaDataHandler(connectionHandler);
};

export default () => {
  if (mangaDataHandler === undefined) {
    mangaDataHandler = initialiseDataHandler();
  }
  return mangaDataHandler;
};
