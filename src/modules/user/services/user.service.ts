// Dependencies
import { Injectable } from '@nestjs/common'
import { CommandBus, QueryBus } from '@nestjs/cqrs'
import { CreateUserDTO } from '../dto'
import { User } from '../schema'

// CQRS Commands and queries
import { CreateUserCommand } from '../commands/impl'
import { FindAllUsersQuery } from '../queries/impl'

// User service
@Injectable()
export class UserService {
  constructor(
    private readonly commandBus: CommandBus,
    private readonly queryBus: QueryBus
  ) {}

  // Find users service used on query
  async findAllUsers(): Promise<User[]> {
    return await this.queryBus.execute(new FindAllUsersQuery())
  }

  // Create user service used on mutation
  async createUser(user: CreateUserDTO): Promise<User> {
    return await this.commandBus.execute(new CreateUserCommand(user))
  }
}
