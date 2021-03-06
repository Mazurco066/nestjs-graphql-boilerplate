import { InputType } from '@nestjs/graphql'
import { IsEmail, IsString, IsNotEmpty, MinLength, MaxLength } from 'class-validator'

@InputType()
export class AuthenticateDTO {
  @IsString({ message: 'Campo "email" deve ser do tipo String' })
  @IsNotEmpty({ message: 'Campo "email" não deve ser vazio' })
  @IsEmail({}, { message: 'Campo "email" deve conter um endereço valido' })
  email: string

  @IsString({ message: 'Campo "password" deve ser do tipo String' })
  @IsNotEmpty({ message: 'Campo "password" não deve ser vazio' })
  @MinLength(2, { message: 'Campo "password" deve conter no mínimo 2 caracteres' })
  @MaxLength(50, { message: 'Campo "password" deve conter no máximo 35 caracteres' })
  password: string
}