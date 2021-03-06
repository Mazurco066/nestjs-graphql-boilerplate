// Nest Libs
import { Injectable } from '@nestjs/common'
import { ApolloError } from 'apollo-server-express'

// Mongoose
import { InjectModel } from '@nestjs/mongoose'
import { Model } from 'mongoose'

// Entities
import { UserToken } from '../schema'
import { UserRole }from'../../../common/enums'

// Helpers
import { baseResponse, IBaseResponse } from 'src/helpers'

// Interface
export interface IAuthRepository {
  authenticationUser(userData: IUserTokenParams, token: string): Promise<IBaseResponse>
}

export interface IUserTokenParams {
  id: string
  role: UserRole
}

@Injectable()
export class AuthRepository implements IAuthRepository {
  constructor(
    @InjectModel(UserToken.name) private userTokenSchema: Model<UserToken>
  ) {}

  /**
   * Authenticates user into the mongodb
   * @param user - Authenticated user
   * @param token - Bearer token
   */
  async authenticationUser(user: IUserTokenParams, token: string): Promise<IBaseResponse>  {
    try {

      const userAuth = await this.userTokenSchema.findOne({ userId: user.id })
      if(userAuth) {
      
        const r = await this.userTokenSchema.findOneAndUpdate({ 
          userId: user.id
        }, {
          token: token,
          role: user.role
        }, {
          new: true,
          useFindAndModify: false
        })

        if(r) {
          return baseResponse(201, 'User authentication sucessfully updated!', r)
        } else {
          return baseResponse(500, 'Failed to update authentication user')
        }
      }

      const r = await this.userTokenSchema.create({
        userId: user.id,
        token: token,
        role: user.role
      })
      
      if (r) {
        return baseResponse(201, 'User authentication sucessfully!', r)
      } else {
        return baseResponse(500, 'Failed to authentication user')
      }

    } catch (_) {
      throw new ApolloError('Error while generating access token', '500')
    }
  }
}
