import { Injectable } from '@nestjs/common';
import { UseCase } from '../use-case';
import { User } from '../../../domain/user';
import { JwtGateway } from '../../security/jwt-gateway';

export interface AuthRequest {
  username: string;
  password: string;
}

export interface AuthResponse {
  accessToken: string;
}

@Injectable()
export class SignInUseCase implements UseCase<User, AuthResponse> {
  constructor(private readonly jwtGateway: JwtGateway) {}

  execute(request: User): Promise<AuthResponse> {
    return Promise.resolve({
      accessToken: this.jwtGateway.createToken({
        username: request.email,
        sub: request.id,
      }),
    });
  }
}
