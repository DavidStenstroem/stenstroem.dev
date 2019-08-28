import { prop, arrayProp } from 'typegoose'

export class GeoLocation {
  @prop({ default: 'Point' })
  type: string

  @arrayProp({ items: Number, default: [0, 0] })
  coordinates: number[]
}
