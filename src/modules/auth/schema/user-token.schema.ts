// Mongoose
import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose'
import { Document } from 'mongoose'

// Utils
import { v4 } from 'uuid'

// Enuns
import { UserRole } from '../../../common/enums'

@Schema()
export class UserToken extends Document {
  @Prop({ required: false, default: () => v4(), select: false, unique: true })
  id: string

  @Prop({ required: true, default: '', select: false })
  userId: string

  @Prop({ required: true, default: '' })
  token: string

  @Prop({ required: false, default: '' })
  role: UserRole

  @Prop({ required: false, default: Date.now, select: false })
  createdAt?: Date

  @Prop({ required: false, default: Date.now, select: false })
  updatedAt?: Date
}

export const UserTokenSchema = SchemaFactory.createForClass(UserToken)