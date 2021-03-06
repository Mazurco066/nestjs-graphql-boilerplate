// Nest Libs
import { Inject } from '@nestjs/common'
import { CommandHandler, ICommandHandler } from '@nestjs/cqrs'
import { ApolloError } from 'apollo-server-express'
import { JwtService } from '@nestjs/jwt'
import { User } from '../../../user/schema'
import { JwtPayload, JwtToken } from '../../../../common/strategies'
import { comparePassword } from '../../../../utils'

// Implementations
import { AuthenticateCommand } from '../impl'

// Repositories
import { AuthRepository } from '../../repositories'
import { UserRepository } from '../../../user/repositories'

// Command handler
@CommandHandler(AuthenticateCommand)
export class AuthenticateHandler implements ICommandHandler<AuthenticateCommand> {
  constructor(
    @Inject('UserRepo') private readonly userRepository: UserRepository,
    private readonly authRepository: AuthRepository,
    private readonly jwtService: JwtService
  ) {}
  
  /**
   * Authenticate user command
   * @param command - Received parameters
   */
  async execute(command: AuthenticateCommand): Promise<JwtToken> {
    const user = await this.verifyUserByEmail(command)
    await this.verifyPasswords(command, user)

    const payload: JwtPayload = {
      userId: user.id,
      email: user.email,
      role: user.role
    }

    const token = await this.generateToken(user, payload)
    return { token }
  }

  /**
   * Verify and returns cuser by E-mail if exists
   * @param command - Received parameters
   * @returns user - if its registered on database
   */
  async verifyUserByEmail(command: AuthenticateCommand): Promise<User> {
    const { params: { email } } = command
    const r = await this.userRepository.findUserByEmail(email)
    if (!r) throw new ApolloError('This E-mail address does not exists')
    return r
  }

  /**
   * Verify if both passwords match
   * @param command - Received parameters
   * @param user - Current user
   */
  async verifyPasswords(command: AuthenticateCommand, user: User): Promise<void> {
    const { params: { password } } = command
    const pwdCompare  = await comparePassword(password, user.password)
    if (!pwdCompare) throw new ApolloError('Incorrect user or password!')
  }

  /**
   * Generates JWT token
   * @param user - User to be vinculated to token
   * @param payload - Payload for JWT token generation
   * @returns string - generated token
   */
  async generateToken({ id, role }: User, payload: JwtPayload): Promise<string> {
    const token = this.jwtService.sign(payload)
    const generatedToken = await this.authRepository.authenticationUser({ id, role }, token)
    return generatedToken.data.token || generatedToken.data.userToken.token
  }
}