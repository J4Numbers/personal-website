import config from 'config';
import MongoConnectionHandler from '../handlers/mongo-connection-handler';
import type StandardChapterDataHandler from './standard-chapter-data-handler';
import MongoChapterDataHandler from './mongo-chapter-data-handler';
import type { ChapterDataItem } from '../../objects/ChapterDataItem';

let chapterDataHandler: StandardChapterDataHandler | undefined;

const initialiseDataHandler = (): StandardChapterDataHandler => {
  const connectionHandler = new MongoConnectionHandler<ChapterDataItem>(config.get('database.uri'));
  return new MongoChapterDataHandler(connectionHandler);
};

export default (): StandardChapterDataHandler => {
  if (chapterDataHandler === undefined) {
    chapterDataHandler = initialiseDataHandler();
  }
  return chapterDataHandler;
};
