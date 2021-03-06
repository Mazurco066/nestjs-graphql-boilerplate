// Mongoose
import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose'
import { Document } from 'mongoose'
import { UserRole } from '../../../common/enums'

// Utils
import { v4 } from 'uuid'

@Schema()
export class User extends Document {
  @Prop({ required: false, default: () => v4(), unique: true })
  id: string

  @Prop({ required: true, default: '', unique: true })
  username: string

  @Prop({ required: true, default: '' })
  fullname: string

  @Prop({ required: true, default: '', unique: true })
  email: string

  @Prop({ required: false, default: '', select: true })
  password: string

  @Prop({ required: false, default: UserRole.customer })
  role?: UserRole

  @Prop({ required: false, default: Date.now, select: false })
  createdAt?: Date

  @Prop({ required: false, default: Date.now, select: false })
  updatedAt?: Date
}

export const UserSchema = SchemaFactory.createForClass(User)