import { BadRequestException, Injectable } from '@nestjs/common';
import { UseCase } from '../use-case';
import { User } from '../../../domain/user';
import { UserRepository } from '../../repositories/user-repository';
import { PasswordEncoderGateway } from '../../security/password-encoder-gateway';

@Injectable()
export class SignUpUseCase implements UseCase<User, User> {
  constructor(
    private readonly userRepository: UserRepository,
    private readonly passwordEncoderGateway: PasswordEncoderGateway,
  ) {}

  async execute(request: User): Promise<User> {
    const user = await this.userRepository.findByEmail(request.email);
    if (user) throw new BadRequestException();
    request.password = await this.passwordEncoderGateway.hash(request.password);
    return this.userRepository.create(request);
  }
}
