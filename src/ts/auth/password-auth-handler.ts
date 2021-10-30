import StandardAuthHandler from './standard-auth-handler';
import type { AuthenticationDetails } from '../objects/auth/AuthenticationDetails';
import type { UserIdent } from '../objects/auth/UserIdent';
import crypto from 'crypto';

export default class PasswordAuthHandler extends StandardAuthHandler {
  private readonly basePasswordHash: string;

  public constructor (passwordHash: string) {
    super();
    this.basePasswordHash = passwordHash;
  }

  public attemptAuthentication (authDetails: AuthenticationDetails): UserIdent {
    const hash = crypto.createHash('sha256')
      .update(authDetails.password)
      .digest('hex');
    return {
      success: hash === this.basePasswordHash,
    };
  }
}
