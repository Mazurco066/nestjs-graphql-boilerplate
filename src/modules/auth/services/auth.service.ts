// Dependencies
import { Injectable } from '@nestjs/common'
import { CommandBus } from '@nestjs/cqrs'
import { AuthenticateDTO } from '../dto'
import { JwtToken } from '../../../common/strategies'

// CQRS Commands and queries
import { AuthenticateCommand } from '../commands/impl'

// User service
@Injectable()
export class AuthService {
  constructor(
    private readonly commandBus: CommandBus
  ) {}

  // Authenticate service
  async authenticate(data: AuthenticateDTO): Promise<JwtToken> {
    return await this.commandBus.execute(new AuthenticateCommand(data))
  }
}
