import { Injectable } from '@nestjs/common';
import { UseCase } from '../use-case';
import { User } from '../../../domain/user';
import { UserRepository } from '../../repositories/user-repository';
import { PasswordEncoderGateway } from '../../security/password-encoder-gateway';

@Injectable()
export class ValidateUserUseCase implements UseCase<User, User> {
  constructor(
    private readonly userRepository: UserRepository,
    private readonly passwordEncoderGateway: PasswordEncoderGateway,
  ) {}

  async execute(request: User): Promise<User> {
    const user = await this.userRepository.findByEmail(request.email);
    if (user !== null) {
      const isMatched = await this.passwordEncoderGateway.compare(
        request.password,
        user.password,
      );
      if (isMatched) return user;
    }
    return null;
  }
}
