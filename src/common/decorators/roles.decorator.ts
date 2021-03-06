// import { SetMetadata, applyDecorators, UseGuards } from '@nestjs/common'
import { SetMetadata } from '@nestjs/common'
import { UserRole as RolesEnum } from '../enums'

export const ROLES = 'ROLES'
export const Role = RolesEnum
export const Roles = (...roles: string[]) => SetMetadata(ROLES, roles)
