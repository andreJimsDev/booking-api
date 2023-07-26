import { Injectable } from '@nestjs/common';
import * as bcrypt from 'bcrypt';
import { PasswordEncoderGateway } from '../../../application/security/password-encoder-gateway';

@Injectable()
export class BcryptEncoderGateway implements PasswordEncoderGateway {
  compare(password: string, hashPassword: string): Promise<boolean> {
    return bcrypt.compare(password, hashPassword);
  }

  hash(password: string): Promise<string> {
    return bcrypt.hash(password, 10);
  }
}
