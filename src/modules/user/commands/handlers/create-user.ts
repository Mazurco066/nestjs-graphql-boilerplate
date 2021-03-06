// Nest Libs
import { CommandHandler, ICommandHandler } from '@nestjs/cqrs'
import { User } from '../../schema'

// Implementations
import { CreateUserCommand } from '../impl'

// Repositories
import { UserRepository } from '../../repositories'

// Command handler
@CommandHandler(CreateUserCommand)
export class CreateUserHandler implements ICommandHandler<CreateUserCommand> {
  constructor(
    private readonly userRepository: UserRepository
  ) {}
  
  /**
   * Execute command method
   * @param command - Command parameters
   */
  async execute(command: CreateUserCommand): Promise<User> {
    // Get parameters
    const { params } = command
    return await this.createUser({ ...params })
  }

  async createUser(user: any): Promise<User> {
    const r = await this.userRepository.createUser({ ...user })
    return r
  }
}