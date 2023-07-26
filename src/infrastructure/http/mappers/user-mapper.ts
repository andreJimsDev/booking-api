import { UserDto } from '../dtos/user/user-dto';
import { User } from '../../../domain/user';

export class UserMapper {
  private constructor() {
    throw new Error(
      'UserMapper is a static class and should not be instantiated',
    );
  }

  public static toDto(user: User): UserDto {
    return {
      id: user.id,
      lastName: user.lastName,
      firstName: user.firstName,
      email: user.email,
    };
  }
}
