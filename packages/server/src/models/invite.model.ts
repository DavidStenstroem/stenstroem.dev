import { prop, Typegoose, pre } from 'typegoose'

@pre<Invite>('save', function(next): void {
  if (!this.createdAt) {
    this.createdAt = new Date()
  }
  this.updatedAt = new Date()
  next()
})
export class Invite extends Typegoose {
  @prop({ default: Date.now })
  createdAt: Date

  @prop({ default: Date.now })
  updatedAt: Date

  @prop({ required: true, unique: true, lowercase: true })
  email: string

  @prop({ default: true })
  isValid: boolean
}

export const InviteModel = new Invite().getModelForClass(Invite)
