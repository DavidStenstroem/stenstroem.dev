import { Resolvers, CreateAlbumResponse } from '../../types/graphql'

export const resolvers: Resolvers = {
  Mutation: {
    createAlbum: async (
      parent,
      args,
      context,
      info
    ): Promise<CreateAlbumResponse> => {},
  },
}
