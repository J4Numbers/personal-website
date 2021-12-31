import config from 'config';
import type StandardAuthHandler from './standard-auth-handler';
import PasswordAuthHandler from './password-auth-handler';

let authHandler: StandardAuthHandler | undefined;
let secondaryAuthHandler: StandardAuthHandler | undefined;

// eslint-disable-next-line max-len
const initialisePasswordAuthHandler = (configPath: string): StandardAuthHandler => new PasswordAuthHandler(config.get(configPath));

export function fetchAdminAuthHandler (): StandardAuthHandler {
  if (authHandler === undefined) {
    authHandler = initialisePasswordAuthHandler('admin.hash');
  }
  return authHandler;
}

export function fetchFriendAuthHandler (): StandardAuthHandler {
  if (secondaryAuthHandler === undefined) {
    secondaryAuthHandler = initialisePasswordAuthHandler('protected.hash');
  }
  return secondaryAuthHandler;
}
