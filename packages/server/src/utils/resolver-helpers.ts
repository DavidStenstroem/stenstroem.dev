import { InstanceType } from 'typegoose'
import {
  Album as GQLAlbum,
  Account,
  Media as GQLMedia,
  ResourceType,
} from '../types/graphql'
import { Album } from '../models/album.model'
import { User } from '../models/user.model'
import { Media } from '../models/media.model'

export const userToGQLAccount = (user: InstanceType<User>): Account => ({
  id: user._id,
  email: user.email,
  name: user.name,
  createdAt: user.createdAt,
  updatedAt: user.updatedAt,
  slug: user.slug,
})

export const mediaToGQLMedia = ({
  _id,
  bitRate,
  loc,
  uploadedBy,
  accessMode,
  width,
  version,
  url,
  updatedAt,
  type,
  signature,
  secureUrl,
  resourceType,
  publicId,
  placeholder,
  originalFilename,
  originalCreateDate,
  isAudio,
  height,
  frameRate,
  createdAt,
  format,
  faces,
  etag,
  duration,
  bytes,
}: InstanceType<Media>): GQLMedia => ({
  id: _id,
  uploadedBy: userToGQLAccount(uploadedBy as InstanceType<User>),
  accessMode,
  bitRate,
  bytes,
  duration: Number(duration),
  etag,
  faces,
  format,
  createdAt,
  frameRate,
  height,
  isAudio,
  loc,
  originalCreateDate,
  originalFilename,
  placeholder,
  publicId,
  resourceType: resourceType as ResourceType,
  secureUrl,
  signature,
  type,
  updatedAt,
  url,
  version: String(version),
  width,
})

export const toCursorHash = (string: string): string =>
  Buffer.from(string).toString('base64')
export const fromCursorHash = (string: string): string =>
  Buffer.from(string, 'base64').toString('utf8')
