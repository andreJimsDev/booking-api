import { Injectable } from '@nestjs/common';
import { JwtService } from '@nestjs/jwt';
import { JwtGateway } from '../../../application/security/jwt-gateway';

@Injectable()
export class JwtGatewayImpl implements JwtGateway {
  constructor(private readonly jwtService: JwtService) {}
  createToken(payload: { username: string; sub: number }): string {
    return this.jwtService.sign(payload);
  }
}
