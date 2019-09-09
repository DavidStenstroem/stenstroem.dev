import {
  Resolvers,
  CreateAlbumResponse,
  Album as GQLAlbum,
  CoverConnection,
  MediaConnection,
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
import { MediaModel, Media } from '../../models/media.model'
import { UserModel, User } from '../../models/user.model'
import {
  albumModelToCoverConnection,
  fromCursorHash,
  userToGQLAccount,
  mediaToGQLMedia,
  toCursorHash,
} from '../../utils/resolver-helpers'
import { InstanceType } from 'typegoose'

export const resolvers: Resolvers = {
  Album: {
    mediaFeed: async (
      parent,
      { cursor, limit = 40 },
      req,
      info
    ): Promise<MediaConnection> => {
      if (!cursor)
        cursor = toCursorHash(
          parent.media[parent.media.length - 1].createdAt.toString()
        )
      const newestMediaIndex = parent.media.findIndex(
        (media) => media.createdAt.toString() === fromCursorHash(cursor)
      )
      const newCursor = toCursorHash(
        parent.media[newestMediaIndex - limit].createdAt.toString()
      )

      return {
        edges: parent.media.slice(newestMediaIndex - limit, newestMediaIndex),
        pageInfo: {
          endCursor: newCursor,
          hasNextPage: newestMediaIndex < parent.media.length,
          totalItems: parent.media.length,
        },
      }
    },
  },
  Query: {
    myAlbums: async (
      parent,
      { cursor, limit = 20 },
      { req },
      info
    ): Promise<CoverConnection> => {
      const user = await authenticate(req as RequestWithUser)
      const query = cursor
        ? { createdBy: user._id, createdAt: { $lt: fromCursorHash(cursor) } }
        : { createdBy: user._id }
      const totalItems = await AlbumModel.estimatedDocumentCount(query)
      const albums = await AlbumModel.find(query)
        .limit(limit + 1)
        .sort({ createdAt: -1 })
        .populate([
          { path: 'createdBy', model: 'User' },
          {
            path: 'media',
            model: 'Media',
            options: { limit: 1, sort: { createdAt: -1 } },
            populate: {
              path: 'uploadedBy',
              model: 'User',
            },
          },
        ])

      return albumModelToCoverConnection(albums, limit, totalItems)
    },

    getAlbum: async (parent, { slug }, { req }, info): Promise<GQLAlbum> => {
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
              createdAt: album.createdAt,
              createdBy: userToGQLAccount(album.createdBy as InstanceType<
                User
              >),
              description: album.description,
              media: (album.media as InstanceType<Media>[]).map(
                mediaToGQLMedia
              ),
              slug: album.slug,
              title: album.title,
              updatedAt: album.updatedAt,
            }
          : null
      } else {
        return {
          createdAt: album.createdAt,
          createdBy: userToGQLAccount(album.createdBy as InstanceType<User>),
          description: album.description,
          media: (album.media as InstanceType<Media>[]).map(mediaToGQLMedia),
          slug: album.slug,
          title: album.title,
          updatedAt: album.updatedAt,
        }
      }
    },
  },
  Mutation: {
    createAlbum: async (
      parent,
      {
        input: { title, media = [], description, files = [], sharedWith = [] },
      },
      { req },
      info
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

      const existingMedia = await MediaModel.find({ _id: { $in: media } })

      const fileInfo = await Promise.all(
        files.map((file) => processUpload(file))
      )
      const mediaInfo = await insertFiles(fileInfo, user)
      const slug = `${slugify(title, { lower: true })}-${randomBytes(
        6
      ).toString('hex')}`

      const album = new AlbumModel({
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
