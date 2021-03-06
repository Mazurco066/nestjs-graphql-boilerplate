// Nest Libs
import { Provider } from '@nestjs/common'

// Repository
import { AuthRepository, IAuthRepository } from './auth.repository'

// Custom Providers
const AuthRepositoryProvider: Provider = {
  provide: 'AuthRepo',
  useClass: AuthRepository
}

// Export repositories
export {
  AuthRepository,
  IAuthRepository,
  AuthRepositoryProvider
}
