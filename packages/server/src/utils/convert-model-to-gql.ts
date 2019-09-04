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

export const albumModelToAlbumType = (album: InstanceType<Album>): GQLAlbum => {
  const createdBy = (account: InstanceType<User>): Account => ({
    id: account._id,
    email: account.email,
    name: account.name,
    createdAt: account.createdAt,
    updatedAt: account.updatedAt,
  })
  return {
    title: album.title,
    description: album.description,
    slug: album.slug,
    createdBy: createdBy(album.createdBy as InstanceType<User>),
    media: (album.media as InstanceType<Media>[]).map(
      ({
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
      }): GQLMedia => ({
        id: _id,
        uploadedBy: createdBy(uploadedBy as InstanceType<User>),
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
    ),
  }
}
