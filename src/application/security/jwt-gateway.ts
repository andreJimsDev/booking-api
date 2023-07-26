export abstract class JwtGateway {
  abstract createToken(payload: { username: string; sub: number }): string;
}
