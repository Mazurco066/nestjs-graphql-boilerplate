import { InputType } from '@nestjs/graphql'
import { IsEmail, IsString, IsNotEmpty, MinLength, MaxLength } from 'class-validator'

@InputType()
export class CreateUserDTO {

  @IsString({ message: 'Field "username" must be from type do tipo String' })
  @IsNotEmpty({ message: 'Field "username" must not be empty' })
  @MinLength(2, { message: 'Field "username" must contains min 2 characters' })
  @MaxLength(35, { message: 'Field "username" must contains max 35 characters' })
  username: string

  @IsString({ message: 'Field "password" must be from type do tipo String' })
  @IsNotEmpty({ message: 'Field "password" must not be empty' })
  @MinLength(2, { message: 'Field "password" must contains min 2 characters' })
  @MaxLength(50, { message: 'Field "password" must contains max 35 characters' })
  password: string

  @IsString({ message: 'Field "fullname" must be from type do tipo String' })
  @IsNotEmpty({ message: 'Field "fullname" must not be empty' })
  @MinLength(2, { message: 'Field "fullname" must contains min 2 characters' })
  @MaxLength(80, { message: 'Field "fullname" must contains max 80 characters' })
  fullname: string

  @IsString({ message: 'Field "email" must be from type do tipo String' })
  @IsNotEmpty({ message: 'Field "email" must not be empty' })
  @IsEmail({}, { message: 'Field "email" must contains um endereço valido' })
  email: string
}