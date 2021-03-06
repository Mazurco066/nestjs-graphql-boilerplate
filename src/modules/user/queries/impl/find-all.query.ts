// Nest Libs
import { IQuery } from '@nestjs/cqrs'

// Query Interface
export class FindAllUsersQuery implements IQuery {
  constructor() {}
}
