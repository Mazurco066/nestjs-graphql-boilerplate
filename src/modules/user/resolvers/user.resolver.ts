// Dependencies
import { Resolver, Query, Mutation, Args } from '@nestjs/graphql'
import { UserService } from '../services'
import { User } from '../schema'
import { CreateUserDTO } from '../dto'

import { Roles, Role, SkipAuth } from '../../../common/decorators'

// User Resolver
@Resolver()
export class UserResolver {
  constructor(private readonly userService: UserService) {}

  // Find all users query
  @Query(() => [User])
  @Roles(Role.master)
  async users() {
    return this.userService.findAllUsers()
  }

  // Create user mutation
  @SkipAuth()
  @Mutation(() => User)
  async createUser(@Args('user') user: CreateUserDTO) {
    return await this.userService.createUser(user)
  }
}
