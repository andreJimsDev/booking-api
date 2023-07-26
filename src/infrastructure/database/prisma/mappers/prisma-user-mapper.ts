import { User as PrismaUser } from '@prisma/client';
import { User } from '../../../../domain/user';

export class PrismaUserMapper {
  private constructor() {
    throw new Error(
      'PrismaUserMapper is a static class and should not be instantiated',
    );
  }

  public static toPrisma(user: User): PrismaUser {
    return {
      id: user.id,
      lastName: user.lastName,
      firstName: user.firstName,
      email: user.email,
      password: user.password,
    };
  }

  public static toDomain(prismaUser: PrismaUser): User {
    return {
      id: prismaUser.id,
      lastName: prismaUser.lastName,
      firstName: prismaUser.firstName,
      email: prismaUser.email,
      password: prismaUser.password,
    };
  }
}
