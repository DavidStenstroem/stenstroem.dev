import {
  Resolvers,
  CreateAlbumResponse,
  Album as GQLAlbum,
  MediaConnection,
  Media as GQLMedia,
  Account,
  AlbumConnection,
} from '../../types/graphql'
import { authenticate } from '../../authentication'
import { RequestWithUser } from '../../types/RequestWithUser'
import { createAlbumSchema } from '@stenstroem-dev/shared'
import { formatError } from '../../utils/formatError'
import { ValidationError } from 'yup'
import { AlbumModel } from '../../models/album.model'
import slugify from 'slugify'
import { randomBytes } from 'crypto'
import { processUpload, insertFiles } from '../../utils/uploads'
import { MediaModel } from '../../models/media.model'
import { UserModel, User } from '../../models/user.model'
import {
  fromCursorHash,
  userToGQLAccount,
  mediaToGQLMedia,
  toCursorHash,
} from '../../utils/resolver-helpers'
import { InstanceType } from 'typegoose'
import { v4 } from 'uuid'
import { ObjectId } from 'bson'

export const resolvers: Resolvers = {
  Album: {
    media: async (parent, { cursor, limit = 40 }): Promise<MediaConnection> => {
      const query = cursor
        ? {
            albumId: { $in: [parent.albumId] },
            createdAt: { $lt: fromCursorHash(cursor) },
          }
        : { albumId: { $in: [parent.albumId] } }
      const totalItems = await MediaModel.countDocuments({
        albumId: { $in: [parent.albumId] },
      })
      const media = await MediaModel.find(query)
        .limit(limit + 1)
        .sort({ createdAt: -1 })
        .populate({ path: 'uploadedBy', model: 'User' })

      const hasNextPage = media.length > limit
      const edges = hasNextPage ? media.slice(0, -1) : media

      return {
        pageInfo: {
          totalItems,
          hasNextPage,
          endCursor: toCursorHash(
            edges[edges.length - 1].createdAt.getTime().toString()
          ),
        },
        edges: edges.map((m) => mediaToGQLMedia(m)),
      }
    },

    cover: async (parent): Promise<GQLMedia> => {
      const media = await MediaModel.find({
        albumId: { $in: [parent.albumId] },
      })
        .sort({ _id: -1 })
        .limit(1)
        .populate({ path: 'uploadedBy', mode: 'User' })

      return mediaToGQLMedia(media[0])
    },

    mediaCount: async (parent): Promise<number> =>
      await MediaModel.countDocuments({ albumId: { $in: [parent.albumId] } }),

    createdBy: async (parent): Promise<Account> => {
      const albumCreator = await AlbumModel.findOne({
        albumId: parent.albumId,
      }).populate({ path: 'createdBy', model: 'User' })
      return userToGQLAccount(albumCreator.createdBy as InstanceType<User>)
    },

    sharedWith: async (parent): Promise<Account[]> => {
      const accounts = await AlbumModel.findOne({
        albumId: parent.albumId,
      }).populate({ path: 'sharedWith', model: 'User' })
      return (accounts.sharedWith as InstanceType<User>[]).map(
        ({ _id, name, email, slug, createdAt, updatedAt }): Account => ({
          id: _id,
          name,
          email,
          slug,
          createdAt,
          updatedAt,
        })
      )
    },
  },

  Query: {
    getStreamCover: async (parent, args, { req }): Promise<GQLMedia> => {
      const user = await authenticate(req as RequestWithUser)
      const latestMedia = await MediaModel.find({ uploadedBy: user._id })
        .populate({ path: 'uploadedBy', model: 'User' })
        .sort({ _id: -1 })
        .limit(1)

      if (!latestMedia) {
        return null
      } else if (latestMedia.length <= 0) {
        return null
      }

      return mediaToGQLMedia(latestMedia[0])
    },

    getStream: async (
      parent,
      { cursor, limit = 40 },
      { req }
    ): Promise<MediaConnection> => {
      const user = await authenticate(req as RequestWithUser)
      const query = cursor
        ? { uploadedBy: user._id, createdAt: { $lt: fromCursorHash(cursor) } }
        : { uploadedBy: user._id }
      const totalItems = await MediaModel.estimatedDocumentCount(query)
      const media = await MediaModel.find(query)
        .limit(limit + 1)
        .sort({ createdAt: -1 })
        .populate({ path: 'uploadedBy', model: 'User' })

      const hasNextPage = media.length > limit
      const edges = hasNextPage ? media.slice(0, -1) : media

      return {
        pageInfo: {
          totalItems,
          hasNextPage,
          endCursor: toCursorHash(
            media[media.length - 1].createdAt.getTime().toString()
          ),
        },
        edges: edges.map((m) => mediaToGQLMedia(m)),
      }
    },

    getAlbum: async (parent, { slug }, { req }): Promise<GQLAlbum> => {
      const user = await authenticate(req as RequestWithUser)

      const album = await AlbumModel.findOne({ slug }).populate([
        { path: 'createdBy', model: 'User' },
        {
          path: 'media',
          model: 'Media',
          populate: { path: 'uploadedBy', model: 'User' },
        },
      ])
      if (!album) {
        return null
      } else if (album.private) {
        const hasAccess =
          album.sharedWith && album.sharedWith.includes(user._id)
        return hasAccess
          ? {
              isPrivate: album.private,
              albumId: album.albumId,
              createdAt: album.createdAt,
              createdBy: userToGQLAccount(album.createdBy as InstanceType<
                User
              >),
              description: album.description,
              slug: album.slug,
              title: album.title,
              updatedAt: album.updatedAt,
            }
          : null
      } else {
        return {
          isPrivate: album.private,
          albumId: album.albumId,
          createdAt: album.createdAt,
          createdBy: userToGQLAccount(album.createdBy as InstanceType<User>),
          description: album.description,
          slug: album.slug,
          title: album.title,
          updatedAt: album.updatedAt,
        }
      }
    },

    myAlbums: async (
      parent,
      { cursor, limit = 20 },
      { req }
    ): Promise<AlbumConnection> => {
      const user = await authenticate(req as RequestWithUser)
      const query = cursor ? { createdAt: { $lt: fromCursorHash(cursor) } } : {}
      const totalItems = await AlbumModel.countDocuments({
        createdBy: user._id,
      })
      const albums = await AlbumModel.find({ createdBy: user._id, ...query })
        .sort({ createdAt: -1 })
        .limit(limit + 1)

      const hasNextPage = albums.length > limit
      const edges = hasNextPage ? albums.slice(0, -1) : albums

      return {
        pageInfo: {
          totalItems,
          hasNextPage,
          endCursor: toCursorHash(
            albums[albums.length - 1].createdAt.getTime().toString()
          ),
        },
        edges: edges.map(
          ({
            albumId,
            updatedAt,
            title,
            slug,
            description,
            createdAt,
            private: isPrivate,
          }): GQLAlbum => ({
            albumId,
            createdAt,
            isPrivate,
            slug,
            title,
            updatedAt,
            description,
          })
        ),
      }
    },

    sharedAlbums: async (
      parent,
      { cursor, limit = 20 },
      { req }
    ): Promise<AlbumConnection> => {
      const user = await authenticate(req as RequestWithUser)
      const cursorOptions = cursor
        ? { createdAt: { $lt: fromCursorHash(cursor) } }
        : {}
      const query = {
        createdBy: { $ne: new ObjectId(user._id) },
        $or: [
          { private: false },
          {
            $and: [
              { private: true },
              { sharedWith: { $in: [new ObjectId(user._id)] } },
            ],
          },
        ],
        ...cursorOptions,
      }
      const totalItems = await AlbumModel.estimatedDocumentCount(query)
      const albums = await AlbumModel.find(query)
        .sort({ createdAt: -1 })
        .limit(limit + 1)

      const hasNextPage = albums.length > limit
      const edges = hasNextPage ? albums.slice(0, -1) : albums

      return {
        pageInfo: {
          totalItems,
          endCursor: toCursorHash(
            albums[albums.length - 1].createdAt.getTime().toString()
          ),
          hasNextPage,
        },
        edges: edges.map(
          ({
            albumId,
            updatedAt,
            title,
            slug,
            description,
            createdAt,
            private: isPrivate,
          }): GQLAlbum => ({
            albumId,
            createdAt,
            description,
            isPrivate,
            slug,
            title,
            updatedAt,
          })
        ),
      }
    },
  },
  Mutation: {
    createAlbum: async (
      parent,
      {
        input: { title, media = [], description, files = [], sharedWith = [] },
      },
      { req }
    ): Promise<CreateAlbumResponse> => {
      const user = await authenticate(req as RequestWithUser)

      try {
        await createAlbumSchema.validate(
          { title, media, description, files, sharedWith },
          { abortEarly: false }
        )
      } catch (err) {
        return {
          errors: formatError(err as ValidationError),
        }
      }

      const users = await UserModel.find({ _id: { $in: sharedWith } })
      const albumId = v4()
      const existingMedia = await MediaModel.find({ _id: { $in: media } })
      // TODO - add albumId to existing files

      const fileInfo = await Promise.all(
        files.map((file) => processUpload(file))
      )
      const mediaInfo = await insertFiles(fileInfo, albumId, user)
      const slug = `${slugify(title, { lower: true })}-${randomBytes(
        6
      ).toString('hex')}`

      const album = new AlbumModel({
        albumId,
        title,
        slug,
        createdBy: user,
        description,
        media: [...mediaInfo, ...existingMedia],
        sharedWith: users,
        private: sharedWith.length > 0,
      })

      await album.save()

      return {
        link: `/albums/${slug}`,
      }
    },
  },
}
