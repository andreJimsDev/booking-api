import { IsNotEmpty, IsEmail } from 'class-validator';

export class SignUpUserDto {
  @IsNotEmpty()
  lastName: string;

  @IsNotEmpty()
  firstName: string;

  @IsEmail()
  email: string;

  @IsNotEmpty()
  password: string;
}
