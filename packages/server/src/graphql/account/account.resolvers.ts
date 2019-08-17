import { Resolvers, Account, FormError } from '../../types/graphql'
import { authenticate } from '../../authentication'
import { RequestWithUser } from '../../types/RequestWithUser'

export const resolvers: Resolvers = {
  Query: {
    me: async (parent, args, { req }, info): Promise<Account> => {
      const user = await authenticate(req as RequestWithUser)
      return {
        id: user.id,
        ...user,
      }
    },
  },

  Mutation: {
    changeName: async (parent, args, context, info): Promise<FormError[]> => [],
    changePassword: async (
      parent,
      args,
      context,
      info
    ): Promise<FormError[]> => [],
  },
}
