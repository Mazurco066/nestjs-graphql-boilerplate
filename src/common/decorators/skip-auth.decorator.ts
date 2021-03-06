// Dependencies
import { SetMetadata } from '@nestjs/common'
import { ROLES } from './roles.decorator'
import { applyDecorators } from '@nestjs/common'

// Set metatada for auth skip
export const SKIP_AUTH = 'SKIP_AUTH'
export const SkipAuth = (skipAuth = true) => applyDecorators(
  SetMetadata(SKIP_AUTH, skipAuth), 
  SetMetadata(ROLES, null)
)
