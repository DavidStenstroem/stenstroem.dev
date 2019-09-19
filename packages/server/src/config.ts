import { config as dotenvConfig, DotenvConfigOptions } from 'dotenv'

const options: DotenvConfigOptions =
  (process.env.NODE_ENV as string) === 'production'
    ? { path: '~/.env.stenstroem-dev-server' }
    : {}

dotenvConfig()

interface Config {
  dbConnectionString: string
  dbName: string
  accessTokenSecret: string
  refreshTokenSecret: string
  cloudinary: CloudinaryConfig
  engineApiKey: string
}

interface CloudinaryConfig {
  apiKey: string
  apiSecret: string
  baseEndpoint: string
  uploadPreset: string
  cloudName: string
}

export const config: Config = {
  engineApiKey: process.env.ENGINE_API_KEY as string,
  dbConnectionString: process.env.MONGODB_URI as string,
  dbName: process.env.DB_NAME as string,
  accessTokenSecret: process.env.ACCESS_TOKEN_SECRET as string,
  refreshTokenSecret: process.env.REFRESH_TOKEN_SECRET as string,
  cloudinary: {
    apiKey: process.env.CLOUDINARY_API_KEY as string,
    apiSecret: process.env.CLOUDINARY_API_SECRET as string,
    baseEndpoint: 'https://api.cloudinary.com/v1_1',
    uploadPreset: 'stenstroem-dev-upload-preset',
    cloudName: 'stnstrm',
  },
}
