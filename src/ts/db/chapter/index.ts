import config from 'config';
import MongoConnectionHandler from '../handlers/mongo-connection-handler';
import StandardChapterDataHandler from './standard-chapter-data-handler';
import MongoChapterDataHandler from './mongo-chapter-data-handler';
import {ChapterDataItem} from '../../objects/ChapterDataItem';

let chapterDataHandler: StandardChapterDataHandler;

const initialiseDataHandler = () => {
  const connectionHandler = new MongoConnectionHandler<ChapterDataItem>(config.get('database.uri'));
  return new MongoChapterDataHandler(connectionHandler);
};

export default () => {
  if (chapterDataHandler === undefined) {
    chapterDataHandler = initialiseDataHandler();
  }
  return chapterDataHandler;
};
