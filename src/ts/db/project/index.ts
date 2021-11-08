import config from 'config';
import MongoConnectionHandler from '../handlers/mongo-connection-handler';
import type StandardProjectDataHandler from './standard-project-data-handler';
import MongoProjectDataHandler from './mongo-project-data-handler';
import type { ProjectDataItem } from '../../objects/ProjectDataItem';

let projectDataHandler: StandardProjectDataHandler | undefined;

const initialiseDataHandler = (): StandardProjectDataHandler => {
  const connectionHandler = new MongoConnectionHandler<ProjectDataItem>(config.get('database.uri'));
  return new MongoProjectDataHandler(connectionHandler);
};

export default (): StandardProjectDataHandler => {
  if (projectDataHandler === undefined) {
    projectDataHandler = initialiseDataHandler();
  }
  return projectDataHandler;
};
