import {
  Resolvers,
  FormError,
  Invitation,
  AuthPayload,
} from '../../types/graphql'
import { authenticate, tokens } from '../../authentication'
import { RequestWithUser } from '../../types/RequestWithUser'
import { UserModel, User } from '../../models/user.model'
import { InviteModel } from '../../models/invite.model'
import { ApolloError } from 'apollo-server-errors'
import { randomBytes, pbkdf2Sync } from 'crypto'
import {
  loginSchema,
  registerSchema,
  inviteSchema,
} from '@stenstroem-dev/shared'
import { formatError } from '../../utils/formatError'
import { ValidationError } from 'yup'
import slugify from 'slugify'

export const resolvers: Resolvers = {
  Mutation: {
    register: async (
      parent,
      { input: { password, email, name } },
      { res }
    ): Promise<AuthPayload> => {
      try {
        await registerSchema.validate(
          { name, email, password },
          { abortEarly: false }
        )
      } catch (err) {
        return {
          errors: formatError(err as ValidationError),
        }
      }
      const user = await UserModel.findOne({ email, isActive: false })
      if (!user) {
        return {
          errors: [{ path: 'email', message: 'Ingen gyldig invitation' }],
        }
      } else if (user && user.isActive) {
        return {
          errors: [
            { path: 'email', message: 'Denne mailadresse er allerede i brug' },
          ],
        }
      }

      const slug = `${slugify(name)}-${randomBytes(6).toString('hex')}`
      const salt = randomBytes(32).toString('hex')
      const hash = pbkdf2Sync(password, salt, 10000, 512, 'sha512').toString(
        'hex'
      )
      user.name = name
      user.email = email
      user.salt = salt
      user.hash = hash
      user.slug = slug
      user.isActive = true
      await user.save()

      const [accessToken, refreshToken] = tokens({
        id: user.id,
        count: user.count,
        email: user.email,
        name: user.name,
      })

      res.cookie('access-token', accessToken, {
        expires: new Date(Date.now() + 2 * 60 * 60 * 1000),
      })
      res.cookie('refresh-token', refreshToken, {
        expires: new Date(Date.now() + 30 * 24 * 60 * 60 * 1000),
      })

      return {
        account: {
          id: user._id,
          createdAt: user.createdAt,
          updatedAt: user.updatedAt,
          email: user.email,
          name: user.name,
          slug: user.slug,
        },
      }
    },

    invite: async (
      parent,
      { input: { email } },
      { req },
      info
    ): Promise<FormError[]> => {
      const currentUser = await authenticate(req as RequestWithUser)

      try {
        await inviteSchema.validate({ email }, { abortEarly: false })
      } catch (err) {
        return formatError(err as ValidationError)
      }

      const existingUser = await UserModel.findOne({ email })
      if (existingUser) {
        return [
          {
            path: 'email',
            message: 'Denne mailadresse er allerede i brug',
          },
        ]
      }

      const invite = new UserModel({
        email,
        invitedBy: currentUser._id,
        name: '',
      })
      await invite.save()

      // send email

      return null
    },

    login: async (
      parent,
      { input: { email, password } },
      { res }
    ): Promise<AuthPayload> => {
      try {
        await loginSchema.validate({ email, password }, { abortEarly: false })
      } catch (err) {
        return { errors: formatError(err as ValidationError) }
      }

      const user = await UserModel.findOne({ email })
      if (!user) {
        return {
          errors: [
            { message: 'Forkert mail eller kode', path: 'email' },
            { message: 'Forkert mail eller kode', path: 'password' },
          ],
        }
      }

      const hash = pbkdf2Sync(
        password,
        user.salt,
        10000,
        512,
        'sha512'
      ).toString('hex')
      if (hash !== user.hash) {
        return {
          errors: [
            { message: 'Forkert mail eller kode', path: 'email' },
            { message: 'Forkert mail eller kode', path: 'password' },
          ],
        }
      }

      const [accessToken, refreshToken] = tokens({
        id: user.id,
        name: user.name,
        email: user.email,
        count: user.count,
      })

      res.cookie('access-token', accessToken, {
        expires: new Date(Date.now() + 2 * 60 * 60 * 1000),
        maxAge: 2 * 60 * 60 * 1000,
      })
      res.cookie('refresh-token', refreshToken, {
        expires: new Date(Date.now() + 30 * 24 * 60 * 60 * 1000),
        maxAge: 30 * 24 * 60 * 60 * 1000,
      })

      return {
        account: {
          createdAt: user.createdAt,
          email: user.email,
          id: user._id,
          name: user.name,
          slug: user.slug,
          updatedAt: user.updatedAt,
        },
      }
    },
  },

  Query: {
    getInvites: async (parent, args, { req }, info): Promise<Invitation[]> => {
      const currentUser = await authenticate(req as RequestWithUser)
      const invites = await UserModel.find({ invitedBy: currentUser._id })
      return invites.map(
        (user): Invitation => ({
          __typename: 'Invitation',
          accepted: user.isActive,
          createdAt: user.createdAt,
          email: user.email,
          id: user._id,
          name: user.name === '' ? undefined : user.name,
        })
      )
    },

    getInvite: async (parent, { id }, context, info): Promise<string> => {
      const invite = await UserModel.findOne({ _id: id, isActive: false })
      return invite ? invite.email : null
    },
  },
}
