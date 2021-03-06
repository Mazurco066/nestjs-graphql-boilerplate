// Nest Libs
import { ICommand } from '@nestjs/cqrs'
import { AuthenticateDTO } from '../../dto'

// Query Interface
export class AuthenticateCommand implements ICommand {
  constructor(public readonly params: AuthenticateDTO) {}
}
