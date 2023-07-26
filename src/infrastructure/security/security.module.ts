import { Module } from '@nestjs/common';
import { PassportModule } from '@nestjs/passport';
import { JwtModule } from '@nestjs/jwt';
import { DatabaseModule } from '../database/database.module';
import { jwtConstants } from './constants';
import { JwtStrategy } from './jwt-strategy';
import { ValidateUserUseCase } from '../../application/use-cases/auth/validate-user.use-case';
import { JwtGateway } from '../../application/security/jwt-gateway';
import { JwtGatewayImpl } from './gateway/jwt-gateway-impl';
import { LocalStrategy } from './local.strategy';
import { PasswordEncoderGateway } from '../../application/security/password-encoder-gateway';
import { BcryptEncoderGateway } from './gateway/bcrypt-encoder-gateway';

@Module({
  imports: [
    PassportModule,
    DatabaseModule,
    JwtModule.register({
      secret: jwtConstants.secret,
      signOptions: { expiresIn: '1h' },
    }),
  ],
  providers: [
    JwtStrategy,
    LocalStrategy,
    ValidateUserUseCase,
    {
      provide: JwtGateway,
      useClass: JwtGatewayImpl,
    },
    {
      provide: PasswordEncoderGateway,
      useClass: BcryptEncoderGateway,
    },
  ],
  exports: [
    {
      provide: JwtGateway,
      useClass: JwtGatewayImpl,
    },
    {
      provide: PasswordEncoderGateway,
      useClass: BcryptEncoderGateway,
    },
  ],
})
export class SecurityModule {}
