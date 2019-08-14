import { DateTimeResolver, EmailAddressResolver } from 'graphql-scalars'

export const resolvers = {
  DateTime: DateTimeResolver,
  EmailAddress: EmailAddressResolver,
}
