// Dependencies
import { Module } from '@nestjs/common'
import { MailerModule } from '@nestjs-modules/mailer'
import { APP_GUARD } from '@nestjs/core'
import { AppController } from './app.controller'
import { GraphQLModule } from '@nestjs/graphql'
import { GraphQLError } from 'graphql'
import { MongooseModule } from '@nestjs/mongoose'
import { databaseURI } from '../common/config'
import { PugAdapter } from '@nestjs-modules/mailer/dist/adapters/pug.adapter'
import { config } from 'dotenv'

// Guards
import { RolesGuard, GqlJwtAuthGuard } from '../common/guards'

// API Modules
import { AuthModule } from './auth/auth.module'
import { UserModule } from './user/user.module'

// Dotenv variable
config()

// App Global Module
@Module({
  imports: [
    // GraphQL module
    GraphQLModule.forRoot({
      typePaths: ['./**/*.graphql'],
      playground: process.env.NODE_ENV !== 'production',
      formatError: (error: GraphQLError) => ({
        message: (
          error.extensions?.exception?.response?.message ||
          error.message
        )
      })
    }),
    // Database connection
    MongooseModule.forRoot(databaseURI, {
      useNewUrlParser: true,
      dbName: process.env.MONGODB_DATABASE
    }),
    // Mailer module
    MailerModule.forRoot({
      transport: {
        host: process.env.MAIL_HOST,
        port: process.env.MAIL_PORT,
        ignoreTLS: true,
        secure: false,
        auth: {
          user: process.env.MAIL_USER,
          pass: process.env.MAIL_PASS
        }
      },
      defaults: {
        from: `"No Reply" <${process.env.MAIL_USER}>`
      },
      template: {
        dir: (process.cwd() + '/src/common/mail/templates/').replace('/dist', ''),
        adapter: new PugAdapter(),
        options: { strict: true }
      }
    }),
    // API Modules
    AuthModule,
    UserModule
  ],
  controllers: [ AppController ],
  providers: [{
    provide: APP_GUARD,
    useClass: GqlJwtAuthGuard
  }, {
    provide: APP_GUARD,
    useClass: RolesGuard
  }]
})
export class AppModule {}
