import fs from 'fs';
import config from 'config';
import {verify, sign, JwtPayload} from 'jsonwebtoken';

export default class TokenHandler {
  private readonly certificateFile: Buffer = fs.readFileSync(config.get('jwt.public_cert'));
  private readonly keyFile: Buffer = fs.readFileSync(config.get('jwt.private_key'));

  constructor(certificateFile: Buffer, keyFile: Buffer) {
    this.certificateFile = certificateFile;
    this.keyFile = keyFile;
  }

  decodeToken (token: string): string | JwtPayload {
    try {
      return verify(token, this.certificateFile);
    } catch (e) {
      return {};
    }
  };

  generateSignature (payload: object): string {
    return sign(payload, this.keyFile, {
      algorithm: 'RS256',
      expiresIn: '60m',
      issuer:    'j4numbers.co.uk',
    });
  }
}
