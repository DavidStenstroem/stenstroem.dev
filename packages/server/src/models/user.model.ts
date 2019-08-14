import { prop, Typegoose, pre } from 'typegoose'

enum UserRole {
  USER = 'user',
  ADMIN = 'admin',
}

@pre<User>('save', function(next): void {
  if (!this.createdAt) {
    this.createdAt = new Date()
  }
  this.updatedAt = new Date()
  next()
})
export class User extends Typegoose {
  @prop({ default: Date.now })
  createdAt: Date

  @prop({ default: Date.now })
  updatedAt: Date

  @prop({ required: true })
  name: string

  @prop({ required: true, unique: true, lowercase: true, index: true })
  email: string

  @prop({ enum: UserRole, default: 'user' })
  role: UserRole

  // TODO:
  // avatar

  @prop()
  hash: string

  @prop()
  salt: string

  @prop({ default: false })
  active: boolean

  @prop({ default: 0 })
  count: number

  @prop({ default: 0 })
  failedLoginAttempts: number

  @prop()
  lastFailedLoginAttempt: Date

  @prop()
  resetToken: string

  @prop()
  resetTokenExpires: Date
}

export const UserModel = new User().getModelForClass(User)
