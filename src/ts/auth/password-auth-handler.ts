import StandardAuthHandler from './standard-auth-handler';
import {AuthenticationDetails, PasswordAuthentication} from '../objects/auth/AuthenticationDetails';
import {UserIdent} from '../objects/auth/UserIdent';
import crypto from 'crypto';

export default class PasswordAuthHandler extends StandardAuthHandler {
  private readonly basePasswordHash: string;

  constructor(passwordHash: string) {
    super();
    this.basePasswordHash = passwordHash;
  }

  attemptAuthentication(authDetails: AuthenticationDetails): UserIdent {
    const passAuthDetails = authDetails as PasswordAuthentication;
    const hash = crypto.createHash('sha256')
      .update(passAuthDetails.password)
      .digest('hex');
    return {
      success: hash === this.basePasswordHash,
    };
  }
}
