import { IsEmail, IsNotEmpty, MinLength } from 'class-validator';

export class CreateUserDto {
  @IsEmail()
  @IsNotEmpty()
  email: string;

  @MinLength(8)
  @IsNotEmpty()
  password: string;

  @IsNotEmpty()
  @MinLength(2)
  name: string;

  //   @IsEmail()
  //   email: string;

  //   @IsPhoneNumber('KR')
  //   phoneNumber: string;
}
