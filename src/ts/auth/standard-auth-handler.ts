import type { UserIdent } from '../objects/auth/UserIdent';
import type { AuthenticationDetails } from '../objects/auth/AuthenticationDetails';

export default abstract class StandardAuthHandler {
  public abstract attemptAuthentication (authDetails: AuthenticationDetails): UserIdent;
}
