import { Resolvers, FormError } from 'src/types/graphql'
import { authenticate, tokens } from '../../authentication'
import { RequestWithUser } from '../../types/RequestWithUser'
import { UserModel, User } from '../../models/user.model'
import { InviteModel } from '../../models/invite.model'
import { ApolloError } from 'apollo-server-errors'
import { randomBytes, pbkdf2Sync } from 'crypto'

export const resolvers: Resolvers = {
  Mutation: {
    register: async (
      parent,
      { input: { password, email, name } },
      { res },
      info
    ): Promise<FormError[]> => {
      const existingUser = await UserModel.findOne({ email })
      if (existingUser) {
        return [
          { path: 'email', message: 'Denne mailadresse er allerede i brug' },
        ]
      }

      const salt = randomBytes(32).toString('hex')
      const hash = pbkdf2Sync(password, salt, 10000, 512, 'sha512').toString(
        'hex'
      )
      const user = new UserModel({ name, email, salt, hash })
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

      return null
    },

    invite: async (
      parent,
      { input: { email } },
      { req },
      info
    ): Promise<FormError[]> => {
      // const currentUser = await authenticate(req as RequestWithUser)

      const existingUser = await UserModel.findOne({ email })
      if (existingUser) {
        return [
          {
            path: 'email',
            message: 'Denne mailadresse er allerede i brug',
          },
        ]
      }

      const existingInvite = await InviteModel.findOne({ email, isValid: true })
      if (existingInvite) {
        return [
          {
            path: 'email',
            message: 'En invitation er allerede sendt til denne mailadresse',
          },
        ]
      }

      const invite = new InviteModel({ email })
      await invite.save()

      // send email

      return null
    },

    login: async (parent, { input }, context, info): Promise<FormError[]> => {
      return []
    },
  },

  Query: {
    getInvite: async (parent, { id }, context, info): Promise<string> => {
      const invite = await InviteModel.findOne({ id, isValid: true })
      if (!invite) {
        throw new ApolloError('Invitation findes ikke')
      }
      return invite.email
    },
  },
}
