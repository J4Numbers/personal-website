import config from 'config';
import StandardAuthHandler from './standard-auth-handler';
import PasswordAuthHandler from './password-auth-handler';

let authHandler: StandardAuthHandler;
let secondaryAuthHandler: StandardAuthHandler;

const initialisePasswordAuthHandler = (configPath: string) => {
  return new PasswordAuthHandler(config.get(configPath));
};

export function fetchAdminAuthHandler () {
  if (authHandler === undefined) {
    authHandler = initialisePasswordAuthHandler('admin.hash');
  }
  return authHandler;
}

export function fetchFriendAuthHandler () {
  if (secondaryAuthHandler === undefined) {
    secondaryAuthHandler = initialisePasswordAuthHandler('protected.hash');
  }
  return secondaryAuthHandler;
}
