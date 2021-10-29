import config from 'config';
import MongoConnectionHandler from '../handlers/mongo-connection-handler';
import StandardProjectDataHandler from './standard-project-data-handler';
import MongoProjectDataHandler from './mongo-project-data-handler';
import {BlogDataItem} from '../../objects/BlogDataItem';
import {ProjectDataItem} from '../../objects/ProjectDataItem';

let projectDataHandler: StandardProjectDataHandler;

const initialiseDataHandler = () => {
  const connectionHandler = new MongoConnectionHandler<ProjectDataItem>(config.get('database.uri'));
  return new MongoProjectDataHandler(connectionHandler);
};

export default () => {
  if (projectDataHandler === undefined) {
    projectDataHandler = initialiseDataHandler();
  }
  return projectDataHandler;
};
