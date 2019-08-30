import { DateTimeResolver, EmailAddressResolver } from 'graphql-scalars'
import { GraphQLUpload } from 'graphql-upload'

export const resolvers = {
  DateTime: DateTimeResolver,
  EmailAddress: EmailAddressResolver,
  Upload: GraphQLUpload,
}
