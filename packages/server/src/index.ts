import { GraphQLServer } from 'graphql-yoga'
import { default as schema } from './graphql/schema'
import { Context } from './types/Context'
import mongoose from 'mongoose'
import { config } from './config'
import cors from 'cors'
import morgan from 'morgan'
import cookieParser from 'cookie-parser'
import { refreshTokens } from './authentication'

const { dbConnectionString, dbName } = config

const start = async (): Promise<void> => {
  await mongoose.connect(dbConnectionString, {
    dbName,
    useCreateIndex: true,
    useNewUrlParser: true,
  })

  const whiteList: string[] = ['http://localhost:8080']

  const server = new GraphQLServer({
    schema: schema(),

    context: ({ request, response }): Context => ({
      req: request,
      res: response,
    }),
  })

  server.express.disable('x-powered-by')
  server.express.use(
    cors({
      credentials: true,
      origin: whiteList,
    })
  )
  server.express.use(morgan('dev'))
  server.express.use(cookieParser())
  server.express.use(refreshTokens)

  await server.start({ cors: { credentials: true, origin: whiteList } })
}

start()
