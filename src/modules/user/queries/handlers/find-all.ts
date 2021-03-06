// Nest Libs
import { IQueryHandler, QueryHandler } from '@nestjs/cqrs'
import { User } from '../../schema'

// Implementations
import { FindAllUsersQuery } from '../impl'

// Repositories
import { UserRepository } from '../../repositories'

@QueryHandler(FindAllUsersQuery)
export class FindAllUsersHandler implements IQueryHandler<FindAllUsersQuery> {
  constructor( 
    private readonly userRepository: UserRepository
  ) {}
  
  /**
   * Execute query method
   * @param query - Query parameters
   */
  async execute(query: FindAllUsersQuery): Promise<User[]> {
    const r = await this.userRepository.findAllUsers()
    return r
  }
}
