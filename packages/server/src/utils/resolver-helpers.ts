import { InstanceType } from 'typegoose'
import {
  Album as GQLAlbum,
  Account,
  Media as GQLMedia,
  ResourceType,
  CoverConnection,
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

export const albumModelToCoverConnection = (
  albums: InstanceType<Album>[],
  limit: number,
  totalItems: number
): CoverConnection => {
  const hasNextPage = albums.length > limit
  const edges = hasNextPage ? albums.slice(0, -1) : albums
  return {
    edges: edges.map((album) => ({
      title: album.title,
      slug: album.slug,
      creator: userToGQLAccount(album.createdBy as InstanceType<User>),
      isPrivate: album.private,
      createdAt: album.createdAt,
      updatedAt: album.updatedAt,
      image: {
        id: (album.media[0] as InstanceType<Media>)._id,
        uploadedBy: userToGQLAccount((album.media[0] as InstanceType<Media>)
          .uploadedBy as InstanceType<User>),
        accessMode: (album.media[0] as InstanceType<Media>).accessMode,
        bitRate: (album.media[0] as InstanceType<Media>).bitRate,
        bytes: (album.media[0] as InstanceType<Media>).bytes,
        duration: Number((album.media[0] as InstanceType<Media>).duration),
        etag: (album.media[0] as InstanceType<Media>).etag,
        faces: (album.media[0] as InstanceType<Media>).faces,
        format: (album.media[0] as InstanceType<Media>).format,
        createdAt: (album.media[0] as InstanceType<Media>).createdAt,
        frameRate: (album.media[0] as InstanceType<Media>).frameRate,
        height: (album.media[0] as InstanceType<Media>).height,
        isAudio: (album.media[0] as InstanceType<Media>).isAudio,
        loc: (album.media[0] as InstanceType<Media>).loc,
        originalCreateDate: (album.media[0] as InstanceType<Media>)
          .originalCreateDate,
        originalFilename: (album.media[0] as InstanceType<Media>)
          .originalFilename,
        placeholder: (album.media[0] as InstanceType<Media>).placeholder,
        publicId: (album.media[0] as InstanceType<Media>).publicId,
        resourceType: (album.media[0] as InstanceType<Media>)
          .resourceType as ResourceType,
        secureUrl: (album.media[0] as InstanceType<Media>).secureUrl,
        signature: (album.media[0] as InstanceType<Media>).signature,
        type: (album.media[0] as InstanceType<Media>).type,
        updatedAt: (album.media[0] as InstanceType<Media>).updatedAt,
        url: (album.media[0] as InstanceType<Media>).url,
        version: String((album.media[0] as InstanceType<Media>).version),
        width: (album.media[0] as InstanceType<Media>).width,
      },
    })),
    pageInfo: {
      hasNextPage,
      endCursor: toCursorHash(albums[albums.length - 1].createdAt.toString()),
      totalItems,
    },
  }
}
