import { ExtractJwt, Strategy } from 'passport-jwt'
import { PassportStrategy } from '@nestjs/passport'
import { Injectable } from '@nestjs/common'
import { UserRole } from '../enums'

export interface JwtPayload {
  email: string
  userId: string
  role: UserRole
}

export interface JwtToken {
  token: string
}

@Injectable()
export class JwtStrategy extends PassportStrategy(Strategy) {
  constructor() {
    super({
      jwtFromRequest: ExtractJwt.fromAuthHeaderAsBearerToken(),
      ignoreExpiration: false,
      secretOrKey: process.env.APP_SECRET
    })
  }

  async validate(payload: JwtPayload) {
    return { ...payload }
  }
}
