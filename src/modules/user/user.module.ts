// Dependencies
import { Module } from '@nestjs/common'
import { CqrsModule } from '@nestjs/cqrs'

// Commands and queries
import { CommandHandlers } from './commands/handlers'
import { QueryHandlers } from './queries/handlers'

// Database
import { MongooseModule } from '@nestjs/mongoose'
import { User, UserSchema } from './schema'

// Services, Resolvers, Repository
import { UserResolver } from './resolvers'
import { UserService } from './services'
import {  UserRepository, UserRepositoryProvider } from './repositories'

// User module
@Module({
  imports: [ 
    MongooseModule.forFeature([
      { name: User.name, schema: UserSchema }
    ]),
    CqrsModule
  ],
  providers: [
    UserRepository,
    UserRepositoryProvider,
    UserResolver,
    UserService,
    ...CommandHandlers,
    ...QueryHandlers
  ],
  exports: [
    UserRepositoryProvider
  ]
})
export class UserModule {}