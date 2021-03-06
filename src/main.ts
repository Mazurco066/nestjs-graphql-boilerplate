// Dependencies
import { NestFactory } from '@nestjs/core'
import { Logger, ValidationPipe } from '@nestjs/common'

// Module
import { AppModule } from './modules/app.module'

// Configs
import { options } from './common/config'
import { MongoExceptionFilter } from './common/filters'

// Application bootstrap
async function bootstrap() {
  // Express application
  const app = await NestFactory.create(AppModule, {
    cors: { }
  })

  // DTO Configuration
  const validationOptions = {
    skipMissingProperties: false,
    validationError: { target: false },
    validateCustomDecorators: true
  }
  
  // Pipes, filters and prefixes
  app.useGlobalPipes(new ValidationPipe(validationOptions))
  app.useGlobalFilters(new MongoExceptionFilter())
  app.setGlobalPrefix(options.PREFIX)

  // Start server
  await app.listen(options.PORT)
  Logger.log('Listening at http://localhost:' + options.PORT + '/' + options.PREFIX)
}

// Start server
bootstrap()