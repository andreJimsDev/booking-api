import { Injectable } from '@nestjs/common';
import { PrismaService } from '../prisma.service';
import { PrismaUserMapper } from '../mappers/prisma-user-mapper';
import { UserRepository } from '../../../../application/repositories/user-repository';
import { User } from '../../../../domain/user';

@Injectable()
export class PrismaUsersRepository implements UserRepository {
  constructor(private readonly prismaService: PrismaService) {}

  async create(user: User): Promise<User> {
    const userPrismaData = PrismaUserMapper.toPrisma(user);

    const userCreated = await this.prismaService.user.create({
      data: userPrismaData,
    });

    return PrismaUserMapper.toDomain(userCreated);
  }

  async findByEmail(email: string): Promise<User | null> {
    const user = await this.prismaService.user.findUnique({ where: { email } });
    if (user !== null) return PrismaUserMapper.toDomain(user);
    return null;
  }
}
