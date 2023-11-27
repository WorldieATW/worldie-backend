import { IsString, IsNotEmpty, IsEmail, MinLength } from 'class-validator'

export class RegistrationDTO {
  @IsNotEmpty()
  @IsEmail()
  email: string

  @IsNotEmpty()
  @IsString()
  nama: string

  @IsNotEmpty()
  role: string

  @IsNotEmpty()
  @IsString()
  @MinLength(8)
  password: string

  @IsNotEmpty()
  @IsString()
  confirmationPassword: string
}

export class LoginDTO {
  @IsNotEmpty()
  @IsEmail()
  email: string

  @IsNotEmpty()
  @IsString()
  password: string
}
