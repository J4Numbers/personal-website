import config from 'config';
import MongoConnectionHandler from '../handlers/mongo-connection-handler';
import type StandardBlogDataHandler from './standard-blog-data-handler';
import MongoBlogDataHandler from './mongo-blog-data-handler';
import type { BlogDataItem } from '../../objects/BlogDataItem';

let blogDataHandler: StandardBlogDataHandler | undefined;

const initialiseDataHandler = (): StandardBlogDataHandler => {
  const connectionHandler = new MongoConnectionHandler<BlogDataItem>(config.get('database.uri'));
  return new MongoBlogDataHandler(connectionHandler);
};

export default (): StandardBlogDataHandler => {
  if (blogDataHandler === undefined) {
    blogDataHandler = initialiseDataHandler();
  }
  return blogDataHandler;
};
