// Dependencies
import { Module } from '@nestjs/common'
import { CqrsModule } from '@nestjs/cqrs'

// Commands and queries
import { CommandHandlers } from './commands/handlers'

// Database
import { MongooseModule } from '@nestjs/mongoose'
import { UserToken, UserTokenSchema } from './schema'

// Services, Resolvers, Repository
import { AuthResolver } from './resolvers'
import { AuthService } from './services'
import { AuthRepository, AuthRepositoryProvider } from './repositories'

// JWT Modules
import { JwtModule } from '@nestjs/jwt'
import { JwtStrategy } from'../../common/strategies'
import { PassportModule } from '@nestjs/passport'

// Module providers
import { UserModule } from '../user/user.module'

// User module
@Module({
  imports: [ 
    UserModule,
    MongooseModule.forFeature([
      { name: UserToken.name, schema: UserTokenSchema }
    ]),
    PassportModule,
    JwtModule.register({
      secret: process.env.APP_SECRET,
      signOptions: { expiresIn: process.env.APP_EXPIRATION }
    }),
    CqrsModule
  ],
  providers: [
    JwtStrategy,
    AuthRepository,
    AuthRepositoryProvider,
    AuthResolver,
    AuthService,
    ...CommandHandlers
  ],
  exports: [
    AuthRepositoryProvider
  ]
})
export class AuthModule {}
