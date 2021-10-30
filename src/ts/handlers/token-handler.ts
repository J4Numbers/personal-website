import type { JwtPayload } from 'jsonwebtoken';
import { verify, sign } from 'jsonwebtoken';

export default class TokenHandler {
  private readonly certificateFile: Buffer;

  private readonly keyFile: Buffer;

  public constructor (certificateFile: Buffer, keyFile: Buffer) {
    this.certificateFile = certificateFile;
    this.keyFile = keyFile;
  }

  public decodeToken (token: string): string | JwtPayload {
    try {
      return verify(token, this.certificateFile);
    } catch (e: unknown) {
      return {};
    }
  }

  public generateSignature (payload: object): string {
    return sign(payload, this.keyFile, {
      algorithm: 'RS256',
      expiresIn: '60m',
      issuer:    'j4numbers.co.uk',
    });
  }
}
