export abstract class PasswordEncoderGateway {
  abstract hash(password: string): Promise<string>;
  abstract compare(password: string, hashPassword: string): Promise<boolean>;
}
