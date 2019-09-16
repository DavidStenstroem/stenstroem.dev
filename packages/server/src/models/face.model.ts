import { prop, Typegoose, pre, Ref, arrayProp } from 'typegoose'
import { v4 } from 'uuid'

export class Face extends Typegoose {
  @prop({ default: v4 })
  uuid: string

  @arrayProp({ items: Number })
  coordinates: number[]
}
