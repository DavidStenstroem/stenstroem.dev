import { ApolloServer } from 'apollo-server-express'
import { default as genSchema } from './graphql/schema'
import { Context } from './types/Context'
import mongoose from 'mongoose'
import { config } from './config'
import cors from 'cors'
import morgan from 'morgan'
import cookieParser from 'cookie-parser'
import { refreshTokens } from './authentication'
import { createServer } from 'http'
import express from 'express'
// import { uploadApi } from './upload'
import { ClientInfo } from 'apollo-engine-reporting/dist/agent'

const { dbConnectionString, dbName, engineApiKey } = config
const isProduction = (process.env.NODE_ENV as string) === 'production'

const start = async (): Promise<void> => {
  await mongoose.connect(dbConnectionString, {
    dbName,
    useCreateIndex: true,
    useNewUrlParser: true,
  })

  const whiteList: string[] = [
    'https://stenstroem.dev',
    'https://app.stenstroem.dev',
  ]

  if (!isProduction) {
    whiteList.push('http://localhost:8000')
  }

  const schema = genSchema()

  const server = new ApolloServer({
    schema,
    playground: !isProduction,
    introspection: !isProduction,
    engine: {
      apiKey: engineApiKey,
      generateClientInfo: ({ request }): ClientInfo => {
        const headers = request.http.headers
        const clientName = headers.get('apollo-client-name')
        const clientVersion = headers.get('apollo-client-version')
        if (clientName && clientVersion) {
          return {
            clientName,
            clientVersion,
          }
        } else {
          return {
            clientName: 'Unknown Client',
            clientVersion: 'Unversioned',
          }
        }
      },
    },
    uploads: { maxFileSize: 25000000, maxFiles: 4 },
    context: ({ req, res }): Context => ({
      req,
      res,
    }),
  })

  const app = express()

  app.disable('x-powered-by')
  app.use(
    cors({
      credentials: true,
      origin: whiteList,
    })
  )
  app.use(morgan('dev'))
  app.use(cookieParser())
  app.use(refreshTokens)

  // app.use('/upload', uploadApi)

  server.applyMiddleware({
    app,
    cors: { credentials: true, origin: whiteList },
    path: isProduction ? '/' : '/graphql',
  })

  const httpServer = createServer(app)
  server.installSubscriptionHandlers(httpServer)

  await httpServer.listen({ port: 4000 }, (): void => {
    console.log(`Server running at http://localhost:4000${server.graphqlPath}`)
  })
}

start().catch((err): void => {
  console.log('Error!\n', err)
})
