import { prop, Typegoose, pre, Ref, arrayProp, index } from 'typegoose'
import { User } from './user.model'
import { Face } from './face.model'
import { GeoLocation } from './location.model'
import { OriginalCreateDate } from './original-create-date.model'

export enum ResourceType {
  image = 'image',
  video = 'video',
}

@index({ loc: '2dsphere' })
@pre<Media>('save', function(next): void {
  if (!this.createdAt) {
    this.createdAt = new Date()
  }
  this.updatedAt = new Date()
  next()
})
export class Media extends Typegoose {
  @prop({ default: Date.now })
  createdAt: Date

  @prop({ default: Date.now })
  updatedAt: Date

  @prop({ index: true })
  publicId: string

  @prop()
  version: string | number

  @prop()
  signature: string

  @prop()
  width: number

  @prop()
  height: number

  @prop()
  format: string

  @prop({ enum: ResourceType })
  resourceType: ResourceType

  @prop()
  bytes: number

  @prop()
  type: string

  @prop()
  etag: string

  @prop()
  placeholder: boolean

  @prop()
  url: string

  @prop({ index: true })
  secureUrl: string

  @prop()
  accessMode: string

  @prop()
  originalFilename: string

  @prop()
  pages?: string | number

  @prop()
  isAudio?: boolean

  @prop()
  frameRate?: number

  @prop()
  bitRate?: number

  @prop()
  duration?: number | string

  @prop()
  nbFrames?: string | number

  @prop({ ref: User })
  uploadedBy: Ref<User>

  @arrayProp({ _id: false, items: Face })
  faces?: Face[]

  @prop({ _id: false })
  loc: GeoLocation

  @prop({ _id: false })
  originalCreateDate?: OriginalCreateDate
}

export const MediaModel = new Media().getModelForClass(Media)
