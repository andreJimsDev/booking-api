import {
  Body,
  Controller,
  Get,
  Post,
  Request,
  UseGuards,
} from '@nestjs/common';

import { SignUpUserDto } from '../dtos/user/sign-up-user-dto';
import { UserMapper } from '../mappers/user-mapper';
import { SignInUseCase } from '../../../application/use-cases/auth/sign-in.use-case';
import { SignUpUseCase } from '../../../application/use-cases/auth/sign-up.use-case';
import { LocalAuthGuard } from '../../security/local-auth.guard';
import { JwtAuthGuard } from '../../security/jwt-auth.guard';

@Controller('auth')
export class AuthController {
  constructor(
    private readonly signInUseCase: SignInUseCase,
    private readonly signUpUseCase: SignUpUseCase,
  ) {}

  @Post('signUp')
  async signUp(@Body() body: SignUpUserDto) {
    const user = await this.signUpUseCase.execute(body);

    return UserMapper.toDto(user);
  }

  @UseGuards(LocalAuthGuard)
  @Post('signIn')
  signIn(@Request() req) {
    return this.signInUseCase.execute(req.user);
  }
}
