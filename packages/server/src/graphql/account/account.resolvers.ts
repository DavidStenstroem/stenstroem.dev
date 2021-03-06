import { Resolvers, Account, FormError } from '../../types/graphql'
import { authenticate } from '../../authentication'
import { RequestWithUser } from '../../types/RequestWithUser'
import { changeNameSchema, changePasswordSchema } from '@stenstroem-dev/shared'
import { formatError } from '../../utils/formatError'
import { ValidationError } from 'yup'
import { pbkdf2Sync, randomBytes } from 'crypto'
import { UserModel } from '../../models/user.model'
import slugify from 'slugify'

export const resolvers: Resolvers = {
  Query: {
    me: async (parent, args, { req }, info): Promise<Account> => {
      const user = await authenticate(req as RequestWithUser)
      return {
        id: user.id,
        createdAt: user.createdAt,
        email: user.email,
        name: user.name,
        slug: user.slug,
        updatedAt: user.updatedAt,
      }
    },

    allAccounts: async (
      parent,
      { withMe },
      { req },
      info
    ): Promise<Account[]> => {
      const currUser = await authenticate(req as RequestWithUser)
      const users = await UserModel.find(
        withMe
          ? { isActive: true }
          : { isActive: true, _id: { $ne: currUser._id } }
      )
      return users.map((user) => ({
        id: user._id,
        name: user.name,
        slug: user.slug,
        email: user.email,
        createdAt: user.createdAt,
        updatedAt: user.updatedAt,
      }))
    },
  },

  Mutation: {
    changeName: async (
      parent,
      { input: { newName } },
      { req },
      info
    ): Promise<FormError[]> => {
      const user = await authenticate(req as RequestWithUser)
      try {
        await changeNameSchema.validate({ newName }, { abortEarly: false })
      } catch (err) {
        return formatError(err as ValidationError)
      }

      user.slug = `${slugify(newName)}-${randomBytes(6).toString('hex')}`
      user.name = newName
      await user.save()

      // todo - update tokens

      return null
    },

    changePassword: async (
      parent,
      { input: { currentPassword, newPassword } },
      { req },
      info
    ): Promise<FormError[]> => {
      const user = await authenticate(req as RequestWithUser)
      try {
        await changePasswordSchema.validate(
          { currentPassword, newPassword },
          { abortEarly: false }
        )
      } catch (err) {
        return formatError(err as ValidationError)
      }

      const hash = pbkdf2Sync(
        currentPassword,
        user.salt,
        10000,
        512,
        'sha512'
      ).toString('hex')
      if (hash !== user.hash) {
        return [{ path: 'currentPassword', message: 'Forkert adgangskode' }]
      }

      const newSalt = randomBytes(32).toString('hex')
      const newHash = pbkdf2Sync(
        newPassword,
        newSalt,
        10000,
        512,
        'sha512'
      ).toString('hex')

      user.salt = newSalt
      user.hash = newHash
      await user.save()

      // todo - update tokens
      return null
    },
  },
}
