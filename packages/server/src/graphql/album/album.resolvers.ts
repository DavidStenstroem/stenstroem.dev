import { Resolvers, CreateAlbumResponse } from '../../types/graphql'
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
import { UserModel } from '../../models/user.model'

export const resolvers: Resolvers = {
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
