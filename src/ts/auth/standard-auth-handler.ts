import {UserIdent} from '../objects/auth/UserIdent';
import {AuthenticationDetails} from '../objects/auth/AuthenticationDetails';

export default abstract class StandardAuthHandler {
  abstract attemptAuthentication(authDetails: AuthenticationDetails): UserIdent;
}
