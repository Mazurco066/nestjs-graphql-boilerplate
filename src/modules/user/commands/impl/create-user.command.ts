// Nest Libs
import { ICommand } from '@nestjs/cqrs'
import { CreateUserDTO } from '../../dto'

// Query Interface
export class CreateUserCommand implements ICommand {
  constructor(public readonly params: CreateUserDTO) {}
}
