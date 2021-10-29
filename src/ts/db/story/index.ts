import config from 'config';
import MongoConnectionHandler from '../handlers/mongo-connection-handler';
import StandardStoryDataHandler from './standard-story-data-handler';
import MongoStoryDataHandler from './mongo-story-data-handler';
import {StoryDataItem} from '../../objects/StoryDataItem';

let storyDataHandler: StandardStoryDataHandler;

const initialiseDataHandler = () => {
  const connectionHandler = new MongoConnectionHandler<StoryDataItem>(config.get('database.uri'));
  return new MongoStoryDataHandler(connectionHandler);
};

export default () => {
  if (storyDataHandler === undefined) {
    storyDataHandler = initialiseDataHandler();
  }
  return storyDataHandler;
};
