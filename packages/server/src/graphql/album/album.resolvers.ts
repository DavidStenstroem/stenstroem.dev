import { Resolvers, CreateAlbumResponse } from '../../types/graphql'
import { authenticate } from '../../authentication'
import { RequestWithUser } from '../../types/RequestWithUser'
import { createAlbumSchema } from '@stenstroem-dev/shared'
import { formatError } from '../../utils/formatError'
import { ValidationError } from 'yup'
import { AlbumModel } from '../../models/album.model'
import slugify from 'slugify'
import { randomBytes } from 'crypto'

export const resolvers: Resolvers = {
  Mutation: {
    createAlbum: async (
      parent,
      { input: { title, media, description } },
      { req },
      info
    ): Promise<CreateAlbumResponse> => {
      const user = await authenticate(req as RequestWithUser)

      try {
        await createAlbumSchema.validate(
          { title, media, description },
          { abortEarly: false }
        )
      } catch (err) {
        return {
          errors: formatError(err as ValidationError),
        }
      }

      const slug = `${slugify(title)}-${randomBytes(6).toString('hex')}`

      await AlbumModel.create({
        title,
        description: description ? description : undefined,
        slug,
        media,
        createdBy: user._id,
      })

      return {
        link: `/albums/${slug}`,
      }
    },
  },
}
