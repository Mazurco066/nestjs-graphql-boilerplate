// Nest Libs
import { Provider } from '@nestjs/common'

// Repository
import { UserRepository, IUserRepository } from './user.repository'

// Custom Providers
const UserRepositoryProvider: Provider = {
  provide: 'UserRepo',
  useClass: UserRepository
}

// Export repositories
export {
  UserRepository,
  IUserRepository,
  UserRepositoryProvider
}
