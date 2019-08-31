import { pre, Ref, prop, Typegoose, arrayProp } from 'typegoose'
import { User } from './user.model'
import { Media } from './media.model'

@pre<Album>('save', function(next): void {
  if (!this.createdAt) {
    this.createdAt = new Date()
  }
  this.updatedAt = new Date()
  next()
})
export class Album extends Typegoose {
  @prop({ default: Date.now })
  createdAt: Date

  @prop({ default: Date.now })
  updatedAt: Date

  @prop({ ref: User })
  createdBy: Ref<User>

  @prop({ required: true })
  title: string

  @prop({ required: true })
  slug: string

  @prop()
  description?: string

  @arrayProp({ itemsRef: Media })
  media: Ref<Media>[]

  @arrayProp({ itemsRef: User })
  sharedWith?: Ref<User>[]
}

export const AlbumModel = new Album().getModelForClass(Album)
