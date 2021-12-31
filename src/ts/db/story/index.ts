import config from 'config';
import type { StoryDataItem } from '../../objects/StoryDataItem';
import type StandardStoryDataHandler from './standard-story-data-handler';
import MongoConnectionHandler from '../handlers/mongo-connection-handler';
import MongoStoryDataHandler from './mongo-story-data-handler';

let storyDataHandler: StandardStoryDataHandler | undefined;

const initialiseDataHandler = (): StandardStoryDataHandler => {
  const connectionHandler = new MongoConnectionHandler<StoryDataItem>(config.get('database.uri'));
  return new MongoStoryDataHandler(connectionHandler);
};

export default (): StandardStoryDataHandler => {
  if (storyDataHandler === undefined) {
    storyDataHandler = initialiseDataHandler();
  }
  return storyDataHandler;
};
