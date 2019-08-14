import { mergeTypes, mergeResolvers } from 'merge-graphql-schemas'
import { makeExecutableSchema } from 'graphql-tools'
import { join } from 'path'
import * as glob from 'glob'
import { readFileSync } from 'fs'
import { GraphQLSchema } from 'graphql'

const schema = (): GraphQLSchema => {
  const pathToModules = join(__dirname, '.')
  const graphqlTypes = glob
    .sync(`${pathToModules}/**/*.graphql`)
    .map((x: string): string => readFileSync(x, { encoding: 'utf8' }))

  const resolvers = glob
    .sync(`${pathToModules}/**/*.resolvers.ts`)
    .map((resolver: string): any => require(resolver).resolvers)

  return makeExecutableSchema({
    typeDefs: mergeTypes(graphqlTypes),
    resolvers: mergeResolvers(resolvers),
  })
}

export default schema
