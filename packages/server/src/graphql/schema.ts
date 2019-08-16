import { mergeTypes, mergeResolvers } from 'merge-graphql-schemas'
import { makeExecutableSchema } from 'graphql-tools'
import * as glob from 'glob'
import { join } from 'path'
import { GraphQLSchema } from 'graphql'
import { readFileSync } from 'fs'

const genSchema = (): GraphQLSchema => {
  const pathToGraphQL = join(__dirname, '.')
  const graphqlTypes = glob
    .sync(`${pathToGraphQL}/**/*.graphql`)
    .map((x: string): string => readFileSync(x, { encoding: 'utf8' }))
  const resolvers = glob
    .sync(`${pathToGraphQL}/**/*.ts`)
    .map((resolver: string): any => require(resolver).resolvers)

  return makeExecutableSchema({
    typeDefs: mergeTypes(graphqlTypes),
    resolvers: mergeResolvers(resolvers),
  })
}

export default genSchema
