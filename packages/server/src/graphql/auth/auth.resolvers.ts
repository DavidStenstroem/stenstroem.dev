import { Resolvers, FormError } from 'src/types/graphql'

export const resolvers: Resolvers = {
  Mutation: {
    register: async (
      parent,
      { input: { password, email, name } },
      context,
      info
    ): Promise<FormError[]> => {
      return []
    },

    invite: async (parent, { input }, context, info): Promise<FormError[]> => {
      return []
    },

    login: async (parent, { input }, context, info): Promise<FormError[]> => {
      return []
    },
  },
}
