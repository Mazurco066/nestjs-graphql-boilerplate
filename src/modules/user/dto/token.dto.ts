import { IsString, IsNotEmpty, IsUUID } from 'class-validator'

class TokenDTO {
  @IsString({ message: 'ID must be text format' })
  @IsNotEmpty({ message: 'ID cannot be empty' })
  @IsUUID('4', { message: 'ID must be UUID v4 instance' })
  readonly id: string
}

export class GetUserTokenDTO {
  userToken: TokenDTO
}
