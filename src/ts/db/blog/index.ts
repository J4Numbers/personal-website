import config from 'config';
import MongoConnectionHandler from '../handlers/mongo-connection-handler';
import StandardBlogDataHandler from './standard-blog-data-handler';
import MongoBlogDataHandler from './mongo-blog-data-handler';
import {BlogDataItem} from '../../objects/BlogDataItem';

let blogDataHandler: StandardBlogDataHandler;

const initialiseDataHandler = () => {
  const connectionHandler = new MongoConnectionHandler<BlogDataItem>(config.get('database.uri'));
  return new MongoBlogDataHandler(connectionHandler);
};

export default () => {
  if (blogDataHandler === undefined) {
    blogDataHandler = initialiseDataHandler();
  }
  return blogDataHandler;
};
