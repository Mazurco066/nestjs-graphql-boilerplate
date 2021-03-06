// Dependencies
import { Injectable } from '@nestjs/common'
import { InjectModel } from '@nestjs/mongoose'
import { Model } from 'mongoose'
import { MongoError } from 'mongodb'
import { CreateUserDTO } from '../dto'
import { User } from '../schema'
import { generateHash } from 'src/utils'
import { UserRole } from '../../../common/enums'

// Interface
export interface IUserRepository {
  createUser(params: CreateUserDTO): Promise<User>
  findUserByEmail(email: string): Promise<User | null>
  findAllUsers(): Promise<User[]>
}

@Injectable()
export class UserRepository implements IUserRepository {
  constructor(
    @InjectModel(User.name) private userSchema: Model<User>
  ) {}

  /**
   * Saves a user into database
   * @param params - contains the user data
   */
  async createUser(params: CreateUserDTO): Promise<User> {
    try {
      
      const passwordHash = await generateHash(params.password)
      
      const r = await this.userSchema.create({
        ...params,
        password: passwordHash,
        role: UserRole.customer
      })

      return r

    } catch (e) {
      throw new MongoError({ ...e })
    }
  }

  /**
   * Returns the user if exists
   * @param email - User email address
   */
  async findUserByEmail(email: string): Promise<User | null> {
    const r = await this.userSchema.findOne({ email })
    return r ? r : null
  }

  /**
   * Return all users
   */
  async findAllUsers(): Promise<User[]> {
    const r = await this.userSchema.find()
    return r
  }
}
