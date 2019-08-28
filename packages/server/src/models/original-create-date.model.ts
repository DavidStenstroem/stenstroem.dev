import { prop } from 'typegoose'

export class OriginalCreateDate {
  @prop()
  year?: number

  @prop()
  month?: number

  @prop()
  day?: number

  @prop()
  hour?: number

  @prop()
  minute?: number

  @prop()
  second?: number

  @prop()
  millisecond?: number

  @prop()
  tzoffsetMinutes?: number

  @prop()
  rawValue?: string
}
