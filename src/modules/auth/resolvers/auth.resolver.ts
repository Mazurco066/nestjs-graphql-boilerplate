// Dependencies
import { Resolver, Mutation, Args } from '@nestjs/graphql'
import { AuthService } from '../services'
import { UserToken } from '../schema'
import { AuthenticateDTO } from '../dto'

import { SkipAuth } from '../../../common/decorators'

// User Resolver
@Resolver()
export class AuthResolver {
  constructor(private readonly authService: AuthService) {}

  // Authenticate mutation
  @SkipAuth()
  @Mutation(() => UserToken)
  async authenticate(@Args('login') data: AuthenticateDTO) {
    return await this.authService.authenticate(data)
  }
}
